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
exports.CenterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const center_dto_1 = require("./center.dto");
const center_service_1 = require("./center.service");
let CenterController = class CenterController {
    constructor(centerService) {
        this.centerService = centerService;
    }
    async create(center) {
        return await this.centerService.create(center);
    }
    async one(id) {
        return await this.centerService.one(id);
    }
    async getExamCenters(id) {
        return await this.centerService.find({ exam: id });
    }
    async update(id, center) {
        return await this.centerService.update(id, center);
    }
    async all() {
        return await this.centerService.all();
    }
    async archive(id) {
        return await this.centerService.archive(id);
    }
    async archiveMany(ids) {
        const promises = ids.map((id) => this.centerService.archive(id));
        await Promise.all(promises);
        return { statusCode: common_1.HttpStatus.OK };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [center_dto_1.Center]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "one", null);
__decorate([
    (0, common_1.Get)('exam/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "getExamCenters", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, center_dto_1.CenterUpdateInput]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "all", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "archive", null);
__decorate([
    (0, common_1.Post)('archive'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "archiveMany", null);
CenterController = __decorate([
    (0, swagger_1.ApiTags)('CENTERS'),
    (0, common_1.Controller)('centers'),
    __metadata("design:paramtypes", [center_service_1.CenterService])
], CenterController);
exports.CenterController = CenterController;
//# sourceMappingURL=center.controller.js.map