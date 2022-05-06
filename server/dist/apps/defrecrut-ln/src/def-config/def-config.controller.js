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
exports.DefConfigController = void 0;
const common_1 = require("@nestjs/common");
const def_config_service_1 = require("./def-config.service");
const def_config_dto_1 = require("./def-config.dto");
const swagger_1 = require("@nestjs/swagger");
let DefConfigController = class DefConfigController {
    constructor(defConfigService) {
        this.defConfigService = defConfigService;
    }
    async getConfig() {
        return this.defConfigService.getConfig();
    }
    async setConfig(body) {
        return this.defConfigService.updateQuestionConfig(body);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefConfigController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [def_config_dto_1.DefConfig]),
    __metadata("design:returntype", Promise)
], DefConfigController.prototype, "setConfig", null);
DefConfigController = __decorate([
    (0, common_1.Controller)('def-config'),
    (0, swagger_1.ApiTags)('Configs'),
    __metadata("design:paramtypes", [def_config_service_1.DefConfigService])
], DefConfigController);
exports.DefConfigController = DefConfigController;
//# sourceMappingURL=def-config.controller.js.map