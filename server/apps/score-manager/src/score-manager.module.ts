import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreManagerController } from './score-manager.controller';
import { Score, ScoreSchema } from './score-manager.dto';
import { ScoreManagerService } from './score-manager.service';
import { FieldModule } from './field/field.module';
import { DbParserModule } from '@sigrh/db-parser';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cluster0.pigxs.mongodb.net', {
      user: 'denfense',
      pass: 'H^x7MT5cFVxYe@6',
      dbName: 'score_manager',
      w: 'majority',
      retryWrites: true,
    }),
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
    FieldModule,
    DbParserModule,
  ],
  controllers: [ScoreManagerController],
  providers: [ScoreManagerService],
})
export class ScoreManagerModule {}
