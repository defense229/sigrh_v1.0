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
exports.ScoreSchema = exports.Score = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
let Score = class Score {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Field',
    }),
    (0, swagger_1.ApiProperty)({ required: true }),
    __metadata("design:type", String)
], Score.prototype, "field", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({ required: true, minLength: 3 }),
    __metadata("design:type", String)
], Score.prototype, "candidate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, minlength: 3 }),
    (0, swagger_1.ApiProperty)({ required: true }),
    __metadata("design:type", String)
], Score.prototype, "exam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        type: Number,
    }),
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 20 }),
    __metadata("design:type", Number)
], Score.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Score.prototype, "extras", void 0);
Score = __decorate([
    (0, mongoose_1.Schema)()
], Score);
exports.Score = Score;
exports.ScoreSchema = mongoose_1.SchemaFactory.createForClass(Score);
//# sourceMappingURL=score-manager.dto.js.map