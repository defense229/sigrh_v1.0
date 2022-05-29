import { HttpException, HttpStatus } from '@nestjs/common';

export function HandleHttpException(code?: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const fn = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        const bindedFn = fn.bind(this);
        const response = await bindedFn(...args);
        return response;
      } catch (error) {
        console.log(error);
        const lastArg = args[args.length - 1];
        throw new HttpException(
          {
            statusCode: code ? code : HttpStatus.BAD_REQUEST,
            message:
              error.response && error.response.data
                ? error.response.data.message
                : error.message,
          },
          lastArg && lastArg.code ? lastArg.code : HttpStatus.BAD_REQUEST,
        );
      }
    };
    return descriptor;
  };
}
