export declare function encrypt(pass: string): string;
export declare function verify(pass: string, hash: string): boolean;
export declare enum WsEvents {
    REPARTITION_END = "REPARTITION_END",
    REPARTITION_PROGRESS = "REPARTITION_PROGRESS",
    REPARTITION_ERROR = "REPARTITION_ERROR",
    ADD_SCORE = "ADD_SCORE",
    CANDIDATE_SELECTED = "CANDIDATE_SELECTED",
    CANDIDATE_NUMBERS_SELECTED = "CANDIDATE_NUMBERS_SELECTED",
    NEW_SCORE_ADDED = "NEW_SCORE_ADDED"
}
