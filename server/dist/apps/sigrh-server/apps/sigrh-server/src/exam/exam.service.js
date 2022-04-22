"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const exam_dto_1 = require("./exam.dto");
const mongoose_2 = require("mongoose");
const db_parser_1 = require("../../../../libs/db-parser/src");
const repository_service_1 = require("../repository/repository.service");
const center_service_1 = require("./center/center.service");
const candidat_service_1 = require("../candidat/candidat.service");
const report_service_1 = require("../consumers/report/report.service");
const decorators_1 = require("../decorators");
const repartition_service_1 = require("./repartition/repartition.service");
const score_service_1 = require("../consumers/score/score.service");
const nanoid_1 = require("nanoid");
const lib_1 = require("../lib");
const qrcode_service_1 = require("../consumers/qrcode/qrcode.service");
const websocket_1 = require("../../../../libs/websocket/src");
const exam_types_1 = require("./exam.types");
const runner_1 = require("../../../../libs/runner/src");
let ExamService = class ExamService extends repository_service_1.RepositoryService {
    constructor(model, dbParser, centerService, candidatService, report, repartitionService, scoreService, qrcodeService, ws, score) {
        super(model, dbParser);
        this.model = model;
        this.dbParser = dbParser;
        this.centerService = centerService;
        this.candidatService = candidatService;
        this.report = report;
        this.repartitionService = repartitionService;
        this.scoreService = scoreService;
        this.qrcodeService = qrcodeService;
        this.ws = ws;
        this.score = score;
        this.searchFields = ['label'];
    }
    async one(id) {
        const _result = await this.model.findById(id);
        return this.dbParser.parseData(_result);
    }
    async getField(id) {
        return await this.score.getField(id);
    }
    async createRepartition(id) {
        await this.centerService.update(id, {
            repartitionStatus: exam_types_1.ExamRepartitionStatus.PROCESSING,
        });
        const center = await this.centerService.one(id);
        const fields = await this.scoreService.getFields(center.exam);
        if (!fields || fields.length === 0) {
            return new common_1.HttpException({
                statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                message: "Impossible d'effectuer la répartition, aucune matière trouvée pour cet examen.",
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const [departement, departement2] = center.departement.split('-');
        const depCode = (0, lib_1.getDepartementCode)(departement);
        const starts = fields.map((field) => {
            return {
                shortName: field.label.slice(0, 3).toUpperCase(),
                startValue: Number((0, nanoid_1.customAlphabet)('123456789')(3)),
                field,
            };
        });
        return await this.centerService.setRepartition(center, async (data) => {
            if (!data.candidates && !data.rooms) {
                return new common_1.HttpException({
                    statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    message: "Inpossible d'effectuer la répartition, arguments insuffisants",
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const candidates = (await this.candidatService.filter({
                sportAccept: true,
                departement: new RegExp(`(${departement}|${departement2 ? departement2 : ''})`),
                exam: center.exam,
            }))
                .map((c) => {
                return {
                    numero: c.numero,
                    nom: c.nom,
                    prenom: c.prenom,
                    departement: c.departement,
                    sexe: c.sexe,
                    dateNaissance: c.dateNaissance,
                    id: c._id ? c._id : c.id,
                };
            })
                .sort((c1, c2) => (c1.nom + c1.prenom).trim() < (c2.nom + c2.prenom).trim() ? -1 : 1);
            let i = 0;
            const total = candidates.length + 1;
            const percent = (value) => Math.round((value / total) * 100);
            for (const candidate of candidates) {
                const qrcodes = {};
                const k = ++i;
                for (const el of starts) {
                    const data = candidate.id;
                    const tag = `${depCode}${el.shortName}${el.startValue + k}`;
                    const qrcode = (await this.qrcodeService.create({ data, tag }))
                        .dataUrl;
                    qrcodes[el.field.id] = { tag, qrcode };
                }
                candidate.qrcodes = qrcodes;
                const percentage = percent(k);
                console.log('Percentage: ', percentage, '%');
                this.ws.notify({
                    event: lib_1.WsEvents.REPARTITION_PROGRESS,
                    cb: () => ({ id: data.id, percentage }),
                });
            }
            const result = {};
            if (data.candidates && data.candidates > 0) {
                const _candidates = [];
                for (let i = 0; i < Math.ceil(candidates.length / data.candidates); ++i) {
                    const start = i * data.candidates;
                    const _candidates_row = candidates.slice(start, start + data.candidates);
                    _candidates.push(_candidates_row);
                }
                const len = Math.ceil(_candidates.length / data.centers);
                await this.centerService.update(id, {
                    rooms: len,
                });
                for (let i = 0; i < data.centers; ++i) {
                    const start = i * len;
                    result[`Centre ${i + 1}`] = _candidates.slice(start, start + len);
                }
            }
            else {
                const len = Math.ceil(candidates.length / data.centers);
                if (data.rooms && data.rooms > 0) {
                    for (let i = 0; i < data.centers; ++i) {
                        const start = i * len;
                        result[`Centre ${i + 1}`] = candidates.slice(start, start + len);
                    }
                    await this.centerService.update(id, {
                        candidates: Math.ceil(Object.values(result)[0].length / data.rooms),
                    });
                    for (const c in result) {
                        const list = result[c];
                        const new_list = [];
                        const _len = Math.ceil(list.length / data.rooms);
                        for (let i = 0; i < _len; ++i) {
                            new_list.push(list.slice(i * _len, i * _len + _len));
                        }
                        result[c] = new_list;
                    }
                }
                else {
                    return new common_1.HttpException({
                        statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                        message: "Inpossible d'effectuer la répartition, arguments insuffisants",
                    }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                }
            }
            const oldRepartition = await this.repartitionService.findOne({
                exam: data.exam,
                departement: data.departement,
            });
            if (!oldRepartition) {
                this.repartitionService.create({
                    exam: data.exam,
                    departement: data.departement,
                    repartition: result,
                });
            }
            else {
                this.repartitionService.update(oldRepartition.id, {
                    repartition: result,
                });
            }
            return result;
        });
    }
    async getRepartition(exam, departement) {
        const _repartition = await this.repartitionService.findOne({
            exam,
            departement,
        });
        if (_repartition)
            return _repartition.repartition;
        return null;
    }
    async downloadPdf(data, format = {}) {
        return await this.report.downloadPdf(data, format);
    }
    async downloadXlsx(data) {
        return await this.report.downloadXlsx(data);
    }
    async activeStep(id, step) {
        const _step = Object.assign({}, exam_types_1.examSteps);
        _step[step] = exam_types_1.ExamStepStatus.ACTIVE;
        return await this.model.updateOne({ id }, Object.assign({}, _step));
    }
    async gotoNextStep(id) { }
    async addScore(payload) {
        await this.score.insertScore(payload);
        const task = (0, runner_1.createRunner)({
            name: 'add-score',
            fn: async () => {
                const count = await this.countInsertedScores(payload.exam, payload.field);
                this.ws.notify({
                    event: lib_1.WsEvents.ADD_SCORE,
                    cb: () => count,
                });
            },
        });
        task.run();
        return;
    }
    async getScoreResults(exam, sort = 'DSC') {
        const results = await this.score.getResults(exam, sort);
        console.log(results);
        const result = [];
        for (const score of results) {
            if (score.scores[0]) {
                const candidateId = await this.qrcodeService.verify(score.scores[0].candidate);
                const candidate = await this.candidatService.one(candidateId);
                result.push(Object.assign(Object.assign({}, score), { candidate }));
            }
            else {
                result.push(Object.assign({}, score));
            }
        }
        return result;
    }
    async countInsertedScores(exam, field) {
        return await this.score.countInsertedScores(exam, field);
    }
    async simulate(exam, sort = 'DSC', payload) {
        const results = this.getScoreResults(exam, sort);
    }
};
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamService.prototype, "one", null);
ExamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exam_dto_1.Exam.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService,
        center_service_1.CenterService,
        candidat_service_1.CandidatService,
        report_service_1.ReportService,
        repartition_service_1.RepartitionService,
        score_service_1.ScoreService,
        qrcode_service_1.QrcodeService,
        websocket_1.WsGateway,
        score_service_1.ScoreService])
], ExamService);
exports.ExamService = ExamService;
//# sourceMappingURL=exam.service.js.map