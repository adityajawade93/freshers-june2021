import { dbQuery } from '../db/db';

//student_id: string, subject_id: string, marks: number
export async function addMark(requestData: any) {
	try {
		const query = 'insert into mark (student_id, subject_id, marks) values ($1, $2, $3)';
		const res = await (dbQuery(query, [requestData.studentid, requestData.subid, requestData.marks]));

		if (res && res.command === 'INSERT')
			return true;

		return false;
	} catch (e) {
		throw new Error(e.message);
	}
}

export async function updateMark(requestData: any) {
	try {
		const query = 'update mark set marks = $1 where student_id = $2 and subject_id = $3';
		const res = await (dbQuery(query, [requestData.marks, requestData.studentid, requestData.subid]));

		if (res && res.command === 'INSERT')
			return true;

		return false;
	} catch (e) {
		throw new Error(e.message);
	}
}