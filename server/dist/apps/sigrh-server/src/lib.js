"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsEvents = exports.getDepartementCode = exports.getDepartementPrefix = exports.DF_DEPARTEMENTS = exports.DF_TYPE_CANDIDAT = exports.getEnv = void 0;
const dotenv_1 = require("dotenv");
function getEnv(name) {
    var _a;
    (0, dotenv_1.config)();
    return (_a = process.env[name]) !== null && _a !== void 0 ? _a : '';
}
exports.getEnv = getEnv;
exports.DF_TYPE_CANDIDAT = {
    normal: 'NORMAL',
    enseignant: 'ENSEIGNANT',
    aideSoignant: 'AIDE_SOIGNANT',
};
exports.DF_DEPARTEMENTS = [
    'Atacora',
    'Donga',
    'Alibori',
    'Borgou',
    'Collines',
    'Zou',
    'Atlantique',
    'Littoral',
    'Couffo',
    'Mono',
    'Oueme',
    'Plateau',
];
exports.getDepartementPrefix = exports.DF_DEPARTEMENTS.map((it) => it.toUpperCase().substring(0, 3));
const getDepartementCode = (department) => 10 + exports.DF_DEPARTEMENTS.findIndex((it) => it === department);
exports.getDepartementCode = getDepartementCode;
var WsEvents;
(function (WsEvents) {
    WsEvents["REPARTITION_END"] = "REPARTITION_END";
    WsEvents["REPARTITION_PROGRESS"] = "REPARTITION_PROGRESS";
    WsEvents["REPARTITION_ERROR"] = "REPARTITION_ERROR";
    WsEvents["ADD_SCORE"] = "ADD_SCORE";
    WsEvents["CANDIDATE_SELECTED"] = "CANDIDATE_SELECTED";
    WsEvents["CANDIDATE_NUMBERS_SELECTED"] = "CANDIDATE_NUMBERS_SELECTED";
})(WsEvents = exports.WsEvents || (exports.WsEvents = {}));
//# sourceMappingURL=lib.js.map