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
exports.ScoreManagerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const score_manager_dto_1 = require("./score-manager.dto");
const mongoose_2 = require("mongoose");
const db_parser_1 = require("../../../libs/db-parser/src");
let ScoreManagerService = class ScoreManagerService {
    constructor(model, dbParser) {
        this.model = model;
        this.dbParser = dbParser;
    }
    async all() {
        const _result = await this.model.find({});
        return _result.map((item) => this.dbParser.parseData(item));
    }
    async findByExam(exam) {
        const _result = await this.model.find({ exam });
        return _result.map((item) => this.dbParser.parseData(item));
    }
    async countByExam(exam, field = 'ALL') {
        console.log(exam, field);
        let result;
        if (field !== 'ALL') {
            result = await this.model.countDocuments({ exam, field });
        }
        result = await this.model.countDocuments({ exam });
        return result;
    }
    async getCandidateScore(exam, candidate) {
        const _result = await this.model
            .find({ exam, candidate })
            .populate('field');
        const _computed = _result.map((item) => {
            const result = {
                value: item.value,
                candidate: item.candidate,
                coefficient: item.field.coefficient,
                field: item.field.label,
                poundValue: item.value * item.field.coefficient,
                extras: item.extras,
            };
            return result;
        });
        const sums = _computed.reduce((acc, cur) => {
            return {
                sum: acc.sum + cur.value * cur.coefficient,
                coefSum: acc.coefSum + cur.coefficient,
            };
        }, { sum: 0, coefSum: 0 });
        return Object.assign(Object.assign({ scores: _computed }, sums), { mean: (Math.round((sums.sum / sums.coefSum) * 100) / 100).toFixed(2) });
    }
    async getAllCandidates() {
        const _scores = await this.model.find({});
        const candidates = {};
        for (const score of _scores) {
            if (!(score.candidate in candidates))
                candidates[score.candidate] = '';
        }
        return Object.keys(candidates);
    }
    async getExamsScores(exam, sorted = true, reverse = false) {
        const candidates = await this.getAllCandidates();
        const promises = candidates.map((candidate) => this.getCandidateScore(exam, candidate));
        const scores = (await Promise.all(promises)).filter((score) => score.sum > 0);
        if (!sorted)
            return scores.map((score) => (Object.assign(Object.assign({}, score), { sum: score.sum.toFixed(2) })));
        if (sorted && !reverse)
            return scores
                .sort((a, b) => Number(a.mean) - Number(b.mean))
                .map((score) => (Object.assign(Object.assign({}, score), { sum: score.sum.toFixed(2) })));
        if (sorted && reverse)
            return scores
                .sort((a, b) => -Number(a.mean) + Number(b.mean))
                .map((score) => (Object.assign(Object.assign({}, score), { sum: score.sum.toFixed(2) })));
    }
    async save(payload) {
        try {
            const { field, candidate, exam, extras } = payload;
            const previousScore = await this.model.findOne({
                field,
                candidate,
                exam,
                extras,
            });
            if (!previousScore)
                return this.dbParser.parseData(await this.model.create(payload));
            return this.dbParser.parseData(await this.model.updateOne({ _id: previousScore.id }, { value: payload.value }));
        }
        catch (error) {
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.NOT_ACCEPTABLE, message: error.message }, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
};
ScoreManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(score_manager_dto_1.Score.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService])
], ScoreManagerService);
exports.ScoreManagerService = ScoreManagerService;
//# sourceMappingURL=score-manager.service.js.map