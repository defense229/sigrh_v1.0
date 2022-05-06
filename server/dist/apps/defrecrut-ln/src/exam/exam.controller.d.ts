import { HttpStatus } from '@nestjs/common';
import { Exam } from './exam.dto';
import { ExamService } from './exam.service';
declare class ExamQuery {
    limit?: number;
    skip?: number;
    search?: string;
}
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    create(exam: Exam): Promise<any>;
    one(id: string): Promise<any>;
    update(id: string, exam: Exam): Promise<any>;
    archive(id: string): Promise<{
        statusCode: HttpStatus;
    }>;
    archiveMany(ids: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
    all(query: ExamQuery): Promise<{
        values: any;
        total: number;
    }>;
}
export {};
