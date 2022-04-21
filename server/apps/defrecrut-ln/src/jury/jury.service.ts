import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryService } from '@sigrh/repository';
import { Jury, JuryDocument, Member, MemberDocument } from './jury.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { encrypt, verify, WsEvents } from '../utils';
import { CandidatService } from '../candidat/candidat.service';
import { WsGateway } from '@sigrh/websocket';
import { QuestionService } from '../question/question.service';

@Injectable()
export class MemberService extends RepositoryService<Member> {
  constructor(
    @InjectModel(Member.name)
    protected readonly model: Model<MemberDocument>,
    protected readonly dbParser: DbParserService,
  ) {
    super(model, dbParser);
  }

  async create(member: Member) {
    const pwd = encrypt(member.password);
    const result = await this.model.create({ ...member, password: pwd });
    delete result.password;
    return this.dbParser.parseData(result);
  }

  async login(username: string, password: string) {
    const member = await this.model.findOne({ username });
    if (member && verify(password, member.password)) {
      delete member.password;
      return {
        statusCode: HttpStatus.OK,
        member: this.dbParser.parseData(member),
      };
    }
    return { statusCode: HttpStatus.UNAUTHORIZED };
  }
}

@Injectable()
export class JuryService extends RepositoryService<Jury> {
  constructor(
    @InjectModel(Jury.name)
    protected readonly model: Model<JuryDocument>,
    protected readonly dbParser: DbParserService,
    private readonly candidatService: CandidatService,
    private readonly memberService: MemberService,
    private ws: WsGateway,
    private questions: QuestionService,
  ) {
    super(model, dbParser);
  }

  async createJury(exam: string) {
    const len = await this.model.countDocuments({});
    const yearPrefix = String(new Date().getFullYear()).substring(2);
    return this.dbParser.parseData(
      await this.model.create({ exam, numero: 'J' + yearPrefix + len }),
    );
  }

  createMember(member: Member) {
    return this.memberService.create(member);
  }

  updateMember(id: string, member: Partial<Member>) {
    return this.memberService.update(id, member);
  }

  async login(username: string, password: string) {
    return await this.memberService.login(username, password);
  }

  async getJuryMembers(id: string) {
    return await this.memberService.find({ jury: id, enabled: true }, [
      'jury',
      'departement',
    ]);
  }

  async members(exam: string) {
    return await this.memberService.find({ exam }, ['jury', 'departement']);
  }

  async archiveMember(id: string) {
    return await this.memberService.archive(id);
  }

  async pickCandidate(
    exam: string,
    numero: string,
    departement: string,
    jury: string,
  ) {
    const candidate = await this.candidatService.findOne({
      numero,
      departement,
      exam,
    });
    if (!candidate) {
      return { statusCode: HttpStatus.NOT_FOUND };
    }

    this.ws.notify({
      event: WsEvents.CANDIDATE_SELECTED,
      cb: () => {
        return { jury, candidate };
      },
    });

    return { statusCode: HttpStatus.OK };
  }

  async pickCandidateNumbers(
    exam: string,
    numero: string,
    departement: string,
    jury: string,
    nums: string[],
  ) {
    const candidate = await this.candidatService.findOne({
      exam,
      numero,
      departement,
    });
    if (!candidate) {
      return { statusCode: HttpStatus.NOT_FOUND };
    }

    const questions = await this.questions.findByNums(exam, nums);

    this.ws.notify({
      event: WsEvents.CANDIDATE_NUMBERS_SELECTED,
      cb: () => {
        return { jury, candidate, nums, questions };
      },
    });

    return { statusCode: HttpStatus.OK };
  }
}
