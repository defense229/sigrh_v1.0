import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('SIGRH API')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v2/docs', app, document);

  const PORT = process.env.PORT || 7000;

  await app.listen(PORT);
}
bootstrap();
