import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ReportModule } from './report.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(ReportModule);

  app.setGlobalPrefix('api/v1');
  app.use(json({ limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Report API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const PORT = process.env.PORT || 7004;
  await app.listen(PORT);
}
bootstrap();
