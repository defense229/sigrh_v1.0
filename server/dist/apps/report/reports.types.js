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
exports.IXlsxDownloadPayload = exports.IPdfDownloadPayload = exports.PDFFormat = void 0;
const swagger_1 = require("@nestjs/swagger");
var PDFFormat;
(function (PDFFormat) {
    PDFFormat["A0"] = "A0";
    PDFFormat["A1"] = "A1";
    PDFFormat["A2"] = "A2";
    PDFFormat["A3"] = "A3";
    PDFFormat["A4"] = "A4";
    PDFFormat["A5"] = "A5";
    PDFFormat["A6"] = "A6";
    PDFFormat["Letter"] = "Letter";
})(PDFFormat = exports.PDFFormat || (exports.PDFFormat = {}));
class IPdfDownloadPayload {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IPdfDownloadPayload.prototype, "html", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: false }),
    __metadata("design:type", Boolean)
], IPdfDownloadPayload.prototype, "landscape", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: PDFFormat }),
    __metadata("design:type", String)
], IPdfDownloadPayload.prototype, "format", void 0);
exports.IPdfDownloadPayload = IPdfDownloadPayload;
class IXlsxDownloadPayload {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], IXlsxDownloadPayload.prototype, "data", void 0);
exports.IXlsxDownloadPayload = IXlsxDownloadPayload;
//# sourceMappingURL=reports.types.js.map