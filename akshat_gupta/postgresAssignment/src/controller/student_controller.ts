import uuid from 'uniqid';
import student from '../services/student_services.ts';

const errorMessage = (ctx: any, err: any) => {
	ctx.response.status = 400;
	ctx.response.type = 'application/json';
	ctx.body = {
		message: `Something went wrong: ${err}`,
	};
};

async function addStudent(ctx: any) {
	const obj = ctx.request.body;
	if (obj.name == null || obj.gender == null || obj.phone == null || obj.classID == null) {
		ctx.response.status = 400;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Incomplete details provided, some fields missing.',
		};
		return;
	}

	try {
		const id: string = uuid('S');
		const newStudent = await student.addStudent(id, obj.name, obj.gender, obj.phone, obj.classID);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Student added Successfully.',
			data: newStudent,
		};
	} catch (err) {
		errorMessage(ctx, err);
	}
}

async function getStudent(ctx: any) {
	const { page } = ctx.request.query;
	const { size } = ctx.request.query;

	if (Number.isNaN(page) || Number.isNaN(size)) {
		ctx.response.status = 400;
		ctx.body = 'Missing one or more query parameters.';
	}

	const totalstudent: number = await student.getStudentCount();
	const totalpages: number = Math.ceil(totalstudent / size);

	if (page < 0 || page >= totalpages || size === 0) {
		ctx.response.status = 400;
		ctx.body = 'Invalid parameters provided.';
		return;
	}

	try {
		const allStudent = await student.getStudent(page, size);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'All students retrieved.',
			body: allStudent,
		};
	} catch (err) {
		errorMessage(ctx, err);
	}
}
async function getStudentFromClassID(ctx: any) {
	try {
		const { Classid } = ctx.request.params;
		const requiredStudent = await student.getStudentFromClassID(Classid);
		ctx.response.status = 200;
		ctx.body = {
			msg: 'required student detail',
			data: requiredStudent,
		};
	} catch (err) {
		errorMessage(ctx, err);
	}
}

async function getStudentFromSubjectID(ctx: any) {
	try {
		const { Subjectid } = ctx.request.params;
		const requiredStudent = await student.getStudentFromSubjectID(Subjectid);
		ctx.response.status = 200;
		ctx.body = requiredStudent;
	} catch (err) {
		errorMessage(ctx, err);
	}
}

async function getStudentFromTeacherID(ctx: any) {
	try {
		const { Teacherid } = ctx.request.params;
		const requiredStudent = await student.getStudentFromTeacherID(Teacherid);
		ctx.response.status = 200;
		ctx.body = requiredStudent;
	} catch (err) {
		errorMessage(ctx, err);
	}
}

module.exports = {
	addStudent,
	getStudent,
	getStudentFromClassID,
	getStudentFromSubjectID,
	getStudentFromTeacherID,
};
