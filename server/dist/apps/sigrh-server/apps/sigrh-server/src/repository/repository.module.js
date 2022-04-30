"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const repository_service_1 = require("./repository.service");
const db_parser_1 = require("../../../../libs/db-parser/src");
const mongoose_1 = require("@nestjs/mongoose");
const exam_dto_1 = require("../exam/exam.dto");
let RepositoryModule = class RepositoryModule {
};
RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            db_parser_1.DbParserModule,
            mongoose_1.MongooseModule.forFeature([{ name: exam_dto_1.Exam.name, schema: exam_dto_1.ExamSchema }]),
        ],
        providers: [repository_service_1.RepositoryService],
    })
], RepositoryModule);
exports.RepositoryModule = RepositoryModule;
//# sourceMappingURL=repository.module.js.map