"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.mode = void 0;
exports.mode = 'dev';
const _config = {
    dev: {
        api_url: {
            qrcode_generator: 'http://localhost:7002/api/v1/qrcodes/',
            score_manager: 'http://localhost:7003/api/v1/',
            report: 'http://localhost:7004/api/v1/',
        },
        db_name: 'defrecrut_test',
    },
    prod: {
        db_name: 'defrecrut_prod',
    },
};
exports.config = _config[exports.mode];
//# sourceMappingURL=index.js.map