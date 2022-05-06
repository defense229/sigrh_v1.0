import { HttpStatus } from '@nestjs/common';
import { Departement } from './departements.dto';
import { DepartementsService } from './departements.service';
export declare class DepartementsController {
    private readonly departementsService;
    constructor(departementsService: DepartementsService);
    create(departement: Departement): Promise<any>;
    one(id: string): Promise<any>;
    getExamDepartements(id: string): Promise<any[]>;
    update(id: string, departement: Departement): Promise<any>;
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
