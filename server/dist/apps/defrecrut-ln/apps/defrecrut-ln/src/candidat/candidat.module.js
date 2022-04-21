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
const candidat_service_1 = require("./candidat.service");
const candidat_controller_1 = require("./candidat.controller");
const candidat_dto_1 = require("./candidat.dto");
const mongoose_1 = require("@nestjs/mongoose");
const db_parser_1 = require("../../../../libs/db-parser/src");
const repository_1 = require("../../../../libs/repository/src");
const departement_module_1 = require("../departement/departement.module");
let CandidatModule = class CandidatModule {
};
CandidatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: candidat_dto_1.Candidat.name, schema: candidat_dto_1.CandidatSchema },
            ]),
            db_parser_1.DbParserModule,
            repository_1.RepositoryModule,
            departement_module_1.DepartementModule,
        ],
        controllers: [candidat_controller_1.CandidatController],
        providers: [candidat_service_1.CandidatService],
        exports: [candidat_service_1.CandidatService],
    })
], CandidatModule);
exports.CandidatModule = CandidatModule;
//# sourceMappingURL=candidat.module.js.map