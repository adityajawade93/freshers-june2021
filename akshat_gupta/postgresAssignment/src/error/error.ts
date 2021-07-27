export function pureError(ctx: any, err: any): void {
	ctx.response.status = 400;
	ctx.response.type = 'application/json';
	ctx.body = {
		message: `Something went wrong: ${err}`,
	};
}

export function incompleteError(ctx: any): void {
	ctx.response.status = 400;
	ctx.response.type = 'application/json';
	ctx.body = {
		message: 'Incomplete/missing details provided.',
	};
}

export function wrongFormatError(ctx: any): void {
	ctx.response.status = 400;
	ctx.response.type = 'application/json';
	ctx.body.message = 'Data provided is in wrong/unallowed format.';
}

export function missingQueryError(ctx: any): void {
	ctx.response.status = 400;
	ctx.response.type = 'application/json';
	ctx.body = {
		message: 'Missing one or more query parameters.',
	};
}

export function wrongQueryError(ctx: any): void {
	ctx.response.status = 400;
	ctx.response.type = 'application/json';
	ctx.body = {
		message: 'Wrong format query parameters.',
	};
}