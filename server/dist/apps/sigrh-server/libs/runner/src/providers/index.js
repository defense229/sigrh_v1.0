"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._useRunner = exports._runners = void 0;
const default_1 = require("./default");
exports._runners = [
    { name: 'default', instance: default_1.DefaultRunner },
];
function _useRunner(name, args) {
    const _runner = exports._runners.find((runner) => runner.name === name);
    return new _runner.instance(args.name, args.fn);
}
exports._useRunner = _useRunner;
//# sourceMappingURL=index.js.map