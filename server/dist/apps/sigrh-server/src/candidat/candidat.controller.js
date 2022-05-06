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
exports.CandidatController = void 0;
const common_1 = require("@nestjs/common");
const candidat_service_1 = require("./candidat.service");
const swagger_1 = require("@nestjs/swagger");
class CandidateQuery {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CandidateQuery.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], CandidateQuery.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CandidateQuery.prototype, "search", void 0);
let CandidatController = class CandidatController {
    constructor(candidatService) {
        this.candidatService = candidatService;
    }
    async all(query) {
        return await this.candidatService.all(Number(query.limit), Number(query.skip), query.search);
    }
    async getOne(id) {
        return await this.candidatService.one(id);
    }
    async findExams(query, id) {
        console.log(Number(query.limit), Number(query.skip), query.search, {
            exam: id,
        });
        return await this.candidatService.all(Number(query.limit), Number(query.skip), query.search, { exam: id });
    }
    async findExamsByType(query, id, type) {
        let condition;
        switch (type) {
            case 'accepted':
                condition = { accepted: true };
                break;
            case 'rejected':
                condition = { accepted: false };
                break;
            case 'sport-present':
                condition = { accepted: true, sportPresent: true };
                break;
            case 'sport-absent':
                condition = { accepted: true, sportPresent: false };
                break;
            case 'sport-accepted':
                condition = { accepted: true, sportAccept: true };
                break;
            case 'sport-rejected':
                condition = { accepted: true, sportAccept: false, sportPresent: true };
                break;
        }
        return await this.candidatService.all(Number(query.limit), Number(query.skip), query.search, Object.assign({ exam: id }, condition));
    }
    async getCollectStats(id) {
        return await this.candidatService.getCollectStats(id);
    }
    async getCollectStatsAll(id) {
        return await this.candidatService.getCollectStatsAll(id);
    }
    async getSportStats(id) {
        return await this.candidatService.getSportStats(id);
    }
    async getSportStatsAll(id) {
        return await this.candidatService.getSportStatsAll(id);
    }
    async getDecStats(id) {
        return await this.candidatService.getDecStats(id);
    }
    async getAllStats(id) {
        return {
            candidateFileCollectStep: await this.candidatService.getCollectStats(id),
            sportStep: await this.candidatService.getSportStats(id),
            fileAuthenticationStep: await this.candidatService.getDecStats(id),
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CandidateQuery]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('exam/:id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CandidateQuery, String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "findExams", null);
__decorate([
    (0, common_1.Get)('exam/:id/file-collect/:type'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CandidateQuery, String, String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "findExamsByType", null);
__decorate([
    (0, common_1.Get)('file-collect-stats/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "getCollectStats", null);
__decorate([
    (0, common_1.Get)('file-collect-stats-all/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "getCollectStatsAll", null);
__decorate([
    (0, common_1.Get)('sport-stats/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "getSportStats", null);
__decorate([
    (0, common_1.Get)('sport-stats-all/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "getSportStatsAll", null);
__decorate([
    (0, common_1.Get)('dec-stats/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "getDecStats", null);
__decorate([
    (0, common_1.Get)('all-stats/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "getAllStats", null);
CandidatController = __decorate([
    (0, swagger_1.ApiTags)('CANDIDATS'),
    (0, common_1.Controller)('candidats'),
    __metadata("design:paramtypes", [candidat_service_1.CandidatService])
], CandidatController);
exports.CandidatController = CandidatController;
//# sourceMappingURL=candidat.controller.js.map