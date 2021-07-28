import { query } from "../database/index";

export async function allteacher(): Promise<any> {
	const response = await query("select * from school.teacher order by name");
	return response.rows;
}

export async function studentOfteacher(teacherId: string): Promise<any> {
	const response = await query(
		`select * 
	  from school.student as st, school.subject as sb
	  where st.classid = sb.classid and sb.teacherid =  '${teacherId}'`
	);
	return response.rows;
}

export async function addTeacher(
	name: string,
	sex: string,
	phone: string
): Promise<any> {
	const response = await query(
		`INSERT INTO school.teacher(name,sex,phone) VALUES ('${name}','${sex}','${phone}') RETURNING teacherid`
	);
	return response.rows[0];
}
