import { IRunner, IRunnerArgs, IRunnerItem } from '../interface';
export declare type RunnerNames = 'default';
export declare const _runners: IRunnerItem[];
export declare function _useRunner(name: string, args: IRunnerArgs): IRunner;
