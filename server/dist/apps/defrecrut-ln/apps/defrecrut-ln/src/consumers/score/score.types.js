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
exports.ScorePayload = exports.FieldPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
class FieldPayload {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    __metadata("design:type", String)
], FieldPayload.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    __metadata("design:type", Number)
], FieldPayload.prototype, "coefficient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    __metadata("design:type", String)
], FieldPayload.prototype, "exam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Object, required: false }),
    __metadata("design:type", Object)
], FieldPayload.prototype, "extras", void 0);
exports.FieldPayload = FieldPayload;
class ScorePayload {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScorePayload.prototype, "exam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScorePayload.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScorePayload.prototype, "candidate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], ScorePayload.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScorePayload.prototype, "extras", void 0);
exports.ScorePayload = ScorePayload;
//# sourceMappingURL=score.types.js.map