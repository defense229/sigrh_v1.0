"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreManagerModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const score_manager_controller_1 = require("./score-manager.controller");
const score_manager_dto_1 = require("./score-manager.dto");
const score_manager_service_1 = require("./score-manager.service");
const field_module_1 = require("./field/field.module");
const db_parser_1 = require("../../../libs/db-parser/src");
let ScoreManagerModule = class ScoreManagerModule {
};
ScoreManagerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://cluster0.pigxs.mongodb.net', {
                user: 'denfense',
                pass: 'H^x7MT5cFVxYe@6',
                dbName: 'score_manager',
                w: 'majority',
                retryWrites: true,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: score_manager_dto_1.Score.name, schema: score_manager_dto_1.ScoreSchema }]),
            field_module_1.FieldModule,
            db_parser_1.DbParserModule,
        ],
        controllers: [score_manager_controller_1.ScoreManagerController],
        providers: [score_manager_service_1.ScoreManagerService],
    })
], ScoreManagerModule);
exports.ScoreManagerModule = ScoreManagerModule;
//# sourceMappingURL=score-manager.module.js.map