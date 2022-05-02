"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefConfigModule = void 0;
const common_1 = require("@nestjs/common");
const def_config_service_1 = require("./def-config.service");
const def_config_controller_1 = require("./def-config.controller");
const mongoose_1 = require("@nestjs/mongoose");
const def_config_dto_1 = require("./def-config.dto");
const db_parser_1 = require("../../../../libs/db-parser/src");
let DefConfigModule = class DefConfigModule {
};
DefConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: def_config_dto_1.DefConfig.name, schema: def_config_dto_1.DefConfigSchema },
            ]),
            db_parser_1.DbParserModule,
        ],
        controllers: [def_config_controller_1.DefConfigController],
        providers: [def_config_service_1.DefConfigService],
    })
], DefConfigModule);
exports.DefConfigModule = DefConfigModule;
//# sourceMappingURL=def-config.module.js.map