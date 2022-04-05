import { Fn, IRunner } from '../interface';

export class DefaultRunner implements IRunner {
  _fn: Fn;
  _name: string;
  _taskEnd: Fn = () => {};
  _taskError: Fn = (error) => {
    console.log('[ERROR]: ', error.message);
  };

  constructor(name: string, fn: Fn) {
    this._fn = fn;
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  async run(args?: any) {
    console.log(`[__runner__(${this._name})]: Task started`);
    try {
      const result = await this._fn(args);
      console.log(`[__runner__(${this._name})]: Task end`);
      this._taskEnd(result);
    } catch (error: any) {
      console.log(`[__runner__(${this._name})]: Task error occurs`);
      this._taskError(error);
    }
  }

  onTaskEnd(cb: Fn): void {
    this._taskEnd = cb;
  }

  onTaskError(cb: Fn): void {
    this._taskError = cb;
  }
}
