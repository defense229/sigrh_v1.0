import { Fn, IRunner } from '../interface';
export declare class DefaultRunner implements IRunner {
    _fn: Fn;
    _name: string;
    _taskEnd: Fn;
    _taskError: Fn;
    constructor(name: string, fn: Fn);
    get name(): string;
    run(args?: any): Promise<void>;
    onTaskEnd(cb: Fn): void;
    onTaskError(cb: Fn): void;
}
