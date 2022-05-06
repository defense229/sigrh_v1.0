"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const candidat_schema_1 = require("./candidat.schema");
const candidat_service_1 = require("./candidat.service");
const candidat_controller_1 = require("./candidat.controller");
const repository_module_1 = require("../repository/repository.module");
const db_parser_1 = require("../../../../libs/db-parser/src");
const report_service_1 = require("../consumers/report/report.service");
const axios_1 = require("@nestjs/axios");
let CandidatModule = class CandidatModule {
};
CandidatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: candidat_schema_1.Candidat.name, schema: candidat_schema_1.CandidatSchema },
            ]),
            repository_module_1.RepositoryModule,
            db_parser_1.DbParserModule,
            axios_1.HttpModule,
        ],
        providers: [candidat_service_1.CandidatService, report_service_1.ReportService],
        controllers: [candidat_controller_1.CandidatController],
        exports: [candidat_service_1.CandidatService],
    })
], CandidatModule);
exports.CandidatModule = CandidatModule;
//# sourceMappingURL=candidat.module.js.map