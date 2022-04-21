"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CenterModule = void 0;
const common_1 = require("@nestjs/common");
const center_service_1 = require("./center.service");
const center_controller_1 = require("./center.controller");
const mongoose_1 = require("@nestjs/mongoose");
const center_dto_1 = require("./center.dto");
const db_parser_1 = require("../../../../../libs/db-parser/src");
const repository_module_1 = require("../../repository/repository.module");
const websocket_1 = require("../../../../../libs/websocket/src");
let CenterModule = class CenterModule {
};
CenterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: center_dto_1.Center.name, schema: center_dto_1.CenterSchema }]),
            db_parser_1.DbParserModule,
            repository_module_1.RepositoryModule,
            websocket_1.WebsocketModule,
        ],
        controllers: [center_controller_1.CenterController],
        providers: [center_service_1.CenterService],
        exports: [center_service_1.CenterService],
    })
], CenterModule);
exports.CenterModule = CenterModule;
//# sourceMappingURL=center.module.js.map