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
exports.MemberSchema = exports.JurySchema = exports.Member = exports.Jury = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const jury_types_1 = require("./jury.types");
const mongoose_2 = require("mongoose");
let Jury = class Jury {
};
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Jury.prototype, "numero", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Jury.prototype, "exam", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Jury.prototype, "enabled", void 0);
Jury = __decorate([
    (0, mongoose_1.Schema)()
], Jury);
exports.Jury = Jury;
let Member = class Member {
};
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Member.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Member.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Jury' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Member.prototype, "jury", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Member.prototype, "exam", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Departement' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Member.prototype, "departement", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: jury_types_1.JuryMemberRole }),
    (0, swagger_1.ApiProperty)({ enum: jury_types_1.JuryMemberRole }),
    __metadata("design:type", String)
], Member.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Member.prototype, "enabled", void 0);
Member = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Member);
exports.Member = Member;
exports.JurySchema = mongoose_1.SchemaFactory.createForClass(Jury);
exports.MemberSchema = mongoose_1.SchemaFactory.createForClass(Member);
//# sourceMappingURL=jury.dto.js.map