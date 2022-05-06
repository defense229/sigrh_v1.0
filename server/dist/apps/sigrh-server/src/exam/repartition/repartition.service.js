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
exports.RepartitionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const db_parser_1 = require("../../../../../libs/db-parser/src");
const repository_service_1 = require("../../repository/repository.service");
const repartition_dto_1 = require("./repartition.dto");
const mongoose_2 = require("mongoose");
const center_service_1 = require("../center/center.service");
const candidat_service_1 = require("../../candidat/candidat.service");
let RepartitionService = class RepartitionService extends repository_service_1.RepositoryService {
    constructor(model, dbParser, centerServices, candidateService) {
        super(model, dbParser);
        this.model = model;
        this.dbParser = dbParser;
        this.centerServices = centerServices;
        this.candidateService = candidateService;
        this.searchFields = [];
    }
    async getStats(exam) {
        const centers = await this.centerServices.find({ exam });
        const result = {};
        for (const center of centers) {
            result[center.departement] = {
                nbCenters: center.centers,
                nbRoomsPerCenter: center.rooms,
                nbCandidatePerRoom: center.candidates,
                totalCandidates: {
                    all: await this.candidateService.count({
                        exam,
                        $or: center.departement
                            .split('-')
                            .map((dep) => ({ departement: dep })),
                        sportAccept: true,
                        accepted: true,
                    }),
                    mens: await this.candidateService.count({
                        exam,
                        $or: center.departement
                            .split('-')
                            .map((dep) => ({ departement: dep })),
                        sportAccept: true,
                        sexe: 'H',
                        accepted: true,
                    }),
                    women: await this.candidateService.count({
                        exam,
                        $or: center.departement
                            .split('-')
                            .map((dep) => ({ departement: dep })),
                        sportAccept: true,
                        sexe: 'F',
                        accepted: true,
                    }),
                },
            };
        }
        return result;
    }
};
RepartitionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(repartition_dto_1.Repartition.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService,
        center_service_1.CenterService,
        candidat_service_1.CandidatService])
], RepartitionService);
exports.RepartitionService = RepartitionService;
//# sourceMappingURL=repartition.service.js.map