import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { config } from '@sigrh/config';
import { HandleHttpException } from '../../decorators';
import { IFieldPayload } from './score.types';

@Injectable()
export class ScoreService {
  baseUrl = config.api_url.score_manager;
  constructor(private http: HttpService) {}

  @HandleHttpException()
  async getFields(exam: string) {
    const response = await this.http.axiosRef.get(
      this.baseUrl + 'fields/exam/' + exam,
    );
    return response.data;
  }

  @HandleHttpException()
  async addField(field: IFieldPayload) {
    const response = await this.http.axiosRef.post(
      this.baseUrl + 'fields',
      field,
    );
    return response.data;
  }

  @HandleHttpException()
  async updateField(id: string, field: IFieldPayload) {
    const response = await this.http.axiosRef.put(
      this.baseUrl + 'fields/' + id,
      field,
    );
    return response.data;
  }

  @HandleHttpException()
  async removeField(id: string) {
    await this.http.axiosRef.delete(this.baseUrl + 'fields' + id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Operation done successfully',
    };
  }

  insertScore() {}
}
