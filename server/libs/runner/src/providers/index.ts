import { IRunner, IRunnerArgs, IRunnerItem } from '../interface';
import { DefaultRunner } from './default';

export type RunnerNames = 'default';

export const _runners: IRunnerItem[] = [
  { name: 'default', instance: DefaultRunner },
];

export function _useRunner(name: string, args: IRunnerArgs): IRunner {
  const _runner = _runners.find((runner: IRunnerItem) => runner.name === name);
  return new _runner.instance(args.name, args.fn);
}
