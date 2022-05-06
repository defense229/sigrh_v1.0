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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const score_types_1 = require("../consumers/score/score.types");
const question_dto_1 = require("./question.dto");
const question_service_1 = require("./question.service");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async create(question) {
        return await this.questionService.create(question);
    }
    async getResults(exam) {
        console.log(exam);
        return await this.questionService.getResults(exam);
    }
    async one(id) {
        return await this.questionService.one(id);
    }
    async addScore(score) {
        return await this.questionService.createScore(score);
    }
    async all(exam) {
        return this.questionService.getAll(exam);
    }
    async archiveMany(ids) {
        const promises = ids.map((id) => this.questionService.remove(id));
        await Promise.all(promises);
        return { statusCode: common_1.HttpStatus.OK };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_dto_1.Question]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('results/:exam'),
    __param(0, (0, common_1.Param)('exam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getResults", null);
__decorate([
    (0, common_1.Get)(':exam/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "one", null);
__decorate([
    (0, common_1.Post)('add-score'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [score_types_1.ScorePayload]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "addScore", null);
__decorate([
    (0, common_1.Get)(':exam'),
    __param(0, (0, common_1.Param)('exam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "all", null);
__decorate([
    (0, common_1.Post)('archive'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "archiveMany", null);
QuestionController = __decorate([
    (0, common_1.Controller)('questions'),
    (0, swagger_1.ApiTags)('Questions'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map