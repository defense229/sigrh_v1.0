"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbParserService = void 0;
const common_1 = require("@nestjs/common");
let DbParserService = class DbParserService {
    parseData(data) {
        const _data = JSON.parse(JSON.stringify(data));
        if (data) {
            if (data._id) {
                _data.id = data._id;
                delete _data._id;
            }
            if ('__v' in data)
                delete _data.__v;
        }
        return _data;
    }
};
DbParserService = __decorate([
    (0, common_1.Injectable)()
], DbParserService);
exports.DbParserService = DbParserService;
//# sourceMappingURL=db-parser.service.js.map