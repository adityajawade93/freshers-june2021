import * as classes from '../services/class_services';

export async function addClass(ctx: any) {
	const obj = ctx.request.body;
	if (obj.classID == null || obj.room == null || obj.subjectID == null) {
		ctx.response.status = 404;
		ctx.response.type = 'application/json';
		ctx.body = {
			msg: 'data missing in class body',
		};
		return;
	}
	try {
		const newclass = await classes.addClass(obj.classID, obj.room, obj.subjectID);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			msg: 'class added',
			data: newclass,
		};
	} catch (err) {
		console.log(err);
		ctx.body = {
			msg: `something wrong  + ${err}`,
		};
	}
}

export async function getClass(ctx: any) {
	try {
		ctx.response.status = 200;
		const allClasses = await classes.getClass();
		ctx.body = {
			msg: 'list of all classes',
			data: allClasses,
		};
	} catch (err) {
		ctx.response.status = 404;
		ctx.body = {
			msg: `something wrong in getting all classes + ${err}`,
		};
	}
}
