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
exports.SportController = void 0;
const common_1 = require("@nestjs/common");
const sport_service_1 = require("./sport.service");
const swagger_1 = require("@nestjs/swagger");
let SportController = class SportController {
    constructor(service) {
        this.service = service;
    }
    async getter_(cb, category = undefined) {
        try {
            if (!category) {
                return await cb();
            }
            return await cb(category);
        }
        catch (e) {
            throw new common_1.HttpException({
                code: common_1.HttpStatus.BAD_REQUEST,
                message: e.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getListAll(category = undefined) {
        return await this.getter_((x) => this.service.getListAll(x), category);
    }
    async getListPresents(category = undefined) {
        return await this.getter_((x) => this.service.getListPresents(x), category);
    }
    async getListNoPresents(category = undefined) {
        return await this.getter_((x) => this.service.getListNoPresents(x), category);
    }
    async getListAccepted(category = undefined) {
        return await this.getter_((x) => this.service.getListAccepted(x), category);
    }
    async getListNonAccepted(category = undefined) {
        return await this.getter_((x) => this.service.getListNonAccepted(x), category);
    }
};
__decorate([
    (0, common_1.Get)('/list-all'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SportController.prototype, "getListAll", null);
__decorate([
    (0, common_1.Get)('/list-presents'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SportController.prototype, "getListPresents", null);
__decorate([
    (0, common_1.Get)('/list-absents'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SportController.prototype, "getListNoPresents", null);
__decorate([
    (0, common_1.Get)('/list-accepted'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SportController.prototype, "getListAccepted", null);
__decorate([
    (0, common_1.Get)('/list-no-accepted'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SportController.prototype, "getListNonAccepted", null);
SportController = __decorate([
    (0, swagger_1.ApiTags)('DASHBOARD SPORT ROUTES'),
    (0, common_1.Controller)('sport'),
    __metadata("design:paramtypes", [sport_service_1.SportService])
], SportController);
exports.SportController = SportController;
//# sourceMappingURL=sport.controller.js.map