import { dbQuery } from '../db/db';

export async function addTeacher(teacherid: string, name: string, sex: string | null, age: number | null, subid: string | null) {
	try {
		const query = 'insert into teacher (id, name, sex, age, subject_id) values ($1, $2, $3, $4, $5)';
		const res = await (dbQuery(query, [teacherid, name, sex, age, subid]));
		if (res && res.command === 'INSERT')
			return true;

		return false;

	} catch (e) {
		throw new Error(e.message);
	}
}

export async function countTeachers() {
	try {
		const query = 'select count(*) as total from teacher';
		const result = await (dbQuery(query));

		return result.rows[0].total;
	} catch (e) {
		throw new Error(e.message);
	}
}

export async function getTeachers() {
	try {
		// offset = null & limit = null ==> fetches all data
		const query = 'select * from teacher';
		const result = await (dbQuery(query));

		return result.rows;
	} catch (e) {
		throw new Error(e.message);
	}
}