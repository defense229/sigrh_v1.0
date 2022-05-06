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
exports.RepositoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const db_parser_1 = require("../../db-parser/src");
const decorators_1 = require("../../decorators/src");
const mongoose_2 = require("mongoose");
const repository_dto_1 = require("./repository.dto");
let RepositoryService = class RepositoryService {
    constructor(model, dbParser) {
        this.model = model;
        this.dbParser = dbParser;
        this.searcher = {};
        this.searchFields = [];
    }
    set searchFields(fields) {
        this.searcher = {};
        for (const field of fields) {
            this.searcher[field] = '';
        }
    }
    parsedSearchFields(search) {
        const result = [];
        for (const key in this.searcher) {
            result.push({ [key]: !search ? /.+/ : new RegExp(search, 'i') });
        }
        return { $or: result };
    }
    async all(limit = 10, skip = 0, search = undefined, query = {}, populate) {
        const total = await this.model.countDocuments(Object.assign(Object.assign({ enabled: true }, this.parsedSearchFields(search)), query));
        let _result;
        if (populate) {
            _result = await this.model
                .find(Object.assign(Object.assign({ enabled: true }, this.parsedSearchFields(search)), query))
                .populate(populate)
                .skip(skip)
                .limit(limit);
        }
        else {
            _result = await this.model
                .find(Object.assign(Object.assign({ enabled: true }, this.parsedSearchFields(search)), query))
                .skip(skip)
                .limit(limit);
        }
        return {
            values: _result.map((item) => this.dbParser.parseData(item)),
            total,
        };
    }
    async create(data) {
        const _result = await this.model.create(data);
        return this.dbParser.parseData(_result);
    }
    async one(id) {
        const _result = await this.model.findById(id);
        return this.dbParser.parseData(_result);
    }
    async update(id, data) {
        console.log(data);
        await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
        const _result = await this.model.findById(id);
        return this.dbParser.parseData(_result);
    }
    async archive(id) {
        await this.update(id, { enabled: false });
        return { statusCode: common_1.HttpStatus.OK };
    }
    async find(query, populate) {
        console.log('finding');
        let _result;
        if (populate) {
            console.log(populate);
            _result = await this.model
                .find(Object.assign({ enabled: true }, query))
                .populate(populate);
            console.log(_result);
        }
        else
            _result = await this.model.find(Object.assign({ enabled: true }, query));
        return _result.map((item) => this.dbParser.parseData(item));
    }
    async findOne(query) {
        const _result = await this.model.findOne(Object.assign({ enabled: true }, query));
        return this.dbParser.parseData(_result);
    }
    async count(query) {
        return await this.model.countDocuments(Object.assign(Object.assign({}, query), { enabled: true }));
    }
};
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    __metadata("design:returntype", Promise)
], RepositoryService.prototype, "all", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RepositoryService.prototype, "create", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RepositoryService.prototype, "one", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RepositoryService.prototype, "update", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RepositoryService.prototype, "archive", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RepositoryService.prototype, "find", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RepositoryService.prototype, "findOne", null);
__decorate([
    (0, decorators_1.HandleHttpException)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RepositoryService.prototype, "count", null);
RepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(repository_dto_1.Repository.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService])
], RepositoryService);
exports.RepositoryService = RepositoryService;
//# sourceMappingURL=repository.service.js.map