import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbParserModule } from '@sigrh/db-parser';
import { QrcodeGeneratorController } from './qrcode-generator.controller';
import { Qrcode, QrcodeSchema } from './qrcode-generator.dto';
import { QrcodeGeneratorService } from './qrcode-generator.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cluster0.pigxs.mongodb.net', {
      user: 'denfense',
      pass: 'H^x7MT5cFVxYe@6',
      dbName: 'qrcode_generator',
      w: 'majority',
      retryWrites: true,
    }),
    MongooseModule.forFeature([{ name: Qrcode.name, schema: QrcodeSchema }]),
    DbParserModule,
  ],
  controllers: [QrcodeGeneratorController],
  providers: [QrcodeGeneratorService],
})
export class QrcodeGeneratorModule {}
