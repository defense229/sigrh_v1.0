import { HttpStatus } from '@nestjs/common';
import { Member } from './jury.dto';
import { JuryService } from './jury.service';
declare class LoginPayload {
    username: string;
    password: string;
}
export declare class JuryController {
    private readonly juryService;
    constructor(juryService: JuryService);
    create(exam: string): Promise<any>;
    all(exam: string): Promise<any>;
    getJuryMembers(jury: string): Promise<any>;
    getExamMembers(exam: string): Promise<any>;
    createMember(member: Member): Promise<any>;
    updateMember(id: string, member: Member): Promise<any>;
    login(member: LoginPayload): Promise<{
        statusCode: HttpStatus;
        member: any;
    } | {
        statusCode: HttpStatus;
        member?: undefined;
    }>;
    archiveMany(ids: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
    archiveMembersMany(ids: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
    pickCandidate(exam: string, dep: string, jury: string, num: string): Promise<{
        statusCode: HttpStatus;
    }>;
    pickCandidateNumbers(exam: string, dep: string, jury: string, num: string, nums: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
}
export {};
