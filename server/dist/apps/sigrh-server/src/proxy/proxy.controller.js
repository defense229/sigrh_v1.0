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
exports.ProxyController = void 0;
const common_1 = require("@nestjs/common");
const proxy_service_1 = require("./proxy.service");
const swagger_1 = require("@nestjs/swagger");
let ProxyController = class ProxyController {
    constructor(service) {
        this.service = service;
    }
    async getUsers() {
        return await this.service.getUsers();
    }
    async getCandidates() {
        return await this.service.getCandidates();
    }
    async associateToExam(normal, teachers, helpers) {
        return await this.service.associate(normal, teachers, helpers);
    }
};
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('candidats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "getCandidates", null);
__decorate([
    (0, common_1.Get)('candidats/associate-exam/:normal/:teachers/:helpers'),
    __param(0, (0, common_1.Param)('normal')),
    __param(1, (0, common_1.Param)('teachers')),
    __param(2, (0, common_1.Param)('helpers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "associateToExam", null);
ProxyController = __decorate([
    (0, swagger_1.ApiTags)('PROXY: DOWNLOAD ONLINE DB COLLECTION INTO LOCAL'),
    (0, common_1.Controller)('proxy'),
    __metadata("design:paramtypes", [proxy_service_1.ProxyService])
], ProxyController);
exports.ProxyController = ProxyController;
//# sourceMappingURL=proxy.controller.js.map