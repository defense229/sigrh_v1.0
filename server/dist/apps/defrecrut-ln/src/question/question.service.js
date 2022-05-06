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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const repository_1 = require("../../../../libs/repository/src");
const question_dto_1 = require("./question.dto");
const mongoose_2 = require("mongoose");
const db_parser_1 = require("../../../../libs/db-parser/src");
const score_service_1 = require("../consumers/score/score.service");
const candidat_service_1 = require("../candidat/candidat.service");
const websocket_1 = require("../../../../libs/websocket/src");
const utils_1 = require("../utils");
let QuestionService = class QuestionService extends repository_1.RepositoryService {
    constructor(model, dbParser, score, candidateService, ws) {
        super(model, dbParser);
        this.model = model;
        this.dbParser = dbParser;
        this.score = score;
        this.candidateService = candidateService;
        this.ws = ws;
    }
    async getAll(exam) {
        return await this.score.getFields(exam);
    }
    async create(question) {
        return await this.score.addField({
            coefficient: 1,
            exam: question.exam,
            label: question.label,
        });
    }
    async one(id) {
        return await this.score.getField(id);
    }
    async findByNums(exam, ids) {
        const fields = await this.score.getFields(exam);
        console.log(fields);
        return fields.filter((field, index) => ids.map((id) => Number(id)).includes(index + 1));
    }
    async createScore(score) {
        const r = await this.score.insertScore(score);
        const candidateScore = await this.score.getCandidateScore(score.exam, score.candidate);
        this.ws.notify({
            event: utils_1.WsEvents.NEW_SCORE_ADDED,
            cb: () => {
                return { score, candidateScore };
            },
        });
        return r;
    }
    async remove(id) {
        return this.score.removeField(id);
    }
    async getResults(exam) {
        const results = await this.score.getResults(exam, 'DESC');
        const result = [];
        for (const score of results) {
            if (score.scores.length > 0) {
                const candidate = await this.candidateService.one(score.scores[0].candidate);
                result.push(Object.assign(Object.assign({}, score), { candidate }));
            }
        }
        return result;
    }
};
QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_dto_1.Question.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService,
        score_service_1.ScoreService,
        candidat_service_1.CandidatService,
        websocket_1.WsGateway])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map