"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MbModule = void 0;
const common_1 = require("@nestjs/common");
const mb_service_1 = require("./mb.service");
const mb_controller_1 = require("./mb.controller");
const candidat_service_1 = require("../candidat/candidat.service");
const mongoose_1 = require("@nestjs/mongoose");
const candidat_schema_1 = require("../candidat/candidat.schema");
const db_parser_1 = require("../../../../libs/db-parser/src");
let MbModule = class MbModule {
};
MbModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: candidat_schema_1.Candidat.name, schema: candidat_schema_1.CandidatSchema },
            ]),
            db_parser_1.DbParserModule,
        ],
        controllers: [mb_controller_1.MbController],
        providers: [mb_service_1.MbService, candidat_service_1.CandidatService],
    })
], MbModule);
exports.MbModule = MbModule;
//# sourceMappingURL=mb.module.js.map