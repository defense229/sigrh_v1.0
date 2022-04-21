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
exports.MbService = void 0;
const common_1 = require("@nestjs/common");
const candidat_service_1 = require("../candidat/candidat.service");
let MbService = class MbService {
    constructor(candidatService) {
        this.candidatService = candidatService;
    }
    async get(id) {
        return await this.candidatService.one(id);
    }
    async verify(id, status) {
        return await this.candidatService.verify(id, status);
    }
    async accept(id) {
        return await this.candidatService.accept(id);
    }
};
MbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [candidat_service_1.CandidatService])
], MbService);
exports.MbService = MbService;
//# sourceMappingURL=mb.service.js.map