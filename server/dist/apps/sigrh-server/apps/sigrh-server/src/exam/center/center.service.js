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
exports.CenterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const center_dto_1 = require("./center.dto");
const mongoose_2 = require("mongoose");
const db_parser_1 = require("../../../../../libs/db-parser/src");
const repository_service_1 = require("../../repository/repository.service");
const decorators_1 = require("../../decorators");
const runner_1 = require("../../../../../libs/runner/src");
const websocket_1 = require("../../../../../libs/websocket/src");
const lib_1 = require("../../lib");
let CenterService = class CenterService extends repository_service_1.RepositoryService {
    constructor(model, dbParser, ws) {
        super(model, dbParser);
        this.model = model;
        this.dbParser = dbParser;
        this.ws = ws;
        this._isTaskRunning = {};
        this.searchFields = ['departement'];
    }
    async setRepartition(data, makeRepartition) {
        let _center = await this.findOne({
            departement: data.departement,
            exam: data.exam,
        });
        if (!_center) {
            _center = await this.create(data);
        }
        const backgroundTask = (0, runner_1.createRunner)({
            name: String(_center.id),
            fn: async () => {
                this._isTaskRunning[data.exam] = true;
                return await makeRepartition(_center);
            },
        });
        backgroundTask.run();
        backgroundTask.onTaskEnd((result) => {
            delete this._isTaskRunning[data.exam];
            console.log(result);
            this.ws.notify({
                event: lib_1.WsEvents.REPARTITION_END,
                cb: () => result,
            });
        });
        backgroundTask.onTaskError((error) => {
            delete this._isTaskRunning[data.exam];
            this.ws.notify({
                event: lib_1.WsEvents.REPARTITION_ERROR,
                cb: () => error,
            });
        });
        return _center;
    }
};
__decorate([
    (0, decorators_1.HandleHttpException)(common_1.HttpStatus.CONFLICT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [center_dto_1.Center, Object]),
    __metadata("design:returntype", Promise)
], CenterService.prototype, "setRepartition", null);
CenterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(center_dto_1.Center.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        db_parser_1.DbParserService,
        websocket_1.WsGateway])
], CenterService);
exports.CenterService = CenterService;
//# sourceMappingURL=center.service.js.map