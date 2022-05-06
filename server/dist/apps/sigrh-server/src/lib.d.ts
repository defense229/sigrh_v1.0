export declare function getEnv(name: string): string;
export interface DF_DATA_PAGINATION {
    page?: number;
    limit?: number;
}
export declare const DF_TYPE_CANDIDAT: {
    normal: string;
    enseignant: string;
    aideSoignant: string;
};
export declare type DF_CANDIDAT_CATEGORIE = 'NORMAL' | 'ENSEIGNANT' | 'AIDE_SOIGNANT';
export declare const DF_DEPARTEMENTS: string[];
export declare const getDepartementPrefix: string[];
export declare const getDepartementCode: (department: string) => number;
export declare enum WsEvents {
    REPARTITION_END = "REPARTITION_END",
    REPARTITION_PROGRESS = "REPARTITION_PROGRESS",
    REPARTITION_ERROR = "REPARTITION_ERROR",
    ADD_SCORE = "ADD_SCORE",
    CANDIDATE_SELECTED = "CANDIDATE_SELECTED",
    CANDIDATE_NUMBERS_SELECTED = "CANDIDATE_NUMBERS_SELECTED"
}
