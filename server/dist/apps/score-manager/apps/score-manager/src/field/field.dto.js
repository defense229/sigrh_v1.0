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
exports.FieldSchema = exports.Field = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Field = class Field {
};
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, mongoose_1.Prop)({ required: true, minlength: 3 }),
    __metadata("design:type", String)
], Field.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Field.prototype, "coefficient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, mongoose_1.Prop)({ required: true, minlength: 3 }),
    __metadata("design:type", String)
], Field.prototype, "exam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Field.prototype, "extras", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Field.prototype, "enabled", void 0);
Field = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Field);
exports.Field = Field;
exports.FieldSchema = mongoose_1.SchemaFactory.createForClass(Field);
//# sourceMappingURL=field.dto.js.map