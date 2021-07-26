import { query } from "../database/index";

export async function getSubject(): Promise<Array<string>> {
	const response = await query(`select * from school.subject order by name`);
	return response.rows;
}

export async function studentOfSubject(
	subjectId: string
): Promise<Array<string>> {
	const respose = await query(
		`select * 
		from school.student as st, school.subject as sb
		where st.classid = sb.classid and sb.subjectid = '${subjectId}'`
	);
	return respose.rows;
}

export async function addSubject(
	name: string,
	classid: string,
	teacherid: string
): Promise<Array<string>> {
	const response = await query(`INSERT INTO school.subject(name, classid, teacherid) VALUES
        ('${name}','${classid}','${teacherid}') RETURNING subjectid`);
	return response.rows;
}
