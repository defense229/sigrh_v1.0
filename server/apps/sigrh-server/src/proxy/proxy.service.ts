import { Injectable } from '@nestjs/common';
import { Candidat, CandidatDocument } from '../candidat/candidat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '../auth/user.schema';
import axios from 'axios';
import { PROXY_BASE_URL_ } from './proxy.module';
import { DF_TYPE_CANDIDAT } from '../lib';

@Injectable()
export class ProxyService {
  constructor(
    @InjectModel(Candidat.name)
    private readonly candidatModel: Model<CandidatDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async get_(name: string, model: any) {
    const response = await axios.get(PROXY_BASE_URL_ + name);
    const users = response.data.map((it: any) => {
      delete it._id;
      delete it.__v;
      return it;
    });
    await model.insertMany(users);
  }

  async getUsers() {
    await this.get_('users', this.userModel);
    return { statusCode: 200, message: 'Inserted!' };
  }

  async getCandidates() {
    await this.get_('candidats', this.candidatModel);
    return { statusCode: 200, message: 'Inserted!' };
  }

  async associate(normal: string, teachers: string, helpers: string) {
    await this.candidatModel.updateMany(
      { demobilise: DF_TYPE_CANDIDAT.normal },
      { exam: normal },
    );
    await this.candidatModel.updateMany(
      { demobilise: DF_TYPE_CANDIDAT.enseignant },
      { exam: teachers },
    );
    await this.candidatModel.updateMany(
      { demobilise: DF_TYPE_CANDIDAT.aideSoignant },
      { exam: helpers },
    );
    return { statusCode: 200, message: 'Updated!' };
  }
}
