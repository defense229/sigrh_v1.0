export interface IRunner {
    run(args?: any): any;
    onTaskEnd(result?: any): void;
    onTaskError(error?: any): void;
}
export interface IRunnerItem {
    name: string;
    instance: any;
}
export declare type Fn = (args?: any) => any;
export interface IRunnerArgs {
    name: string;
    fn: Fn;
}
