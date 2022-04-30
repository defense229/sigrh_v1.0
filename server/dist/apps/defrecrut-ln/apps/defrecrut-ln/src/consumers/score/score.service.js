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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("../../../../../libs/config/src");
const decorators_1 = require("../../../../../libs/decorators/src");
let ScoreService = class ScoreService {
    constructor(http) {
        this.http = http;
        this.baseUrl = config_1.config.api_url.score_manager;
    }
    async getFields(exam) {
        const response = await this.http.axiosRef.get(this.baseUrl + 'fields/exam/' + exam);
        return response.data.filter((data) => data.enabled);
    }
    async getField(id) {
        const response = await this.http.axiosRef.get(this.baseUrl + 'fields/' + id);
        return response.data;
    }
    async addField(field) {
        const response = await this.http.axiosRef.post(this.baseUrl + 'fields', field);
        return response.data;
    }
    async updateField(id, field) {
        const response = await this.http.axiosRef.put(this.baseUrl + 'fields/' + id, field);
        return response.data;
    }
    async removeField(id) {
        await this.http.axiosRef.delete(this.baseUrl + 'fields/' + id);
        return {
            statusCode: common_1.HttpStatus.NO_CONTENT,
            message: 'Operation done successfully',
        };
    }
    async insertScore(score) {
        const response = await this.http.axiosRef.post(this.baseUrl + 'scores', score);
        return response.data;
    }
    async getResults(exam, sort) {
        const response = await this.http.axiosRef.get(this.baseUrl + 'scores/results/' + exam, {
            params: {
                sort,
            },
        });
        return response.data;
    }
    async countInsertedScores(exam, field = 'ALL') {
        console.log(exam);
        const response = await this.http.axiosRef.get(this.baseUrl + 'scores/count-scores/exam/' + exam + '?field=' + field);
        console.log(response.data);
        return response.data;
    }
};
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScoreService.prototype, "getFields", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScoreService.prototype, "getField", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScoreService.prototype, "addField", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScoreService.prototype, "updateField", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScoreService.prototype, "removeField", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScoreService.prototype, "insertScore", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScoreService.prototype, "getResults", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScoreService.prototype, "countInsertedScores", null);
ScoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ScoreService);
exports.ScoreService = ScoreService;
//# sourceMappingURL=score.service.js.map