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
exports.DepartementsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const departements_dto_1 = require("./departements.dto");
const departements_service_1 = require("./departements.service");
let DepartementsController = class DepartementsController {
    constructor(departementsService) {
        this.departementsService = departementsService;
    }
    async create(departement) {
        return await this.departementsService.create(departement);
    }
    async one(id) {
        return await this.departementsService.one(id);
    }
    async getExamDepartements(id) {
        return await this.departementsService.find({ exam: id });
    }
    async update(id, departement) {
        return await this.departementsService.update(id, departement);
    }
    async all() {
        return await this.departementsService.all();
    }
    async archive(id) {
        return await this.departementsService.archive(id);
    }
    async archiveMany(ids) {
        const promises = ids.map((id) => this.departementsService.archive(id));
        await Promise.all(promises);
        return { statusCode: common_1.HttpStatus.OK };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [departements_dto_1.Departement]),
    __metadata("design:returntype", Promise)
], DepartementsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartementsController.prototype, "one", null);
__decorate([
    (0, common_1.Get)('exam/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartementsController.prototype, "getExamDepartements", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, departements_dto_1.Departement]),
    __metadata("design:returntype", Promise)
], DepartementsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartementsController.prototype, "all", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartementsController.prototype, "archive", null);
__decorate([
    (0, common_1.Post)('archive'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DepartementsController.prototype, "archiveMany", null);
DepartementsController = __decorate([
    (0, swagger_1.ApiTags)('DEPARTEMENTS'),
    (0, common_1.Controller)('departements'),
    __metadata("design:paramtypes", [departements_service_1.DepartementsService])
], DepartementsController);
exports.DepartementsController = DepartementsController;
//# sourceMappingURL=departements.controller.js.map