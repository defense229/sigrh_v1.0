import { ProxyService } from './proxy.service';
export declare class ProxyController {
    private readonly service;
    constructor(service: ProxyService);
    getUsers(): Promise<{
        statusCode: number;
        message: string;
    }>;
    getCandidates(): Promise<{
        statusCode: number;
        message: string;
    }>;
    associateToExam(normal: string, teachers: string, helpers: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
