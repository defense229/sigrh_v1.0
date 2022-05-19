import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { ScoreManagerModule } from './score-manager.module';

async function bootstrap() {
  const app = await NestFactory.create(ScoreManagerModule);

  app.setGlobalPrefix('api/v1');
  app.use(json({ limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Score calculator API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const PORT = process.env.PORT || 7003;
  await app.listen(PORT);
}
bootstrap();
