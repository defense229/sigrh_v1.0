import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { config } from '@sigrh/config';
import { HandleHttpException } from '@sigrh/decorators';
import { IFieldPayload, IScorePayload } from './score.types';

@Injectable()
export class ScoreService {
  baseUrl = config.api_url.score_manager;
  constructor(private http: HttpService) {}

  @HandleHttpException()
  async getFields(exam: string) {
    const response = await this.http.axiosRef.get(
      this.baseUrl + 'fields/exam/' + exam,
    );
    return response.data.filter((data) => data.enabled);
  }

  @HandleHttpException()
  async getField(id: string) {
    const response = await this.http.axiosRef.get(
      this.baseUrl + 'fields/' + id,
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
    console.log('[removing]', id);
    await this.http.axiosRef.delete(this.baseUrl + 'fields/' + id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Operation done successfully',
    };
  }

  @HandleHttpException()
  async insertScore(score: IScorePayload) {
    const response = await this.http.axiosRef.post(
      this.baseUrl + 'scores',
      score,
    );
    return response.data;
  }

  @HandleHttpException()
  async getResults(exam: string, sort: 'ASC' | 'DESC') {
    const response = await this.http.axiosRef.get(
      this.baseUrl + 'scores/computed/' + exam,
      {
        params: {
          sort,
        },
      },
    );
    return response.data;
  }

  @HandleHttpException()
  async countInsertedScores(exam: string, field: string = 'ALL') {
    const response = await this.http.axiosRef.get(
      this.baseUrl + 'scores/count-scores/exam/' + exam + '?field=' + field,
    );
    return response.data;
  }

  @HandleHttpException()
  async getCandidateScore(exam: string, candidate: string) {
    const response = await this.http.axiosRef.get(
      this.baseUrl + 'scores/results/' + exam + '/' + candidate,
    );
    return response.data;
  }
}
