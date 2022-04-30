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
exports.JuryService = exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const repository_1 = require("../../../../libs/repository/src");
const jury_dto_1 = require("./jury.dto");
const mongoose_2 = require("mongoose");
const db_parser_1 = require("../../../../libs/db-parser/src");
const utils_1 = require("../utils");
const candidat_service_1 = require("../candidat/candidat.service");
const websocket_1 = require("../../../../libs/websocket/src");
const question_service_1 = require("../question/question.service");
let MemberService = class MemberService extends repository_1.RepositoryService {
    constructor(model, dbParser) {
        super(model, dbParser);
        this.model = model;
        this.dbParser = dbParser;
    }
    async create(member) {
        const pwd = (0, utils_1.encrypt)(member.password);
        const result = await this.model.create(Object.assign(Object.assign({}, member), { password: pwd }));
        delete result.password;
        return this.dbParser.parseData(result);
    }
    async login(username, password) {
        const member = await this.model.findOne({ username });
        if (member && (0, utils_1.verify)(password, member.password)) {
            delete member.password;
            return {
                statusCode: common_1.HttpStatus.OK,
                member: this.dbParser.parseData(member),
            };
        }
        return { statusCode: common_1.HttpStatus.UNAUTHORIZED };
    }
};
MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(jury_dto_1.Member.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService])
], MemberService);
exports.MemberService = MemberService;
let JuryService = class JuryService extends repository_1.RepositoryService {
    constructor(model, dbParser, candidatService, memberService, ws, questions) {
        super(model, dbParser);
        this.model = model;
        this.dbParser = dbParser;
        this.candidatService = candidatService;
        this.memberService = memberService;
        this.ws = ws;
        this.questions = questions;
    }
    async createJury(exam) {
        const len = await this.model.countDocuments({});
        const yearPrefix = String(new Date().getFullYear()).substring(2);
        return this.dbParser.parseData(await this.model.create({ exam, numero: 'J' + yearPrefix + len }));
    }
    createMember(member) {
        return this.memberService.create(member);
    }
    updateMember(id, member) {
        return this.memberService.update(id, member);
    }
    async login(username, password) {
        return await this.memberService.login(username, password);
    }
    async getJuryMembers(id) {
        return await this.memberService.find({ jury: id, enabled: true }, [
            'jury',
            'departement',
        ]);
    }
    async members(exam) {
        return await this.memberService.find({ exam }, ['jury', 'departement']);
    }
    async archiveMember(id) {
        return await this.memberService.archive(id);
    }
    async pickCandidate(exam, numero, departement, jury) {
        const candidate = await this.candidatService.findOne({
            numero,
            departement,
            exam,
        });
        if (!candidate) {
            return { statusCode: common_1.HttpStatus.NOT_FOUND };
        }
        this.ws.notify({
            event: utils_1.WsEvents.CANDIDATE_SELECTED,
            cb: () => {
                return { jury, candidate };
            },
        });
        return { statusCode: common_1.HttpStatus.OK };
    }
    async pickCandidateNumbers(exam, numero, departement, jury, nums) {
        const candidate = await this.candidatService.findOne({
            exam,
            numero,
            departement,
        });
        if (!candidate) {
            return { statusCode: common_1.HttpStatus.NOT_FOUND };
        }
        const questions = await this.questions.findByNums(exam, nums);
        this.ws.notify({
            event: utils_1.WsEvents.CANDIDATE_NUMBERS_SELECTED,
            cb: () => {
                return { jury, candidate, nums, questions };
            },
        });
        return { statusCode: common_1.HttpStatus.OK };
    }
};
JuryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(jury_dto_1.Jury.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService,
        candidat_service_1.CandidatService,
        MemberService,
        websocket_1.WsGateway,
        question_service_1.QuestionService])
], JuryService);
exports.JuryService = JuryService;
//# sourceMappingURL=jury.service.js.map