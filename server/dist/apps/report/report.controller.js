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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const exceljs_1 = require("exceljs");
const lib_1 = require("html-pdf-node-ts/lib");
const report_service_1 = require("./report.service");
const reports_types_1 = require("./reports.types");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async downloadPdf(payload) {
        console.log(payload);
        return await (0, lib_1.generatePdf)({ content: payload.html }, {
            format: payload.format ? payload.format : 'A4',
            landscape: payload.landscape ? payload.landscape : false,
            margin: payload.margin
                ? payload.margin
                : {
                    top: 20,
                    bottom: 20,
                    left: 30,
                    right: 30,
                },
            printBackground: true,
        });
    }
    async downloadXlsx(payload) {
        const workbook = new exceljs_1.Workbook();
        const sheet = workbook.addWorksheet('New sheet');
        const cols = payload.data[0];
        console.log(Object.keys(cols).map((it) => ({
            header: cols[it],
            key: it,
            width: 20,
        })));
        sheet.columns = Object.keys(cols).map((it) => ({
            header: it,
            key: it,
            width: 20,
        }));
        sheet.addRows(payload.data);
        return await workbook.xlsx.writeBuffer();
    }
};
__decorate([
    (0, common_1.Post)('download-pdf'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_types_1.IPdfDownloadPayload]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "downloadPdf", null);
__decorate([
    (0, common_1.Post)('download-xlsx'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_types_1.IXlsxDownloadPayload]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "downloadXlsx", null);
ReportController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map