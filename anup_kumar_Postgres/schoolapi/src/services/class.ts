import { query } from "../database/index";

export async function getClasses() {
	try {
		const response = await query(`SELECT * FROM school.class`);
		return response.rows;
	} catch (e) {
		throw Error(e);
	}
}

export async function studentOfClass(classId: string) {
	try {
		const response = await query(
			`select * from school.student where classid = '${classId}'`
		);
		return response;
	} catch (e) {
		throw Error(e);
	}
}

export async function addClass(name: string, room: number) {
	try {
		const response = await query(`INSERT INTO school.class(name,room) 
            VALUES (${name},'${room}') RETURNING classid`);
		return response.rows;
	} catch (e) {
		throw Error(e);
	}
}
