"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrcodeGeneratorModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const db_parser_1 = require("../../../libs/db-parser/src");
const qrcode_generator_controller_1 = require("./qrcode-generator.controller");
const qrcode_generator_dto_1 = require("./qrcode-generator.dto");
const qrcode_generator_service_1 = require("./qrcode-generator.service");
let QrcodeGeneratorModule = class QrcodeGeneratorModule {
};
QrcodeGeneratorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://cluster0.pigxs.mongodb.net', {
                user: 'denfense',
                pass: 'H^x7MT5cFVxYe@6',
                dbName: 'qrcode_generator',
                w: 'majority',
                retryWrites: true,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: qrcode_generator_dto_1.Qrcode.name, schema: qrcode_generator_dto_1.QrcodeSchema }]),
            db_parser_1.DbParserModule,
        ],
        controllers: [qrcode_generator_controller_1.QrcodeGeneratorController],
        providers: [qrcode_generator_service_1.QrcodeGeneratorService],
    })
], QrcodeGeneratorModule);
exports.QrcodeGeneratorModule = QrcodeGeneratorModule;
//# sourceMappingURL=qrcode-generator.module.js.map