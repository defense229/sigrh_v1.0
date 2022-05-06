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
exports.JuryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jury_dto_1 = require("./jury.dto");
const jury_service_1 = require("./jury.service");
class LoginPayload {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginPayload.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginPayload.prototype, "password", void 0);
let JuryController = class JuryController {
    constructor(juryService) {
        this.juryService = juryService;
    }
    async create(exam) {
        return await this.juryService.createJury(exam);
    }
    async all(exam) {
        return await this.juryService.find({ exam, enabled: true });
    }
    async getJuryMembers(jury) {
        return await this.juryService.getJuryMembers(jury);
    }
    async getExamMembers(exam) {
        return await this.juryService.members(exam);
    }
    async createMember(member) {
        return await this.juryService.createMember(member);
    }
    async updateMember(id, member) {
        return await this.juryService.updateMember(id, member);
    }
    async login(member) {
        return await this.juryService.login(member.username, member.password);
    }
    async archiveMany(ids) {
        const promises = ids.map((id) => this.juryService.archive(id));
        await Promise.all(promises);
        return { statusCode: common_1.HttpStatus.OK };
    }
    async archiveMembersMany(ids) {
        const promises = ids.map((id) => this.juryService.archiveMember(id));
        await Promise.all(promises);
        return { statusCode: common_1.HttpStatus.OK };
    }
    async pickCandidate(exam, dep, jury, num) {
        return this.juryService.pickCandidate(exam, num, dep, jury);
    }
    async pickCandidateNumbers(exam, dep, jury, num, nums) {
        return this.juryService.pickCandidateNumbers(exam, num, dep, jury, nums);
    }
};
__decorate([
    (0, common_1.Post)('exam/:exam'),
    __param(0, (0, common_1.Param)('exam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('exam/:exam'),
    __param(0, (0, common_1.Param)('exam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('members-jury/:jury'),
    __param(0, (0, common_1.Param)('jury')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "getJuryMembers", null);
__decorate([
    (0, common_1.Get)('members-exam/:exam'),
    __param(0, (0, common_1.Param)('exam')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "getExamMembers", null);
__decorate([
    (0, common_1.Post)('create-member'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jury_dto_1.Member]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "createMember", null);
__decorate([
    (0, common_1.Put)('update-member/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, jury_dto_1.Member]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "updateMember", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginPayload]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('archive'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "archiveMany", null);
__decorate([
    (0, common_1.Post)('archive-members'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "archiveMembersMany", null);
__decorate([
    (0, common_1.Get)('pick-candidate/:exam/:dep/:jury/:num'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Param)('dep')),
    __param(2, (0, common_1.Param)('jury')),
    __param(3, (0, common_1.Param)('num')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "pickCandidate", null);
__decorate([
    (0, common_1.Post)('pick-candidate-numbers/:exam/:dep/:jury/:num'),
    __param(0, (0, common_1.Param)('exam')),
    __param(1, (0, common_1.Param)('dep')),
    __param(2, (0, common_1.Param)('jury')),
    __param(3, (0, common_1.Param)('num')),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Array]),
    __metadata("design:returntype", Promise)
], JuryController.prototype, "pickCandidateNumbers", null);
JuryController = __decorate([
    (0, common_1.Controller)('jury'),
    (0, swagger_1.ApiTags)('Jurys'),
    __metadata("design:paramtypes", [jury_service_1.JuryService])
], JuryController);
exports.JuryController = JuryController;
//# sourceMappingURL=jury.controller.js.map