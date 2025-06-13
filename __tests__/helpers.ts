// eslint-disable-next-line import-x/no-extraneous-dependencies
import chalk from 'chalk';
import { type TestsMap, type TestType } from './index.ts';

type TimedExecParamsNoFirst<T extends unknown[], U> = [
	// printRes: boolean,
	label: string,
	fn: (...args: T) => U | Promise<U>,
	...args: T,
];

export async function timedExec<T extends unknown[], U>(printRes: boolean, label: string, fn: (...args: T) => U | Promise<U>, ...args: T)
{
	console.log(chalk.cyan.bold(`\nTEST STARTED  : ${label}`));
	const t0 = performance.now();

	const maybePromise = fn(...args);
	const ret = maybePromise instanceof Promise ? await maybePromise.catch((e: unknown) => e) : maybePromise;
	const t1 = performance.now();

	const result = { ret, time: t1 - t0 };
	if (printRes) console.log(result);

	console.log(chalk.greenBright.bold(`TEST COMPLETED: ${label}`));
	console.log(chalk.bgBlueBright(`${'='.repeat(70)}`));

	return result;
}

export const exec = <T extends unknown[], U>(...params: TimedExecParamsNoFirst<T, U>) => timedExec(false, ...params);
export const logExec = <T extends unknown[], U>(...params: TimedExecParamsNoFirst<T, U>) => timedExec(true, ...params);

function IsValidTestType(map: TestsMap, value: unknown): value is TestType
{
	return (value as TestType) in map;
}

export async function runTest(map: TestsMap, test?: string)
{
	if (!test)
	{
		console.log(chalk.yellowBright.bold('Executing all tests'));
		for (const fn of Object.values(map))
		{
			// eslint-disable-next-line no-await-in-loop
			await fn();
		}
	}
	else if (IsValidTestType(map, test))
	{
		console.log(chalk.greenBright.bold(`Executing test ${test}`));
		await map[test]();
	}
	else
	{
		throw new Error('Invalid test type. Valid types: ' + Object.keys(map).join(', '));
	}
}
