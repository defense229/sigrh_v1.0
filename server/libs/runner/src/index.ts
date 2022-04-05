import { IRunnerArgs } from './interface';
import { RunnerNames, _useRunner } from './providers';

export function createRunner(
  args: IRunnerArgs,
  runner: RunnerNames = 'default',
) {
  return _useRunner(runner, args);
}
