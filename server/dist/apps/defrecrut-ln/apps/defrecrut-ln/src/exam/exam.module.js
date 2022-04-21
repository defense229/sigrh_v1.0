"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamModule = void 0;
const common_1 = require("@nestjs/common");
const exam_service_1 = require("./exam.service");
const exam_controller_1 = require("./exam.controller");
const mongoose_1 = require("@nestjs/mongoose");
const repository_1 = require("../../../../libs/repository/src");
const db_parser_1 = require("../../../../libs/db-parser/src");
const exam_dto_1 = require("./exam.dto");
let ExamModule = class ExamModule {
};
ExamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: exam_dto_1.Exam.name, schema: exam_dto_1.ExamSchema }]),
            repository_1.RepositoryModule,
            db_parser_1.DbParserModule,
        ],
        controllers: [exam_controller_1.ExamController],
        providers: [exam_service_1.ExamService],
    })
], ExamModule);
exports.ExamModule = ExamModule;
//# sourceMappingURL=exam.module.js.map