"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartementsModule = void 0;
const common_1 = require("@nestjs/common");
const departements_service_1 = require("./departements.service");
const departements_controller_1 = require("./departements.controller");
const mongoose_1 = require("@nestjs/mongoose");
const departements_dto_1 = require("./departements.dto");
const repository_module_1 = require("../../repository/repository.module");
const db_parser_1 = require("../../../../../libs/db-parser/src");
let DepartementsModule = class DepartementsModule {
};
DepartementsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: departements_dto_1.Departement.name, schema: departements_dto_1.DepartementSchema },
            ]),
            repository_module_1.RepositoryModule,
            db_parser_1.DbParserModule,
        ],
        controllers: [departements_controller_1.DepartementsController],
        providers: [departements_service_1.DepartementsService],
    })
], DepartementsModule);
exports.DepartementsModule = DepartementsModule;
//# sourceMappingURL=departements.module.js.map