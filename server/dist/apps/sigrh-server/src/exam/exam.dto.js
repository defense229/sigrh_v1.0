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
exports.ExamSchema = exports.Exam = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const exam_types_1 = require("./exam.types");
const mongoose_2 = require("mongoose");
let Exam = class Exam {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exam.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'center', default: null }),
    __metadata("design:type", String)
], Exam.prototype, "center", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: exam_types_1.ExamStatus.NEW }),
    __metadata("design:type", String)
], Exam.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: exam_types_1.ExamStepStatus.INACTIVE }),
    __metadata("design:type", String)
], Exam.prototype, "candidateFileCollectStep", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: exam_types_1.ExamStepStatus.INACTIVE }),
    __metadata("design:type", String)
], Exam.prototype, "sportStep", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: exam_types_1.ExamStepStatus.INACTIVE }),
    __metadata("design:type", String)
], Exam.prototype, "fileAuthenticationStep", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: exam_types_1.ExamStepStatus.INACTIVE }),
    __metadata("design:type", String)
], Exam.prototype, "writingStep", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: exam_types_1.ExamStepStatus.INACTIVE }),
    __metadata("design:type", String)
], Exam.prototype, "healthControlStep", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Exam.prototype, "enabled", void 0);
Exam = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Exam);
exports.Exam = Exam;
exports.ExamSchema = mongoose_1.SchemaFactory.createForClass(Exam);
//# sourceMappingURL=exam.dto.js.map