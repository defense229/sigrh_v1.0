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
exports.FieldService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const field_dto_1 = require("./field.dto");
const mongoose_2 = require("mongoose");
const db_parser_1 = require("../../../../libs/db-parser/src");
let FieldService = class FieldService {
    constructor(model, dbParser) {
        this.model = model;
        this.dbParser = dbParser;
    }
    async all() {
        const _result = await this.model.find({});
        return _result.map((item) => this.dbParser.parseData(item));
    }
    async findByExam(exam) {
        const _result = await this.model.find({ exam });
        return _result.map((item) => this.dbParser.parseData(item));
    }
    async one(id) {
        const _result = await this.model.findById(id);
        return this.dbParser.parseData(_result);
    }
    async create(field) {
        try {
            const _result = await this.model.create(field);
            return this.dbParser.parseData(_result);
        }
        catch (error) {
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.BAD_REQUEST, message: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, field) {
        try {
            const _result = await this.model.updateOne({ id }, field);
            return this.dbParser.parseData(_result);
        }
        catch (error) {
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.BAD_REQUEST, message: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        await this.update(id, { enabled: false });
    }
};
FieldService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(field_dto_1.Field.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService])
], FieldService);
exports.FieldService = FieldService;
//# sourceMappingURL=field.service.js.map