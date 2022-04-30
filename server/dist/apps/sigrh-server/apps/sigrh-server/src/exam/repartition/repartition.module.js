"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepartitionModule = void 0;
const common_1 = require("@nestjs/common");
const repartition_service_1 = require("./repartition.service");
const repartition_controller_1 = require("./repartition.controller");
const mongoose_1 = require("@nestjs/mongoose");
const repartition_dto_1 = require("./repartition.dto");
const repository_module_1 = require("../../repository/repository.module");
const db_parser_1 = require("../../../../../libs/db-parser/src");
const center_module_1 = require("../center/center.module");
const candidat_module_1 = require("../../candidat/candidat.module");
let RepartitionModule = class RepartitionModule {
};
RepartitionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: repartition_dto_1.Repartition.name, schema: repartition_dto_1.RepartitionSchema },
            ]),
            repository_module_1.RepositoryModule,
            db_parser_1.DbParserModule,
            center_module_1.CenterModule,
            candidat_module_1.CandidatModule,
        ],
        controllers: [repartition_controller_1.RepartitionController],
        providers: [repartition_service_1.RepartitionService],
        exports: [repartition_service_1.RepartitionService],
    })
], RepartitionModule);
exports.RepartitionModule = RepartitionModule;
//# sourceMappingURL=repartition.module.js.map