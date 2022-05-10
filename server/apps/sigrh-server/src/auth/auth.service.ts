import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { compare, hash } from 'bcrypt';
import { DbParserService } from '@sigrh/db-parser';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly dbParser: DbParserService,
  ) {}

  async all() {
    const users = await this.userModel.find({});
    return users.map((user: User) => {
      const user_ = this.dbParser.parseData(user);
      delete user_.password;
      return user_;
    });
  }

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
      message: 'Logged successfully!',
      user,
    };
  }

  async register(user: User) {
    const founded = await this.userModel.findOne({ username: user.username });
    if (founded) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'User already exists!',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const _pass = await hash(user.password, 10);
    const _user = await this.userModel.create({ ...user, password: _pass });
    delete _user.password;
    return {
      message: 'User created successfully!',
      user: this.dbParser.parseData(_user),
      statusCode: HttpStatus.CREATED,
    };
  }

  async remove(id: string) {
    try {
      return await this.userModel.remove({ _id: id });
    } catch (error) {
      throw new HttpException(
        { code: HttpStatus.BAD_REQUEST, message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
