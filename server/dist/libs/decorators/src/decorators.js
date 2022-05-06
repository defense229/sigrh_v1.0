"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleHttpException = void 0;
const common_1 = require("@nestjs/common");
function HandleHttpException(code) {
    return function (target, propertyKey, descriptor) {
        const fn = descriptor.value;
        descriptor.value = async function (...args) {
            try {
                const bindedFn = fn.bind(this);
                const response = await bindedFn(...args);
                return response;
            }
            catch (error) {
                console.log(error);
                const lastArg = args[args.length - 1];
                throw new common_1.HttpException({
                    statusCode: code ? code : common_1.HttpStatus.BAD_REQUEST,
                    message: error.response && error.response.data
                        ? error.response.data.message
                        : error.message,
                }, lastArg.code ? lastArg.code : common_1.HttpStatus.BAD_REQUEST);
            }
        };
        return descriptor;
    };
}
exports.HandleHttpException = HandleHttpException;
//# sourceMappingURL=decorators.js.map