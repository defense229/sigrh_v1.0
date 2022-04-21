"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DsModule = void 0;
const common_1 = require("@nestjs/common");
const ds_service_1 = require("./ds.service");
const ds_controller_1 = require("./ds.controller");
const sport_module_1 = require("./sport/sport.module");
const db_parser_1 = require("../../../../libs/db-parser/src");
let DsModule = class DsModule {
};
DsModule = __decorate([
    (0, common_1.Module)({
        providers: [ds_service_1.DsService],
        controllers: [ds_controller_1.DsController],
        imports: [sport_module_1.SportModule, db_parser_1.DbParserModule],
    })
], DsModule);
exports.DsModule = DsModule;
//# sourceMappingURL=ds.module.js.map