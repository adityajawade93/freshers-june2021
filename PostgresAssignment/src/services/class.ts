import { query } from "../database/index";

export async function getClasses(): Promise<Array<string>> {
	const response = await query(`SELECT * FROM school.class order by name DESC`);
	return response.rows;
}

export async function studentOfClass(classId: string): Promise<Array<string>> {
	const response = await query(
		`select * from school.student where classid = '${classId}' order by name`
	);
	return response.rows;
}

export async function addClass(
	name: string,
	room: number
): Promise<Array<string>> {
	const response = await query(`INSERT INTO school.class(name,room) 
            VALUES ('${name}','${room}') RETURNING classid`);
	return response.rows;
}
