"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefrecrutLnModule = void 0;
const common_1 = require("@nestjs/common");
const defrecrut_ln_controller_1 = require("./defrecrut-ln.controller");
const defrecrut_ln_service_1 = require("./defrecrut-ln.service");
const departement_module_1 = require("./departement/departement.module");
const jury_module_1 = require("./jury/jury.module");
const question_module_1 = require("./question/question.module");
const candidat_module_1 = require("./candidat/candidat.module");
const mongoose_1 = require("@nestjs/mongoose");
const exam_module_1 = require("./exam/exam.module");
const def_config_module_1 = require("./def-config/def-config.module");
let DefrecrutLnModule = class DefrecrutLnModule {
};
DefrecrutLnModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://cluster0.pigxs.mongodb.net', {
                user: 'denfense',
                pass: 'H^x7MT5cFVxYe@6',
                dbName: 'defrecrut-ln-test',
                w: 'majority',
                retryWrites: true,
            }),
            departement_module_1.DepartementModule,
            jury_module_1.JuryModule,
            question_module_1.QuestionModule,
            candidat_module_1.CandidatModule,
            exam_module_1.ExamModule,
            def_config_module_1.DefConfigModule,
        ],
        controllers: [defrecrut_ln_controller_1.DefrecrutLnController],
        providers: [defrecrut_ln_service_1.DefrecrutLnService],
    })
], DefrecrutLnModule);
exports.DefrecrutLnModule = DefrecrutLnModule;
//# sourceMappingURL=defrecrut-ln.module.js.map