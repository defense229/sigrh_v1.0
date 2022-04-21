"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const question_controller_1 = require("./question.controller");
const mongoose_1 = require("@nestjs/mongoose");
const question_dto_1 = require("./question.dto");
const repository_1 = require("../../../../libs/repository/src");
const db_parser_1 = require("../../../../libs/db-parser/src");
const score_service_1 = require("../consumers/score/score.service");
const axios_1 = require("@nestjs/axios");
const candidat_module_1 = require("../candidat/candidat.module");
let QuestionModule = class QuestionModule {
};
QuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: question_dto_1.Question.name, schema: question_dto_1.QuestionSchema },
            ]),
            repository_1.RepositoryModule,
            db_parser_1.DbParserModule,
            axios_1.HttpModule,
            candidat_module_1.CandidatModule,
        ],
        controllers: [question_controller_1.QuestionController],
        providers: [question_service_1.QuestionService, score_service_1.ScoreService],
        exports: [question_service_1.QuestionService],
    })
], QuestionModule);
exports.QuestionModule = QuestionModule;
//# sourceMappingURL=question.module.js.map