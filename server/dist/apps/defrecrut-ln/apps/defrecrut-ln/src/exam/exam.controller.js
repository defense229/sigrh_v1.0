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
const exam_dto_1 = require("./exam.dto");
const exam_service_1 = require("./exam.service");
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
    async one(id) {
        return await this.examService.one(id);
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
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_dto_1.Exam]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "one", null);
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
ExamController = __decorate([
    (0, common_1.Controller)('exams'),
    (0, swagger_1.ApiTags)('Exams'),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
exports.ExamController = ExamController;
//# sourceMappingURL=exam.controller.js.map