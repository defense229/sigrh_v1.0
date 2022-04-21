"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuryModule = void 0;
const common_1 = require("@nestjs/common");
const jury_service_1 = require("./jury.service");
const jury_controller_1 = require("./jury.controller");
const mongoose_1 = require("@nestjs/mongoose");
const repository_1 = require("../../../../libs/repository/src");
const db_parser_1 = require("../../../../libs/db-parser/src");
const jury_dto_1 = require("./jury.dto");
const candidat_module_1 = require("../candidat/candidat.module");
const websocket_1 = require("../../../../libs/websocket/src");
const question_module_1 = require("../question/question.module");
let JuryModule = class JuryModule {
};
JuryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: jury_dto_1.Jury.name, schema: jury_dto_1.JurySchema },
                { name: jury_dto_1.Member.name, schema: jury_dto_1.MemberSchema },
            ]),
            repository_1.RepositoryModule,
            db_parser_1.DbParserModule,
            candidat_module_1.CandidatModule,
            websocket_1.WebsocketModule,
            question_module_1.QuestionModule,
        ],
        controllers: [jury_controller_1.JuryController],
        providers: [jury_service_1.JuryService, jury_service_1.MemberService],
    })
], JuryModule);
exports.JuryModule = JuryModule;
//# sourceMappingURL=jury.module.js.map