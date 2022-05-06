import { HttpStatus } from '@nestjs/common';
import { RepositoryService } from '@sigrh/repository';
import { Jury, JuryDocument, Member, MemberDocument } from './jury.dto';
import { Model } from 'mongoose';
import { DbParserService } from '@sigrh/db-parser';
import { CandidatService } from '../candidat/candidat.service';
import { WsGateway } from '@sigrh/websocket';
import { QuestionService } from '../question/question.service';
export declare class MemberService extends RepositoryService<Member> {
    protected readonly model: Model<MemberDocument>;
    protected readonly dbParser: DbParserService;
    constructor(model: Model<MemberDocument>, dbParser: DbParserService);
    create(member: Member): Promise<any>;
    login(username: string, password: string): Promise<{
        statusCode: HttpStatus;
        member: any;
    } | {
        statusCode: HttpStatus;
        member?: undefined;
    }>;
}
export declare class JuryService extends RepositoryService<Jury> {
    protected readonly model: Model<JuryDocument>;
    protected readonly dbParser: DbParserService;
    private readonly candidatService;
    private readonly memberService;
    private ws;
    private questions;
    constructor(model: Model<JuryDocument>, dbParser: DbParserService, candidatService: CandidatService, memberService: MemberService, ws: WsGateway, questions: QuestionService);
    createJury(exam: string): Promise<any>;
    createMember(member: Member): Promise<any>;
    updateMember(id: string, member: Partial<Member>): Promise<any>;
    login(username: string, password: string): Promise<{
        statusCode: HttpStatus;
        member: any;
    } | {
        statusCode: HttpStatus;
        member?: undefined;
    }>;
    getJuryMembers(id: string): Promise<any>;
    members(exam: string): Promise<any>;
    archiveMember(id: string): Promise<{
        statusCode: HttpStatus;
    }>;
    pickCandidate(exam: string, numero: string, departement: string, jury: string): Promise<{
        statusCode: HttpStatus;
    }>;
    pickCandidateNumbers(exam: string, numero: string, departement: string, jury: string, nums: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
}
