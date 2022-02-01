import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { getEnv } from '../lib';
import { seed } from '@sigrh/libs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async seed() {
    const availableUsers = await this.userModel.count();
    if (availableUsers === 0) {
      const newUsers = seed.generateUsers(10);
      this.userModel.insertMany(newUsers);
    }
  }

  async login(username, password) {
    const mode = getEnv('MODE');
    if (mode === 'DEV') await this.seed();

    const founded = await this.userModel.count({ username, password });

    if (founded === 0) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userModel.findOne({ username, password });

    return {
      statusCode: 200,
      message: 'Logged successfully!',
      ...JSON.parse(JSON.stringify(user))
    }
  }
}
