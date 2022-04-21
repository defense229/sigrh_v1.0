"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const candidat_module_1 = require("./candidat/candidat.module");
const mb_module_1 = require("./mb/mb.module");
const ds_module_1 = require("./ds/ds.module");
const proxy_module_1 = require("./proxy/proxy.module");
const qrcode_service_1 = require("./consumers/qrcode/qrcode.service");
const score_service_1 = require("./consumers/score/score.service");
const axios_1 = require("@nestjs/axios");
const exam_module_1 = require("./exam/exam.module");
const repository_module_1 = require("./repository/repository.module");
const config_1 = require("../../../libs/config/src");
const report_service_1 = require("./consumers/report/report.service");
const websocket_1 = require("../../../libs/websocket/src");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://cluster0.pigxs.mongodb.net', {
                user: 'denfense',
                pass: 'H^x7MT5cFVxYe@6',
                dbName: config_1.config.db_name,
                w: 'majority',
                retryWrites: true,
            }),
            auth_module_1.AuthModule,
            candidat_module_1.CandidatModule,
            mb_module_1.MbModule,
            ds_module_1.DsModule,
            proxy_module_1.ProxyModule,
            axios_1.HttpModule,
            exam_module_1.ExamModule,
            repository_module_1.RepositoryModule,
            websocket_1.WebsocketModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, qrcode_service_1.QrcodeService, score_service_1.ScoreService, report_service_1.ReportService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map