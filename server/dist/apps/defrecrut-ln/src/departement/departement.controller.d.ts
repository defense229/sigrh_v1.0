import { HttpStatus } from '@nestjs/common';
import { Departement } from './departement.dto';
import { DepartementService } from './departement.service';
export declare class DepartementController {
    private readonly departementService;
    constructor(departementService: DepartementService);
    all(exam: string): Promise<any>;
    create(departement: Departement): Promise<any>;
    update(id: string, departement: Departement): Promise<any>;
    archiveMany(ids: string[]): Promise<{
        statusCode: HttpStatus;
    }>;
}
