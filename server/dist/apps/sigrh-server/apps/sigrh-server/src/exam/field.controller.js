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
exports.FieldController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const score_service_1 = require("../consumers/score/score.service");
const score_types_1 = require("../consumers/score/score.types");
let FieldController = class FieldController {
    constructor(service) {
        this.service = service;
    }
    async all(exam) {
        return await this.service.getFields(exam);
    }
    async create(field) {
        return await this.service.addField(field);
    }
};
__decorate([
    (0, common_1.Get)(':exam'),
    __param(0, (0, common_1.Param)('exam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FieldController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [score_types_1.FieldPayload]),
    __metadata("design:returntype", Promise)
], FieldController.prototype, "create", null);
FieldController = __decorate([
    (0, swagger_1.ApiTags)('FIELDS (Matieres)'),
    (0, common_1.Controller)('fields'),
    __metadata("design:paramtypes", [score_service_1.ScoreService])
], FieldController);
exports.FieldController = FieldController;
//# sourceMappingURL=field.controller.js.map