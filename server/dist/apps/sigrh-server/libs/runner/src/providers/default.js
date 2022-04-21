"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRunner = void 0;
class DefaultRunner {
    constructor(name, fn) {
        this._taskEnd = () => { };
        this._taskError = (error) => {
            console.log('[ERROR]: ', error.message);
        };
        this._fn = fn;
        this._name = name;
    }
    get name() {
        return this._name;
    }
    async run(args) {
        console.log(`[__runner__(${this._name})]: Task started`);
        try {
            const result = await this._fn(args);
            console.log(`[__runner__(${this._name})]: Task end`);
            this._taskEnd(result);
        }
        catch (error) {
            console.log(`[__runner__(${this._name})]: Task error occurs`);
            this._taskError(error);
        }
    }
    onTaskEnd(cb) {
        this._taskEnd = cb;
    }
    onTaskError(cb) {
        this._taskError = cb;
    }
}
exports.DefaultRunner = DefaultRunner;
//# sourceMappingURL=default.js.map