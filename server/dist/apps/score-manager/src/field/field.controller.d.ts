import { Field } from './field.dto';
import { FieldService } from './field.service';
export declare class FieldController {
    private readonly fieldService;
    constructor(fieldService: FieldService);
    all(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findByExam(id: string): Promise<any[]>;
    create(payload: Field): Promise<Field>;
    update(payload: Field, id: string): Promise<Field>;
    remove(id: string): Promise<void>;
}
