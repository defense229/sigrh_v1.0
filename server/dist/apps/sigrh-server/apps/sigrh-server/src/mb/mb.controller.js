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
exports.MbController = void 0;
const common_1 = require("@nestjs/common");
const mb_service_1 = require("./mb.service");
const swagger_1 = require("@nestjs/swagger");
let MbController = class MbController {
    constructor(mbService) {
        this.mbService = mbService;
    }
    async confirmPresence(id, status) {
        try {
            return await this.mbService.verify(id, status);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async confirmAccept(id) {
        try {
            return await this.mbService.accept(id);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async candidatInfo(id) {
        try {
            return await this.mbService.get(id);
        }
        catch (e) {
            throw new common_1.HttpException('Invalid id!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
};
__decorate([
    (0, common_1.Get)('/confirm-presence/:id/:status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MbController.prototype, "confirmPresence", null);
__decorate([
    (0, common_1.Get)('/confirm-accept/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MbController.prototype, "confirmAccept", null);
__decorate([
    (0, common_1.Get)('/candidat-info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MbController.prototype, "candidatInfo", null);
MbController = __decorate([
    (0, swagger_1.ApiTags)('MOBILE ROUTES'),
    (0, common_1.Controller)('mb'),
    __metadata("design:paramtypes", [mb_service_1.MbService])
], MbController);
exports.MbController = MbController;
//# sourceMappingURL=mb.controller.js.map