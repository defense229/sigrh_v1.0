import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { compare } from 'bcrypt';
import { DbParserService } from '@sigrh/db-parser';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly dbParser: DbParserService,
  ) {}

  async login(username, password) {
    const founded = await this.userModel.findOne({ username });

    if (!founded) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isValidUser = await compare(password, founded.password);

    if (!isValidUser) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const user = this.dbParser.parseData(founded);
    delete user.password;

    return {
      statusCode: 200,
      message: 'Logged successfully!',
      user,
    };
  }
}
