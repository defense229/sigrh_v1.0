"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsEvents = exports.verify = exports.encrypt = void 0;
const crypto_1 = require("crypto");
function encrypt(pass) {
    const salt = (0, crypto_1.randomBytes)(16).toString('hex');
    const cipher = (0, crypto_1.pbkdf2Sync)(pass, salt, 10, 64, `sha512`).toString('hex');
    return salt + ':' + cipher;
}
exports.encrypt = encrypt;
function verify(pass, hash) {
    const [salt, cipher] = hash.split(':');
    const instance = (0, crypto_1.pbkdf2Sync)(pass, salt, 10, 64, `sha512`).toString('hex');
    return instance === cipher;
}
exports.verify = verify;
var WsEvents;
(function (WsEvents) {
    WsEvents["REPARTITION_END"] = "REPARTITION_END";
    WsEvents["REPARTITION_PROGRESS"] = "REPARTITION_PROGRESS";
    WsEvents["REPARTITION_ERROR"] = "REPARTITION_ERROR";
    WsEvents["ADD_SCORE"] = "ADD_SCORE";
    WsEvents["CANDIDATE_SELECTED"] = "CANDIDATE_SELECTED";
    WsEvents["CANDIDATE_NUMBERS_SELECTED"] = "CANDIDATE_NUMBERS_SELECTED";
})(WsEvents = exports.WsEvents || (exports.WsEvents = {}));
//# sourceMappingURL=utils.js.map