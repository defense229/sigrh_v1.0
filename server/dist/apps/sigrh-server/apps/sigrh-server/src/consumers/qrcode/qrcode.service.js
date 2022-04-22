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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrcodeService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("../../../../../libs/config/src");
const decorators_1 = require("../../decorators");
let QrcodeService = class QrcodeService {
    constructor(http) {
        this.http = http;
        this.baseUrl = config_1.config.api_url.qrcode_generator;
    }
    async create(qrcode) {
        const response = await this.http.axiosRef.post(this.baseUrl, qrcode);
        return response.data;
    }
    async verify(qrcodeValue) {
        try {
            const response = await this.http.axiosRef.get(this.baseUrl + qrcodeValue);
            return response.data.data;
        }
        catch (error) {
            return null;
        }
    }
};
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QrcodeService.prototype, "create", null);
QrcodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], QrcodeService);
exports.QrcodeService = QrcodeService;
//# sourceMappingURL=qrcode.service.js.map