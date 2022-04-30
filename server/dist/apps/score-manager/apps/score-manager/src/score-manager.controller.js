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
exports.ScoreManagerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const score_manager_dto_1 = require("./score-manager.dto");
const score_manager_service_1 = require("./score-manager.service");
let ScoreManagerController = class ScoreManagerController {
    constructor(scoreManagerService) {
        this.scoreManagerService = scoreManagerService;
    }
    async examsNotes(id) {
        return await this.scoreManagerService.findByExam(id);
    }
    async results(exam, sort = 'NONE') {
        return await this.scoreManagerService.getExamsScores(exam, sort === 'ASC' || sort === 'DESC', sort === 'DESC');
    }
    async examsNotesForCandidate(exam, candidate) {
        return await this.scoreManagerService.getCandidateScore(exam, candidate);
    }
    async create(payload) {
        return await this.scoreManagerService.save(payload);
    }
    async countScore(exam, field = 'ALL') {
        return await this.scoreManagerService.countByExam(exam, field);
    }
};
__decorate([
    (0, common_1.Get)('exam/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScoreManagerController.prototype, "examsNotes", null);
__decorate([
    (0, common_1.Get)('results/:exam'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScoreManagerController.prototype, "results", null);
__decorate([
    (0, common_1.Get)('/:exam/:candidate'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Param)('candidate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScoreManagerController.prototype, "examsNotesForCandidate", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [score_manager_dto_1.Score]),
    __metadata("design:returntype", Promise)
], ScoreManagerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('count-scores/exam/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('field')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScoreManagerController.prototype, "countScore", null);
ScoreManagerController = __decorate([
    (0, swagger_1.ApiTags)('scores'),
    (0, common_1.Controller)('scores'),
    __metadata("design:paramtypes", [score_manager_service_1.ScoreManagerService])
], ScoreManagerController);
exports.ScoreManagerController = ScoreManagerController;
//# sourceMappingURL=score-manager.controller.js.map