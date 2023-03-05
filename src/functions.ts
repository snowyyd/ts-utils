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
