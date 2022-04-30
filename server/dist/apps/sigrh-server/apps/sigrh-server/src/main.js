"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v2');
    app.enableCors({ origin: '*' });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SIGRH API')
        .setVersion('2.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v2/docs', app, document);
    const PORT = process.env.PORT || 7000;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map