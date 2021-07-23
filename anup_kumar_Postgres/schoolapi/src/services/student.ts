import { query } from "../database/index";

export const allStudents = async (limit: number, offset: number) => {
	try {
		return await query(
			`SELECT * FROM school.student LIMIT ${limit} OFFSET ${offset}`
		);
	} catch (e) {
		throw Error(e);
	}
};

export const addStudent = async (
	name: string,
	sex: string,
	phone: string,
	classId: string
) => {
	try {
		const response = await query(
			`INSERT INTO school.student(name, sex,phone,classId) VALUES ('${name}','${sex}','${phone}','${classId}') RETURNING studentId `
		);
		return response.rows[0];
	} catch (e) {
		throw Error(e);
	}
};

export const getStudentCount = async () => {
	try {
		const response = await query("select count (*)  from school.student");
		return parseInt(response.rows[0].count);
	} catch (e) {
		throw Error(e);
	}
};
