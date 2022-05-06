export interface IFieldPayload {
    label?: string;
    coefficient?: number;
    exam?: string;
    extras?: string;
}
export declare class FieldPayload implements IFieldPayload {
    label: string;
    coefficient: number;
    exam: string;
    extras: any;
}
export interface IScorePayload {
    exam: string;
    field: string;
    candidate: string;
    value: number;
}
export declare class ScorePayload implements IFieldPayload {
    exam: string;
    field: string;
    candidate: string;
    value: number;
    extras?: string;
}
