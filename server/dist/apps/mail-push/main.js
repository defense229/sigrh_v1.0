"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const mail_push_module_1 = require("./mail-push.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(mail_push_module_1.MailPushModule);
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Qrcode generator API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    const PORT = process.env.PORT || 7005;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map