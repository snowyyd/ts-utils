/**
 * Generate a pseudo-random number in the given range [min, max].
 * For reference, the `crypto.randomInt` range is [min, max).
 * @param min - Minimum number in the range.
 * @param max - Maximum number in the range.
 * @returns The pseudo-random number.
 */
export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Asynchronously pauses execution for the specified number of milliseconds.
 * @deprecated Use `setTimeout()` from 'node:timers/promises' instead.
 * @param ms - The number of milliseconds to wait.
 * @returns A Promise that resolves after the specified number of milliseconds have passed.
 */
export const sleep = (ms: number): Promise<unknown> => new Promise((r) => { setTimeout(r, ms); });

/**
 * Add a timeout to a promise.
 * @param promise - The promise you want to timeout.
 * @param timeoutMs - Amounf of miliseconds to wait before timeout.
 * @param onTimeout - The callback you want to exec upon promise rejection.
 * @returns - A promise.
 */
export function promiseTimeout<T>(promise: Promise<T>, timeoutMs: number, onTimeout: () => never | void)
{
	let timeoutId: NodeJS.Timeout;

	const timeoutPromise = new Promise<never>((_, reject) =>
	{
		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
		timeoutId = setTimeout(() => { reject(onTimeout()); }, timeoutMs);
	});

	return Promise.race([promise, timeoutPromise])
		.finally(() => clearTimeout(timeoutId));
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @see {@link https://stackoverflow.com/a/11409944|StackOverflow}
 * @param num - The number to clamp within the given range.
 * @param min - The lower boundary of the output range.
 * @param max - The upper boundary of the output range.
 * @returns - A number in the range [min, max].
 */
export const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);
