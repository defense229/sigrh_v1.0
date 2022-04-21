"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const score_manager_module_1 = require("./score-manager.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(score_manager_module_1.ScoreManagerModule);
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Score calculator API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    const PORT = process.env.PORT || 7003;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map