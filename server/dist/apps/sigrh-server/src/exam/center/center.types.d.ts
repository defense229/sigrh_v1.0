import { ExamRepartitionStatus } from '../exam.types';
export interface ICenter {
    exam: string;
    departement: string;
    centers: number;
    rooms: number;
    candidates: number;
    enabled: boolean;
    percenteDone?: number;
    repartitionStatus?: ExamRepartitionStatus;
}
