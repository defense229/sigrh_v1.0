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
exports.CenterSchema = exports.CenterUpdateInput = exports.Center = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const exam_types_1 = require("../exam.types");
let Center = class Center {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'exams' }),
    __metadata("design:type", String)
], Center.prototype, "exam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ minlength: 3 }),
    __metadata("design:type", String)
], Center.prototype, "departement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ min: 0, default: 1 }),
    __metadata("design:type", Number)
], Center.prototype, "centers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], Center.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ min: 0, default: null }),
    __metadata("design:type", Number)
], Center.prototype, "candidates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Center.prototype, "enabled", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Center.prototype, "percenteDone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: exam_types_1.ExamRepartitionStatus.WAITING }),
    __metadata("design:type", String)
], Center.prototype, "repartitionStatus", void 0);
Center = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Center);
exports.Center = Center;
class CenterUpdateInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], CenterUpdateInput.prototype, "centers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, mongoose_1.Prop)({ min: 0 }),
    __metadata("design:type", Number)
], CenterUpdateInput.prototype, "rooms", void 0);
exports.CenterUpdateInput = CenterUpdateInput;
exports.CenterSchema = mongoose_1.SchemaFactory.createForClass(Center);
//# sourceMappingURL=center.dto.js.map