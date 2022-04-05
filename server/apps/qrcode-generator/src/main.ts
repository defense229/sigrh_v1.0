import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { QrcodeGeneratorModule } from './qrcode-generator.module';

async function bootstrap() {
  const app = await NestFactory.create(QrcodeGeneratorModule);

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Qrcode generator API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const PORT = process.env.PORT || 7002;
  await app.listen(PORT);
}
bootstrap();
