"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefConfigService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const db_parser_1 = require("../../../../libs/db-parser/src");
const mongoose_2 = require("mongoose");
const def_config_dto_1 = require("./def-config.dto");
let DefConfigService = class DefConfigService {
    constructor(model, dbParser) {
        this.model = model;
        this.dbParser = dbParser;
    }
    async getConfig() {
        const configs = await this.model.find({});
        return configs.length === 0 ? {} : this.dbParser.parseData(configs[0]);
    }
    async updateQuestionConfig(config) {
        const configs = await this.model.find({});
        if (configs.length === 0) {
            return await this.model.create(config);
        }
        await this.model.updateOne({ _id: configs[0]._id }, Object.assign({}, config));
        return this.dbParser.parseData(await this.model.findOne({ _id: configs[0]._id }));
    }
};
DefConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(def_config_dto_1.DefConfig.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService])
], DefConfigService);
exports.DefConfigService = DefConfigService;
//# sourceMappingURL=def-config.service.js.map