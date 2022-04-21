"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const report_module_1 = require("./report.module");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(report_module_1.ReportModule);
    app.setGlobalPrefix('api/v1');
    app.use((0, express_1.json)({ limit: '50mb' }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Report API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    const PORT = process.env.PORT || 7004;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map