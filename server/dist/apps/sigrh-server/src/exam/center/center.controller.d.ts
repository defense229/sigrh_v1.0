import { HttpStatus } from '@nestjs/common';
import { Center, CenterUpdateInput } from './center.dto';
import { CenterService } from './center.service';
export declare class CenterController {
    private readonly centerService;
    constructor(centerService: CenterService);
    create(center: Center): Promise<any>;
    one(id: string): Promise<any>;
    getExamCenters(id: string): Promise<any[]>;
    update(id: string, center: CenterUpdateInput): Promise<any>;
    all(): Promise<{
        values: any[];
        total: number;
    }>;
    archive(id: string): Promise<{
        statusCode: HttpStatus;
    }>;
    archiveMany(ids: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
}
