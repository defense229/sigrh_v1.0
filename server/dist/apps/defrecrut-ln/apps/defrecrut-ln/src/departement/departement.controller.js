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
exports.DepartementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const departement_dto_1 = require("./departement.dto");
const departement_service_1 = require("./departement.service");
let DepartementController = class DepartementController {
    constructor(departementService) {
        this.departementService = departementService;
    }
    async all(exam) {
        return this.departementService.find({ exam });
    }
    async create(departement) {
        return this.departementService.create(departement);
    }
    async update(id, departement) {
        return this.departementService.update(id, departement);
    }
    async archiveMany(ids) {
        const promises = ids.map((id) => this.departementService.archive(id));
        await Promise.all(promises);
        return { statusCode: common_1.HttpStatus.OK };
    }
};
__decorate([
    (0, common_1.Get)('exam/:exam'),
    __param(0, (0, common_1.Param)('exam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartementController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [departement_dto_1.Departement]),
    __metadata("design:returntype", Promise)
], DepartementController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, departement_dto_1.Departement]),
    __metadata("design:returntype", Promise)
], DepartementController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('archive'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DepartementController.prototype, "archiveMany", null);
DepartementController = __decorate([
    (0, common_1.Controller)('departements'),
    (0, swagger_1.ApiTags)('Départements'),
    __metadata("design:paramtypes", [departement_service_1.DepartementService])
], DepartementController);
exports.DepartementController = DepartementController;
//# sourceMappingURL=departement.controller.js.map