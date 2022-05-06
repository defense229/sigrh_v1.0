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
exports.RepartitionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const repartition_service_1 = require("./repartition.service");
let RepartitionController = class RepartitionController {
    constructor(repartitionService) {
        this.repartitionService = repartitionService;
    }
    async getStats(exam) {
        console.log(exam);
        return await this.repartitionService.getStats(exam);
    }
    async getOne(exam, departement) {
        return await this.repartitionService.findOne({ exam, departement });
    }
};
__decorate([
    (0, common_1.Get)('stats/:exam/'),
    __param(0, (0, common_1.Param)('exam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RepartitionController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':exam/:departement'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Param)('departement')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RepartitionController.prototype, "getOne", null);
RepartitionController = __decorate([
    (0, swagger_1.ApiTags)('REPARTITIONS'),
    (0, common_1.Controller)('repartition'),
    __metadata("design:paramtypes", [repartition_service_1.RepartitionService])
], RepartitionController);
exports.RepartitionController = RepartitionController;
//# sourceMappingURL=repartition.controller.js.map