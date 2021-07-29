import { query } from "../database/index";

export async function allStudents(
	limit: number,
	offset: number
): Promise<Array<string> | never> {
	const response = await query(
		`SELECT * FROM school.student LIMIT ${limit} OFFSET ${offset} order by name`
	);
	return response.rows;
}

export async function addStudent(
	name: string,
	sex: string,
	phone: string,
	classId: string
): Promise<Array<string> | never> {
	const response = await query(
		`INSERT INTO school.student(name, sex,phone,classId) VALUES ('${name}','${sex}','${phone}','${classId}') RETURNING studentId `
	);
	return response.rows[0];
}

export async function getStudentCount(): Promise<number | never> {
	const response = await query("select count (*)  from school.student");
	return parseInt(response.rows[0].count);
}
