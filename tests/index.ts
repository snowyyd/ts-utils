/* eslint-disable @typescript-eslint/no-floating-promises */
import { setTimeout } from 'node:timers/promises';
import { CustomError } from '../src/CustomError.ts';
import { promiseTimeout } from '../src/functions.ts';
import { logExec, runTest } from './helpers.ts';

function testCustomError()
{
	const err = new CustomError(
		'This is a custom error',
		{
			foo: 'bar',
			baz: 15,
		},
		-1,
		{ cause: 'Test' },
	);

	logExec('CustomError.toJSON', err.toJSON);
	logExec('CustomError.print (colors)', err.print);
	logExec('CustomError.print (no colors)', err.print, true);
}

async function testPromiseTimeout()
{
	const promise = (delay: number) => setTimeout(delay, 'Promise completed!');
	const onTimeout = () => 'Promise timed out!';
	await logExec('Promise timeout (timed out)', promiseTimeout, promise(30), 10, onTimeout);
	await logExec('Promise timeout (completed)', promiseTimeout, promise(10), 30, onTimeout);
}

export type TestType = keyof typeof testsMap;
export type TestsMap = typeof testsMap;
export const testsMap = {
	ce: testCustomError,
	pt: testPromiseTimeout,
} as const;

const args = process.argv.slice(2);
console.log('Current args:', args, '\n');

await runTest(testsMap, args[0]);
