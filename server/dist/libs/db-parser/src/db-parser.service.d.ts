interface IDbData {
    _id?: string;
    __v?: number;
}
declare type DbData = IDbData & Record<string, any>;
export declare class DbParserService {
    parseData(data: DbData): any;
}
export {};
