import { json } from 'express';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DefrecrutLnModule } from './defrecrut-ln.module';

async function bootstrap() {
  const app = await NestFactory.create(DefrecrutLnModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.use(json({ limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Deferecrut-langues-nationaux core API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const PORT = process.env.PORT || 7006;
  await app.listen(PORT);
}
bootstrap();
