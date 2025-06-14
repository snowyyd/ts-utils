import type { ChalkInstance } from 'chalk';

// eslint-disable-next-line import-x/no-extraneous-dependencies
const mod = await import('chalk').catch(() => undefined);
const green = mod ? mod.default.green : ((...text: Parameters<ChalkInstance>) => String(text)) as ChalkInstance;
const cyan = mod ? mod.default.cyan : ((...text: Parameters<ChalkInstance>) => String(text)) as ChalkInstance;
const yellow = mod ? mod.default.yellow : ((...text: Parameters<ChalkInstance>) => String(text)) as ChalkInstance;
const gray = mod ? mod.default.gray : ((...text: Parameters<ChalkInstance>) => String(text)) as ChalkInstance;

/**
 * An universal Error class that contains useful extra parameters.
 */
export class CustomError extends Error
{
	date = new Date();

	extra: Record<string, unknown> | undefined;

	code: number;

	constructor(message: string, extra?: Record<string, unknown>, code?: number, options?: ErrorOptions)
	{
		super(message, options);

		if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);

		this.name = 'CustomError';
		this.extra = extra;
		this.code = code ?? 1;
	}

	static toJSON = (error: CustomError) => ({
		name: error.name,
		date: error.date,
		message: error.message,
		extra: error.extra,
		code: error.code,
		stack: error.stack,
		cause: error.cause,
	});

	toJSON = () => CustomError.toJSON(this);

	static print = (error: CustomError, noColors = false) =>
	{
		const fmt = (fn: ChalkInstance, ...text: Parameters<ChalkInstance>) => (noColors ? text.join(' ') : fn(...text));

		console.error(fmt(green, 'Date:'), fmt(cyan, error.date.toString()));
		console.error(fmt(green, 'Message:'), fmt(yellow, error.message));
		console.error(fmt(green, 'Extras:'), error.extra ?? fmt(gray, '(undefined)'));
		console.error(fmt(green, 'Code:'), error.code);
		console.error(fmt(green, 'Stack:'), fmt(gray, error.stack ?? '(undefined)'));
	};

	print = (noColors = false) => CustomError.print(this, noColors);
}
