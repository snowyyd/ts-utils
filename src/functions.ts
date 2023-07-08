/**
 * Generate a pseudo-random number in the given range [min, max].
 * For reference, the `crypto.randomInt` range is [min, max).
 * @param {Number} min - Minimum number in the range.
 * @param {Number} max - Maximum number in the range.
 * @returns {Number} The pseudo-random number.
 */
export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Asynchronously pauses execution for the specified number of milliseconds.
 * @async
 * @param {Number} ms - The number of milliseconds to wait.
 * @returns {Promise} A Promise that resolves after the specified number of milliseconds have passed.
 */
export const sleep = (ms: number): Promise<unknown> => new Promise((r) => { setTimeout(r, ms); });

/**
 * Add a timeout to a promise.
 * @async
 * @param {Promise} promise - The promise you want to timeout.
 * @param {Number} timeout - Amounf of miliseconds to wait before timeout.
 * @param {Function} rejectFunction - The function you want to eject upon promise rejection.
 * @returns {Promise<T>} - A promise.
 */
export async function promiseTimeout<T>(promise: Promise<T>, timeout: number, rejectFunction: () => unknown): Promise<T>
{
	const timeoutPromise = new Promise<T>((_, reject) =>
	{
		setTimeout(() => reject(rejectFunction()), timeout);
	});

	return Promise.race([promise, timeoutPromise]);
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @see {@link https://stackoverflow.com/a/11409944|StackOverflow}
 * @param {number} min - The lower boundary of the output range.
 * @param {number} max - The upper boundary of the output range.
 * @returns {number} - A number in the range [min, max].
 */
export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
