"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartementPrefix = exports.DF_DEPARTEMENTS = exports.DF_TYPE_CANDIDAT = exports.seed = void 0;
const seedLib = __importStar(require("./seed"));
exports.seed = seedLib;
exports.DF_TYPE_CANDIDAT = {
    normal: 'NORMAL',
    enseignant: 'ENSEIGNANT',
    aideSoignant: 'AIDE_SOIGNANT'
};
exports.DF_DEPARTEMENTS = [
    "Atacora", "Donga", "Alibori", "Borgou", "Collines",
    "Zou", "Atlantique", "Littoral", "Couffo", "Mono", "Oueme", "Plateau"
];
exports.getDepartementPrefix = exports.DF_DEPARTEMENTS.map(it => it.toUpperCase().substring(0, 3));
//# sourceMappingURL=index.js.map