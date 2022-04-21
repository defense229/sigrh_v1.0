"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartementModule = void 0;
const common_1 = require("@nestjs/common");
const departement_service_1 = require("./departement.service");
const departement_controller_1 = require("./departement.controller");
const mongoose_1 = require("@nestjs/mongoose");
const departement_dto_1 = require("./departement.dto");
const db_parser_1 = require("../../../../libs/db-parser/src");
const repository_1 = require("../../../../libs/repository/src");
let DepartementModule = class DepartementModule {
};
DepartementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: departement_dto_1.Departement.name, schema: departement_dto_1.DepartementSchema },
            ]),
            db_parser_1.DbParserModule,
            repository_1.RepositoryModule,
        ],
        controllers: [departement_controller_1.DepartementController],
        providers: [departement_service_1.DepartementService],
        exports: [departement_service_1.DepartementService],
    })
], DepartementModule);
exports.DepartementModule = DepartementModule;
//# sourceMappingURL=departement.module.js.map