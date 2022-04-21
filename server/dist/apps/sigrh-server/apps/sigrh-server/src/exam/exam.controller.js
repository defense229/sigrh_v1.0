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
exports.ExamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const score_types_1 = require("../consumers/score/score.types");
const exam_dto_1 = require("./exam.dto");
const exam_service_1 = require("./exam.service");
const gen_dep_array_1 = require("./templates/gen-dep-array");
const list_1 = require("./templates/list");
class ExamQuery {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], ExamQuery.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], ExamQuery.prototype, "skip", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ExamQuery.prototype, "search", void 0);
let ExamController = class ExamController {
    constructor(examService) {
        this.examService = examService;
    }
    async create(exam) {
        return await this.examService.create(exam);
    }
    async getRepartition(exam, departement) {
        return await this.examService.getRepartition(exam, departement);
    }
    async createRepartition(id) {
        return await this.examService.createRepartition(id);
    }
    async one(id) {
        return await this.examService.one(id);
    }
    async activeStep(id, step) {
        return await this.examService.activeStep(id, step);
    }
    async update(id, exam) {
        return await this.examService.update(id, exam);
    }
    async archive(id) {
        return await this.examService.archive(id);
    }
    async archiveMany(ids) {
        const promises = ids.map((id) => this.examService.archive(id));
        await Promise.all(promises);
        return { statusCode: common_1.HttpStatus.OK };
    }
    async all(query) {
        return await this.examService.all(Number(query.limit), Number(query.skip), query.search);
    }
    async downloadRepartition(exam, departement, res) {
        const data = await this.examService.getRepartition(exam, departement);
        const html = (0, list_1.getPdfList)(data);
        console.log(html);
        const buffer = await this.examService.downloadPdf(html);
        const path = (0, path_1.join)((0, os_1.tmpdir)(), `repartition_${departement}.pdf`);
        (0, fs_1.writeFileSync)(path, Buffer.from(buffer.data));
        res.download(path);
    }
    async downloadXlsx(exam, departement, res) {
        const data = await this.examService.getRepartition(exam, departement);
        console.log(data);
        const payload = (0, gen_dep_array_1.genDepObject)(data);
        const buffer = await this.examService.downloadXlsx(payload);
        const path = (0, path_1.join)((0, os_1.tmpdir)(), `repartition_${departement}.xlsx`);
        (0, fs_1.writeFileSync)(path, Buffer.from(buffer.data));
        res.download(path);
    }
    async addScore(payload) {
        await this.examService.addScore(payload);
        return { status: common_1.HttpStatus.OK };
    }
    async countScores(exam, field) {
        return await this.examService.countInsertedScores(exam, field);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.Exam]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('repartition/:exam/:departement'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Param)('departement')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getRepartition", null);
__decorate([
    (0, common_1.Post)('create-repartition/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "createRepartition", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "one", null);
__decorate([
    (0, common_1.Get)('active-step/:id/:step'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('step')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "activeStep", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_dto_1.Exam]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "archive", null);
__decorate([
    (0, common_1.Post)('archive'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "archiveMany", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExamQuery]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('download-repartition/pdf/:exam/:departement'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Param)('departement')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "downloadRepartition", null);
__decorate([
    (0, common_1.Get)('download-repartition/xlsx/:exam/:departement'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Param)('departement')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "downloadXlsx", null);
__decorate([
    (0, common_1.Post)('add-score'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [score_types_1.ScorePayload]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "addScore", null);
__decorate([
    (0, common_1.Get)('count-scores/:exam/:field'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Param)('field')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "countScores", null);
ExamController = __decorate([
    (0, swagger_1.ApiTags)('EXAMS'),
    (0, common_1.Controller)('exams'),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
exports.ExamController = ExamController;
//# sourceMappingURL=exam.controller.js.map