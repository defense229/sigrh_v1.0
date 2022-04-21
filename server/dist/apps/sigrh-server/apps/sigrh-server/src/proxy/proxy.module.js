"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyModule = exports.PROXY_BASE_URL_ = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const candidat_schema_1 = require("../candidat/candidat.schema");
const user_schema_1 = require("../auth/user.schema");
const proxy_service_1 = require("./proxy.service");
const proxy_controller_1 = require("./proxy.controller");
exports.PROXY_BASE_URL_ = 'https://defrecrut-backend-dot-defrecrut.ew.r.appspot.com/api/';
let ProxyModule = class ProxyModule {
};
ProxyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: candidat_schema_1.Candidat.name, schema: candidat_schema_1.CandidatSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        providers: [proxy_service_1.ProxyService],
        controllers: [proxy_controller_1.ProxyController],
    })
], ProxyModule);
exports.ProxyModule = ProxyModule;
//# sourceMappingURL=proxy.module.js.map