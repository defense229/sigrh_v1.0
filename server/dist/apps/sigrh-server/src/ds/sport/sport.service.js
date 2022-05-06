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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportService = void 0;
const common_1 = require("@nestjs/common");
const candidat_service_1 = require("../../candidat/candidat.service");
const lib_1 = require("../../lib");
let SportService = class SportService {
    constructor(candidatService) {
        this.candidatService = candidatService;
    }
    async exec_(query_, category = undefined) {
        let query = Object.assign({}, query_);
        if ([
            lib_1.DF_TYPE_CANDIDAT.aideSoignant,
            lib_1.DF_TYPE_CANDIDAT.enseignant,
            'Oui',
            'Non',
        ].includes(category)) {
            query = Object.assign(Object.assign({}, query), { demobilise: category });
        }
        return await this.candidatService.find(query);
    }
    async getListAll(category = undefined) {
        return await this.exec_({ accepted: true }, category);
    }
    async getListPresents(category = undefined) {
        return await this.exec_({
            accepted: true,
            sportPresent: true,
        }, category);
    }
    async getListNoPresents(category = undefined) {
        return await this.exec_({
            accepted: true,
            sportPresent: false,
        }, category);
    }
    async getListAccepted(category = undefined) {
        return await this.exec_({
            accepted: true,
            sportPresent: true,
            sportAccept: true,
        }, category);
    }
    async getListNonAccepted(category = undefined) {
        return await this.exec_({
            accepted: true,
            sportPresent: true,
            sportAccept: false,
        }, category);
    }
};
SportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [candidat_service_1.CandidatService])
], SportService);
exports.SportService = SportService;
//# sourceMappingURL=sport.service.js.map