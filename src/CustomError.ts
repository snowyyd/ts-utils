// eslint-disable-next-line @typescript-eslint/no-explicit-any
let colorette: any;

try
{
	// eslint-disable-next-line
	colorette = require('colorette');
}
catch (error)
{
	colorette = {};
	colorette.green = (text: string | number) => text;
	colorette.cyan = (text: string | number) => text;
	colorette.yellow = (text: string | number) => text;
	colorette.gray = (text: string | number) => text;
}

/**
 * An universal Error class that contains useful extra parameters.
 * @class
 */
export class CustomError extends Error
{
	date = new Date();
	extra: Record<string, unknown> | undefined;
	code: number;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(message: string, extra?: Record<string, unknown>, code?: number, ...params: any)
	{
		super(...params);

		if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);

		this.name = 'CustomError';
		this.message = message;
		this.extra = extra;
		this.code = code ?? 1;
	}

	static print = (error: CustomError) =>
	{
		/* eslint-disable function-call-argument-newline, function-paren-newline */
		console.error(
			colorette.green('Date:'), colorette.cyan(error.date.toString()), '\n',
			colorette.green('Message:'), colorette.yellow(error.message), '\n',
			colorette.green('Extras:'), error.extra ?? colorette.gray('(null)'), '\n',
			colorette.green('Code:'), error.code, '\n',
			colorette.green('Stack:'), colorette.gray(error.stack ?? '(null)'),
		);
		/* eslint-enable function-call-argument-newline, function-paren-newline */
	};
}
