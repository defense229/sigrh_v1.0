import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { Model } from 'mongoose';
import { DefConfigDocument, DefConfig } from './def-config.dto';

@Injectable()
export class DefConfigService {
  constructor(
    @InjectModel(DefConfig.name)
    private readonly model: Model<DefConfigDocument>,
    private dbParser: DbParserService,
  ) {}

  async getConfig() {
    const configs = await this.model.find({});

    return configs.length === 0 ? {} : this.dbParser.parseData(configs[0]);
  }

  async updateQuestionConfig(config: DefConfig) {
    const configs = await this.model.find({});

    if (configs.length === 0) {
      return await this.model.create(config);
    }

    await this.model.updateOne({ _id: configs[0]._id }, { ...config });

    return this.dbParser.parseData(
      await this.model.findOne({ _id: configs[0]._id }),
    );
  }
}
