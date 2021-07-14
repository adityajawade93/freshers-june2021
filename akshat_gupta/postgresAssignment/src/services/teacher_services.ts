import { client } from '../db/db';

export async function addTeacher(teacherID: string, name: string, gender: string, phone: string, subjectID: string) {
	return new Promise((resolve, reject) => {
		client.query('begin')
			.then(() => {
				const query = 'INSERT INTO school.teacher values ($1,$2,$3,$4)';
				return client.query(query, [teacherID, name, gender, phone]);
			})
			.then(() => {
				const query = 'INSERT INTO school.takes values ($1,$2)';
				return client.query(query, [teacherID, subjectID]);
			})
			.then(() => client.query('commit'))
			.then(() => {
				resolve(`${name} added to the Database Successfully.`);
			})
			.catch((err: any) => {
				reject(err);
				return client.query('rollback');
			});
	});
}

export async function getTeacher() {
	return new Promise((resolve, reject) => {
		client.query('SELECT * from school.teacher ORDER BY name', [], (err: any, res: { rows: unknown }) => {
			if (err) {
				reject(err);
			} else resolve(res.rows);
		});
	});
}
