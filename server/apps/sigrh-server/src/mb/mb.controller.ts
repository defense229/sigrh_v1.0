import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MbService } from './mb.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MOBILE ROUTES')
@Controller('mb')
export class MbController {
  constructor(private readonly mbService: MbService) {}

  @Get('/confirm-presence/:id/:status')
  async confirmPresence(
    @Param('id') id: string,
    @Param('status') status: string,
  ) {
    try {
      return await this.mbService.verify(id, status);
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/confirm-accept/:id')
  async confirmAccept(@Param('id') id: string) {
    try {
      return await this.mbService.accept(id);
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/candidat-info/:id')
  async candidatInfo(@Param('id') id: string) {
    try {
      return await this.mbService.get(id);
    } catch (e: any) {
      throw new HttpException('Invalid id!', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
