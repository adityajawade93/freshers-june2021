import * as results from '../services/result_services';

export async function addMarks(ctx: any) {
	const obj = ctx.request.body;
	if (obj.studentID == null || obj.subjectID == null || obj.marks == null) {
		ctx.response.status = 400;
		ctx.body = 'data missing';
		return;
	}

	try {
		// eslint-disable-next-line camelcase
		const added_marks = await results.addMarks(obj.studentID, obj.subjectID, obj.marks);
		ctx.response.status = 200;
		ctx.body = {
			msg: 'marks added',
			data: added_marks,
		};
	} catch (err) {
		ctx.response.status = 400;
		ctx.body = `something went wrong in adding marks + ${err}`;
	}
}

export async function updateMarks(ctx: any) {
	const obj = ctx.request.body;
	if (obj.studentID == null || obj.subjectID == null || obj.marks == null) {
		ctx.response.status = 400;
		ctx.body = 'data missing';
		return;
	}

	try {
		// eslint-disable-next-line camelcase
		const updated_marks = await results.updateMarks(obj.studentID, obj.subjectID, obj.marks);
		ctx.response.status = 200;
		ctx.body = {
			msg: 'data updated',
			data: updated_marks,
		};
	} catch (err) {
		ctx.response.status = 400;
		ctx.body = `something went wrong in update marks + ${err}`;
	}
}

export async function getMarks(ctx: any) {
	try {
		const { Studentid } = ctx.request.params;
		const markslist = await results.getMarks(Studentid);
		ctx.response.status = 200;
		ctx.body = {
			msg: `all subject marks for studentID ${Studentid}`,
			markslist,
		};
	} catch (err) {
		ctx.response.status = 400;
		ctx.body = `something went wrong in adding marks + ${err}`;
	}
}

export async function getHighestMarksPerSubject(ctx: any) {
	try {
		const { Classid } = ctx.request.params;
		const report = await results.getHighestMarksPerSubject(Classid);
		ctx.response.status = 200;
		ctx.body = {
			data: report,
		};
	} catch (err) {
		ctx.response.status = 400;
		ctx.body = `${err}`;
	}
}

export async function getToppersMarks(ctx: any) {
	const { Classid } = ctx.request.params;
	const { toplimit } = ctx.request.params;

	try {
		const listoftopten = await results.getToppersMarks(Classid, toplimit);
		ctx.response.status = 200;
		ctx.body = listoftopten;
	} catch (err) {
		ctx.response.status = 400;
		ctx.body = {
			error: `${err}`,
		};
	}
}
