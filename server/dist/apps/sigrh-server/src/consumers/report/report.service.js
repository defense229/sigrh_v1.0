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
exports.ReportService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("../../../../../libs/config/src");
let ReportService = class ReportService {
    constructor(http) {
        this.http = http;
        this.baseUrl = config_1.config.api_url.report;
    }
    async downloadPdf(html, other = {}) {
        const response = await this.http.axiosRef.post(this.baseUrl + 'download-pdf', Object.assign({ html }, other));
        return response.data;
    }
    async downloadXlsx(data) {
        const response = await this.http.axiosRef.post(this.baseUrl + 'download-xlsx', { data });
        return response.data;
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map