import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';
import * as classService from '../services/class-service';

export async function addClass(ctx: Context) {
	try {
		const requestData: any = ctx.request.body;

		const id: string = uuidv4();
		const name: string = requestData.name.toLowerCase().trim();

		await classService.addClass(id, name);
		ctx.status = 201;
		ctx.body = {

			message: `class with ${id} and name ${name} is added`,
		};
	} catch (e) {
		ctx.status = 404;
		ctx.body = { error: e.message };
	}
}

export async function getClasses(ctx: Context) {
	try {
		const allClasses = await classService.getClasses();

		ctx.body = {
			count: allClasses.length,
			data: allClasses
		};
	} catch (e) {
		ctx.status = 404;
		if (e.status) ctx.status = e.status;

		ctx.body = { error: e.message };
	}
}


export async function getClassId(ctx: Context) {
	try {
		const id: string = ctx.params.id;
		const classdata = await classService.getClassId(id);

		ctx.status = 200;
		ctx.body = {
			data: classdata
		};
	} catch (e) {
		ctx.status = 404;
		if (e.status) ctx.status = e.status;

		ctx.body = { error: e.message };
	}
}
