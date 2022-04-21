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
const exam_dto_1 = require("./exam.dto");
const db_parser_1 = require("../../../../libs/db-parser/src");
const center_module_1 = require("./center/center.module");
const repository_module_1 = require("../repository/repository.module");
const score_service_1 = require("../consumers/score/score.service");
const axios_1 = require("@nestjs/axios");
const field_controller_1 = require("./field.controller");
const candidat_module_1 = require("../candidat/candidat.module");
const report_service_1 = require("../consumers/report/report.service");
const repartition_module_1 = require("./repartition/repartition.module");
const qrcode_service_1 = require("../consumers/qrcode/qrcode.service");
const websocket_1 = require("../../../../libs/websocket/src");
const departements_module_1 = require("./departements/departements.module");
let ExamModule = class ExamModule {
};
ExamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: exam_dto_1.Exam.name, schema: exam_dto_1.ExamSchema }]),
            db_parser_1.DbParserModule,
            center_module_1.CenterModule,
            repository_module_1.RepositoryModule,
            axios_1.HttpModule,
            candidat_module_1.CandidatModule,
            repartition_module_1.RepartitionModule,
            departements_module_1.DepartementsModule,
        ],
        controllers: [exam_controller_1.ExamController, field_controller_1.FieldController],
        providers: [
            exam_service_1.ExamService,
            score_service_1.ScoreService,
            report_service_1.ReportService,
            qrcode_service_1.QrcodeService,
            score_service_1.ScoreService,
            websocket_1.WsGateway,
        ],
    })
], ExamModule);
exports.ExamModule = ExamModule;
//# sourceMappingURL=exam.module.js.map