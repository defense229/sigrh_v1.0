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
exports.QrcodeGeneratorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const db_parser_1 = require("../../../libs/db-parser/src");
const qrcode_generator_dto_1 = require("./qrcode-generator.dto");
const qrcode_generator_service_1 = require("./qrcode-generator.service");
let QrcodeGeneratorController = class QrcodeGeneratorController {
    constructor(qrcodeGeneratorService, dbParser) {
        this.qrcodeGeneratorService = qrcodeGeneratorService;
        this.dbParser = dbParser;
    }
    async save(payload) {
        const result = await this.qrcodeGeneratorService.createQrcode(payload);
        return this.dbParser.parseData(result);
    }
    async verify(value) {
        return this.dbParser.parseData(await this.qrcodeGeneratorService.getOne(value));
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qrcode_generator_dto_1.Qrcode]),
    __metadata("design:returntype", Promise)
], QrcodeGeneratorController.prototype, "save", null);
__decorate([
    (0, common_1.Get)(':value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QrcodeGeneratorController.prototype, "verify", null);
QrcodeGeneratorController = __decorate([
    (0, swagger_1.ApiTags)('qrcodes'),
    (0, common_1.Controller)('qrcodes'),
    __metadata("design:paramtypes", [qrcode_generator_service_1.QrcodeGeneratorService,
        db_parser_1.DbParserService])
], QrcodeGeneratorController);
exports.QrcodeGeneratorController = QrcodeGeneratorController;
//# sourceMappingURL=qrcode-generator.controller.js.map