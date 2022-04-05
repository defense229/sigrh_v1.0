import { Injectable } from '@nestjs/common';

interface IDbData {
  _id?: string;
  __v?: number;
}

type DbData = IDbData & Record<string, any>;

@Injectable()
export class DbParserService {
  parseData(data: DbData) {
    const _data = JSON.parse(JSON.stringify(data));
    if (data) {
      if (data._id) {
        _data.id = data._id;
        delete _data._id;
      }
      if ('__v' in data) delete _data.__v;
    }
    return _data;
  }
}
