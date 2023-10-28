// eslint-disable-next-line @typescript-eslint/no-explicit-any
let colorette: {
	green: (text: string | number) => string | number;
	cyan: (text: string | number) => string | number;
	yellow: (text: string | number) => string | number;
	gray: (text: string | number) => string | number;
};

try
{
	// eslint-disable-next-line
	colorette = require('colorette');
}
catch (error)
{
	colorette = {
		green(text: string | number) { return text; },
		cyan(text: string | number) { return text; },
		yellow(text: string | number) { return text; },
		gray(text: string | number) { return text; },
	};
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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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

	print = () => CustomError.print(this);
}
