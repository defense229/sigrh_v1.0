"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const qrcode_generator_module_1 = require("./qrcode-generator.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(qrcode_generator_module_1.QrcodeGeneratorModule);
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Qrcode generator API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    const PORT = process.env.PORT || 7002;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map