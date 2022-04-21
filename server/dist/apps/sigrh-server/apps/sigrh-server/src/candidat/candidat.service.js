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
exports.CandidatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const candidat_schema_1 = require("./candidat.schema");
const lib_1 = require("../lib");
const mongoose_2 = require("mongoose");
const db_parser_1 = require("../../../../libs/db-parser/src");
const repository_service_1 = require("../repository/repository.service");
let CandidatService = class CandidatService extends repository_service_1.RepositoryService {
    constructor(model, dbParser) {
        super(model, dbParser);
        this.model = model;
        this.dbParser = dbParser;
        this.searchFields = ['nom', 'prenom', 'numero', 'telephone'];
    }
    async filter(query) {
        return await this.model.find(query);
    }
    async findDeep(query, pagination = { page: 1, limit: 10 }) {
        const values = await this.model.find(Object.assign({}, query), null, {
            skip: (pagination.page - 1) * pagination.limit,
            limit: pagination.limit,
        });
        const total = await this.model.countDocuments(Object.assign({}, query));
        const mens = await this.model.countDocuments(Object.assign({ sexe: 'H' }, query));
        const womens = await this.model.countDocuments(Object.assign({ sexe: 'F' }, query));
        const aideSoignants = await this.model.countDocuments(Object.assign({ demobilise: lib_1.DF_TYPE_CANDIDAT.aideSoignant }, query));
        const enseignants = await this.model.countDocuments(Object.assign({ demobilise: lib_1.DF_TYPE_CANDIDAT.enseignant }, query));
        const normals = total - aideSoignants - enseignants;
        return {
            total,
            values,
            gender: { male: mens, female: womens },
            category: {
                normal: normals,
                aideSoignant: aideSoignants,
                enseignant: enseignants,
            },
        };
    }
    async verify(id, status) {
        const firstCondition = await this.model.findOne({
            accepted: true,
            numero: id,
        });
        const secondCondition = await this.model.findOne({
            accepted: true,
            numeroPiece: id,
        });
        if (!firstCondition && !secondCondition) {
            const foundedCandidate = await this.model.findById(id);
            throw new common_1.HttpException(foundedCandidate ? foundedCandidate.motif : 'Dossier non accepté', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        if (!Object.values(lib_1.DF_TYPE_CANDIDAT).includes(status.toUpperCase())) {
            throw new common_1.HttpException('Invalid status: one of <NORMAL>, <ENSEIGNANT>, <AIDE_SOIGNANT> has been expected', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const updatedValue = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(firstCondition ? firstCondition : secondCondition))), { sportPresent: true, demobilise: status.toUpperCase() });
        await this.model.updateOne({ _id: updatedValue._id }, updatedValue);
        return {
            statusCode: 200,
            message: 'Candidat marqué présent avec succès',
            id: updatedValue._id,
        };
    }
    async accept(id) {
        const firstCondition = await this.model.findOne({
            sportPresent: true,
            numero: id,
        });
        const secondCondition = await this.model.findOne({
            sportPresent: true,
            numeroPiece: id,
        });
        if (!firstCondition && !secondCondition) {
            throw new common_1.HttpException('Ce candidat ne peut être accepté : présence non validée', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const updatedValue = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(firstCondition ? firstCondition : secondCondition))), { sportAccept: true });
        await this.model.updateOne({ _id: updatedValue._id }, updatedValue);
        return {
            statusCode: 200,
            message: 'Candidat marqué accepté avec succès',
            id: updatedValue._id,
        };
    }
    async getCollectStats(id) {
        const received = await this.model.countDocuments({
            enabled: true,
            exam: id,
        });
        const accepted = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            exam: id,
        });
        const rejected = await this.model.countDocuments({
            enabled: true,
            accepted: false,
            exam: id,
        });
        return {
            received,
            accepted,
            rejected,
        };
    }
    async getCollectStatsAll(id) {
        let received = await this.model.countDocuments({
            enabled: true,
            exam: id,
        });
        let receivedMen = await this.model.countDocuments({
            enabled: true,
            sexe: 'H',
            exam: id,
        });
        let receivedWomen = await this.model.countDocuments({
            enabled: true,
            sexe: 'F',
            exam: id,
        });
        let accepted = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            exam: id,
        });
        let acceptedMen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sexe: 'H',
            exam: id,
        });
        let acceptedWomen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sexe: 'F',
            exam: id,
        });
        let rejected = await this.model.countDocuments({
            enabled: true,
            accepted: false,
            exam: id,
        });
        let rejectedMen = await this.model.countDocuments({
            enabled: true,
            accepted: false,
            sexe: 'H',
            exam: id,
        });
        let rejectedWomen = await this.model.countDocuments({
            enabled: true,
            accepted: false,
            sexe: 'F',
            exam: id,
        });
        let mens = await this.model.countDocuments({ enabled: true, sexe: 'H' });
        let womens = await this.model.countDocuments({
            enabled: true,
            sexe: 'F',
        });
        const result = {
            all: {
                received,
                receivedMen,
                receivedWomen,
                accepted,
                acceptedMen,
                acceptedWomen,
                rejected,
                rejectedMen,
                rejectedWomen,
                mens,
                womens,
            },
        };
        for (const dep of lib_1.DF_DEPARTEMENTS) {
            received = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                exam: id,
            });
            receivedMen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                sexe: 'H',
                exam: id,
            });
            receivedWomen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                sexe: 'F',
                exam: id,
            });
            accepted = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                exam: id,
            });
            acceptedMen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sexe: 'H',
                exam: id,
            });
            acceptedWomen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sexe: 'F',
                exam: id,
            });
            rejected = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: false,
                exam: id,
            });
            rejectedMen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: false,
                sexe: 'H',
                exam: id,
            });
            rejectedWomen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: false,
                sexe: 'F',
                exam: id,
            });
            mens = await this.model.countDocuments({
                enabled: true,
                sexe: 'H',
                departement: dep,
            });
            womens = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                sexe: 'F',
            });
            result[dep] = {
                received,
                receivedMen,
                receivedWomen,
                accepted,
                acceptedMen,
                acceptedWomen,
                rejected,
                rejectedMen,
                rejectedWomen,
                mens,
                womens,
            };
        }
        return result;
    }
    async getSportStats(id) {
        const presents = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportPresent: true,
            exam: id,
        });
        const notPresents = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportPresent: false,
            exam: id,
        });
        const accepted = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportAccept: true,
            exam: id,
        });
        const notAccepted = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportPresent: true,
            sportAccept: false,
            exam: id,
        });
        return { presents, notPresents, accepted, notAccepted };
    }
    async getSportStatsAll(id) {
        let presents = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportPresent: true,
            exam: id,
        });
        let presentsMen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sexe: 'H',
            sportPresent: true,
            exam: id,
        });
        let presentsWomen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sexe: 'F',
            sportPresent: true,
            exam: id,
        });
        let notPresents = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportPresent: false,
            exam: id,
        });
        let notPresentsMen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sexe: 'H',
            sportPresent: false,
            exam: id,
        });
        let notPresentsWomen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportPresent: false,
            sexe: 'F',
            exam: id,
        });
        let accepted = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportAccept: true,
            exam: id,
        });
        let acceptedMen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportAccept: true,
            sexe: 'H',
            exam: id,
        });
        let acceptedWomen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sexe: 'F',
            sportAccept: true,
            exam: id,
        });
        let notAccepted = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportPresent: true,
            sportAccept: false,
            exam: id,
        });
        let notAcceptedMen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportPresent: true,
            sportAccept: false,
            sexe: 'H',
            exam: id,
        });
        let notAcceptedWomen = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportPresent: true,
            sexe: 'F',
            sportAccept: false,
            exam: id,
        });
        const result = {
            all: {
                presents,
                notPresents,
                accepted,
                notAccepted,
                acceptedMen,
                acceptedWomen,
                presentsMen,
                presentsWomen,
                notAcceptedMen,
                notAcceptedWomen,
                notPresentsMen,
                notPresentsWomen,
            },
        };
        for (const dep of lib_1.DF_DEPARTEMENTS) {
            let presents = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sportPresent: true,
                exam: id,
            });
            let presentsMen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sexe: 'H',
                sportPresent: true,
                exam: id,
            });
            let presentsWomen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sexe: 'F',
                sportPresent: true,
                exam: id,
            });
            let notPresents = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sportPresent: false,
                exam: id,
            });
            let notPresentsMen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sexe: 'H',
                sportPresent: false,
                exam: id,
            });
            let notPresentsWomen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sportPresent: false,
                sexe: 'F',
                exam: id,
            });
            let accepted = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sportAccept: true,
                exam: id,
            });
            let acceptedMen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sportAccept: true,
                sexe: 'H',
                exam: id,
            });
            let acceptedWomen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sexe: 'F',
                sportAccept: true,
                exam: id,
            });
            let notAccepted = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sportPresent: true,
                sportAccept: false,
                exam: id,
            });
            let notAcceptedMen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sportPresent: true,
                sportAccept: false,
                sexe: 'H',
                exam: id,
            });
            let notAcceptedWomen = await this.model.countDocuments({
                enabled: true,
                departement: dep,
                accepted: true,
                sportPresent: true,
                sexe: 'F',
                sportAccept: false,
                exam: id,
            });
            result[dep] = {
                presents,
                notPresents,
                accepted,
                notAccepted,
                acceptedMen,
                acceptedWomen,
                presentsMen,
                presentsWomen,
                notAcceptedMen,
                notAcceptedWomen,
                notPresentsMen,
                notPresentsWomen,
            };
        }
        return result;
    }
    async getDecStats(id) {
        const all = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportAccept: true,
            exam: id,
        });
        const accepted = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportAccept: true,
            exam: id,
            decAccept: true,
        });
        const rejected = await this.model.countDocuments({
            enabled: true,
            accepted: true,
            sportAccept: true,
            exam: id,
            decRefuse: true,
        });
        return { all, accepted, rejected };
    }
    async getWritingStats(id) { }
    async getHCStats(id) { }
    async getGlobalStats(id) { }
};
CandidatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(candidat_schema_1.Candidat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService])
], CandidatService);
exports.CandidatService = CandidatService;
//# sourceMappingURL=candidat.service.js.map