import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Center, CenterDocument } from './center.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { RepositoryService } from '../../repository/repository.service';
import { HandleHttpException } from '../../decorators';
import { createRunner } from '@sigrh/runner';
import { WsGateway } from '@sigrh/websocket';
import { WsEvents } from '../../lib';

@Injectable()
export class CenterService extends RepositoryService<Center> {
  _isTaskRunning: any = {};

  constructor(
    @InjectModel(Center.name)
    protected readonly model: Model<CenterDocument>,
    protected readonly dbParser: DbParserService,
    private readonly ws: WsGateway,
  ) {
    super(model, dbParser);
    this.searchFields = ['departement'];
  }

  @HandleHttpException(HttpStatus.CONFLICT)
  async setRepartition(data: Center, makeRepartition: any): Promise<Center> {
    let _center = await this.findOne({
      departement: data.departement,
      exam: data.exam,
    });
    if (!_center) {
      _center = await this.create(data);
    }

    const backgroundTask = createRunner({
      name: String(_center.id),
      fn: async () => {
        this._isTaskRunning[data.exam] = true;
        return await makeRepartition(_center);
      },
    });
    backgroundTask.run();
    backgroundTask.onTaskEnd((result: any) => {
      delete this._isTaskRunning[data.exam];
      console.log(result);
      this.ws.notify({
        event: WsEvents.REPARTITION_END,
        cb: () => result,
      });
    });
    backgroundTask.onTaskError((error: any) => {
      delete this._isTaskRunning[data.exam];
      this.ws.notify({
        event: WsEvents.REPARTITION_ERROR,
        cb: () => error,
      });
    });

    return _center;
  }
}
