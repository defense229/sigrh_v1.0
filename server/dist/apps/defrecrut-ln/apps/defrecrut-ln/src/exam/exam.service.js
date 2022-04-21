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
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const repository_1 = require("../../../../libs/repository/src");
const exam_dto_1 = require("./exam.dto");
const mongoose_2 = require("mongoose");
const db_parser_1 = require("../../../../libs/db-parser/src");
let ExamService = class ExamService extends repository_1.RepositoryService {
    constructor(model, dbParser) {
        super(model, dbParser);
        this.model = model;
        this.dbParser = dbParser;
        this.searchFields = ['label'];
    }
};
ExamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exam_dto_1.Exam.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService])
], ExamService);
exports.ExamService = ExamService;
//# sourceMappingURL=exam.service.js.map