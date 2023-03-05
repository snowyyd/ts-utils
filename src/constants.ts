/**
 * An object with useful constant values often used.
 * @readonly
 */
export const constants = Object.freeze({
	node: Object.freeze({
		isProduction: process.env.NODE_ENV === 'production',
	}),
});
