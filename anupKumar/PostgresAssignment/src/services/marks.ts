import { query } from "../database/index";

export async function getMarksOfStudent(
	studentId: string
): Promise<Array<string> | never> {
	const response = await query(
		`SELECT  st.studentid,st.name,m.marks,m.subjectid
		     from school.marks m
		     inner join school.student st on st.studentid = m.studentid
		     where m.studentid='${studentId}'
		  order by st.name DESC, m.marks ASC`
	);
	return response.rows;
}

export async function updateMarks(
	studentId: string,
	subjectId: string,
	marks: number
): Promise<Array<string> | never> {
	const response = await query(`UPDATE school.marks
    SET marks = '${marks}'
    WHERE studentId = '${studentId}'
    and subjectId= '${subjectId}'
    RETURNING *`);
	return response.rows;
}

export async function addMarks(
	studentid: string,
	subjectid: string,
	marks: number
): Promise<boolean | never> {
	query(
		`INSERT INTO school.marks(studentid, subjectid, marks) VALUES 
		('${studentid}','${subjectid}','${marks}')`
	);
	return true;
}

export async function highestMarksInSubject(
	subjectId: string
): Promise<Array<string> | never> {
	const response = await query(`select * from school.marks 
        where subjectid = '${subjectId}'
        order by marks desc
        limit 1`);
	return response.rows;
}

export async function topper(
	topperCount: number
): Promise<Array<string> | never> {
	const response = await query(
		`select st.studentid, st.name, sum(marks) as total from school.marks m
		inner join school.student st on st.studentid = m.studentid
		group by st.studentid order by total desc limit ${topperCount}`
	);
	return response.rows;
}
