import { NestFactory } from '@nestjs/core';
import { DefrecrutLnModule } from './defrecrut-ln.module';

async function bootstrap() {
  const app = await NestFactory.create(DefrecrutLnModule);
  await app.listen(3000);
}
bootstrap();
