"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldModule = void 0;
const common_1 = require("@nestjs/common");
const field_service_1 = require("./field.service");
const field_controller_1 = require("./field.controller");
const mongoose_1 = require("@nestjs/mongoose");
const field_dto_1 = require("./field.dto");
const db_parser_1 = require("../../../../libs/db-parser/src");
let FieldModule = class FieldModule {
};
FieldModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: field_dto_1.Field.name, schema: field_dto_1.FieldSchema }]),
            db_parser_1.DbParserModule,
        ],
        controllers: [field_controller_1.FieldController],
        providers: [field_service_1.FieldService],
    })
], FieldModule);
exports.FieldModule = FieldModule;
//# sourceMappingURL=field.module.js.map