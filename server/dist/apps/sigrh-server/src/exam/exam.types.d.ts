export interface IExam {
    id?: string;
    label?: string;
    center?: string;
    status?: ExamStatus;
    enabled?: boolean;
    candidateFileCollectStep?: ExamStepStatus;
    sportStep?: ExamStepStatus;
    fileAuthenticationStep?: ExamStepStatus;
    writingStep?: ExamStepStatus;
    healthControlStep?: ExamStepStatus;
}
export declare enum ExamStatus {
    NEW = "NEW",
    PENDING = "PENDING",
    CLOSED = "CLOSED"
}
export declare enum ExamStepStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare const examSteps: {
    candidateFileCollectStep: string;
    sportStep: string;
    fileAuthenticationStep: string;
    writingStep: string;
    healthControlStep: string;
};
export declare enum ExamRepartitionStatus {
    WAITING = "WAITING",
    PROCESSING = "PROCESSING",
    FINISHED = "FINISHED"
}
export interface ISimulationPayload {
    type: 'percentage' | 'value';
    global?: IGlobalSimulationPayload;
    quotas?: Record<string, number>;
}
export interface IGlobalSimulationPayload {
    men: number;
    women: number;
}
