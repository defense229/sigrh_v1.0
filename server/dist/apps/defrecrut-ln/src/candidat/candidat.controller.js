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
exports.CandidatController = exports.RepositoryQuery = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const candidat_dto_1 = require("./candidat.dto");
const candidat_service_1 = require("./candidat.service");
class RepositoryQuery {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], RepositoryQuery.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], RepositoryQuery.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], RepositoryQuery.prototype, "search", void 0);
exports.RepositoryQuery = RepositoryQuery;
let CandidatController = class CandidatController {
    constructor(candidatService) {
        this.candidatService = candidatService;
    }
    async all(exam, query) {
        return this.candidatService.all(query.limit, query.skip, query.search, { exam }, ['departement']);
    }
    async create(candidat) {
        const departement = await this.candidatService.getDepartement(candidat.exam, candidat.departement);
        const payload = Object.assign({}, candidat);
        if (departement) {
            payload.departement = departement.id;
        }
        const number_ = await this.candidatService.count({});
        payload.numero =
            String(new Date().getFullYear()).substring(2) +
                payload.sexe +
                (number_ + 1 + (candidat.numero ? Number(candidat.numero) : 0));
        return this.candidatService.create(payload);
    }
    async update(id, candidat) {
        return this.candidatService.update(id, candidat);
    }
    async archiveMany(ids) {
        const promises = ids.map((id) => this.candidatService.archive(id));
        await Promise.all(promises);
        return { statusCode: common_1.HttpStatus.OK };
    }
    async getJuryCandidates(jury) {
        return await this.candidatService.countJuryCandidates(jury);
    }
};
__decorate([
    (0, common_1.Get)(':exam'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, RepositoryQuery]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [candidat_dto_1.Candidat]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, candidat_dto_1.Candidat]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('archive'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "archiveMany", null);
__decorate([
    (0, common_1.Get)('jury/:jury'),
    __param(0, (0, common_1.Param)('jury')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatController.prototype, "getJuryCandidates", null);
CandidatController = __decorate([
    (0, common_1.Controller)('candidats'),
    (0, swagger_1.ApiTags)('Candidats'),
    __metadata("design:paramtypes", [candidat_service_1.CandidatService])
], CandidatController);
exports.CandidatController = CandidatController;
//# sourceMappingURL=candidat.controller.js.map