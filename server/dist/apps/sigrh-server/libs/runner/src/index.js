"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRunner = void 0;
const providers_1 = require("./providers");
function createRunner(args, runner = 'default') {
    return (0, providers_1._useRunner)(runner, args);
}
exports.createRunner = createRunner;
//# sourceMappingURL=index.js.map