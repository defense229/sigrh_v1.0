import { Injectable } from '@nestjs/common';
import { CandidatService } from 'src/candidat/candidat.service';

@Injectable()
export class MbService {

  constructor(
    private readonly candidatService: CandidatService
  ) { }

  async get(id: string) {
    return await this.candidatService.get(id);
  }

  async verify(id: string, status: string) {
    return await this.candidatService.verify(id, status);
  }

  async accept(id: string) {
    return await this.candidatService.accept(id);
  }

}
