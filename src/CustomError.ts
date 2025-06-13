// eslint-disable-next-line import-x/no-extraneous-dependencies
const mod = await import('colorette').catch(() => undefined);
const green = mod ? mod.green : (text: string | number) => String(text);
const cyan = mod ? mod.cyan : (text: string | number) => String(text);
const yellow = mod ? mod.yellow : (text: string | number) => String(text);
const gray = mod ? mod.gray : (text: string | number) => String(text);

/**
 * An universal Error class that contains useful extra parameters.
 * @class
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
		const fmt = (fn: typeof green, text: Parameters<typeof green>[0]) => (noColors ? text : fn(text));

		console.error(fmt(green, 'Date:'), fmt(cyan, error.date.toString()));
		console.error(fmt(green, 'Message:'), fmt(yellow, error.message));
		console.error(fmt(green, 'Extras:'), error.extra ?? fmt(gray, '(undefined)'));
		console.error(fmt(green, 'Code:'), error.code);
		console.error(fmt(green, 'Stack:'), fmt(gray, error.stack ?? '(undefined)'));
	};

	print = (noColors = false) => CustomError.print(this, noColors);
}
