import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { SportService } from './sport.service';
import { ApiTags } from '@nestjs/swagger';
import { DF_CANDIDAT_CATEGORIE } from '../../lib';

@ApiTags('DASHBOARD SPORT ROUTES')
@Controller('sport')
export class SportController {
  constructor(private readonly service: SportService) {}

  async getter_(
    cb: any,
    category: DF_CANDIDAT_CATEGORIE | undefined = undefined,
  ) {
    try {
      if (!category) {
        return await cb();
      }
      return await cb(category);
    } catch (e: any) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/list-all')
  async getListAll(
    @Query('category') category: DF_CANDIDAT_CATEGORIE | undefined = undefined,
  ) {
    return await this.getter_((x: any) => this.service.getListAll(x), category);
  }

  @Get('/list-presents')
  async getListPresents(
    @Query('category') category: DF_CANDIDAT_CATEGORIE | undefined = undefined,
  ) {
    return await this.getter_(
      (x: any) => this.service.getListPresents(x),
      category,
    );
  }

  @Get('/list-absents')
  async getListNoPresents(
    @Query('category') category: DF_CANDIDAT_CATEGORIE | undefined = undefined,
  ) {
    return await this.getter_(
      (x: any) => this.service.getListNoPresents(x),
      category,
    );
  }

  @Get('/list-accepted')
  async getListAccepted(
    @Query('category') category: DF_CANDIDAT_CATEGORIE | undefined = undefined,
  ) {
    return await this.getter_(
      (x: any) => this.service.getListAccepted(x),
      category,
    );
  }

  @Get('/list-no-accepted')
  async getListNonAccepted(
    @Query('category') category: DF_CANDIDAT_CATEGORIE | undefined = undefined,
  ) {
    return await this.getter_(
      (x: any) => this.service.getListNonAccepted(x),
      category,
    );
  }
}
