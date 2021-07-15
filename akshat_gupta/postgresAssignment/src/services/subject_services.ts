import { client } from '../db/db';

export async function addSubject(subjectID: string, name: string): Promise<any> {
	return new Promise((resolve, reject) => {
		client.query('INSERT INTO school.subject values ($1,$2)', [subjectID, name])
			.then(() => {
				resolve(`${name} added to Subject table.`);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
}

export async function getSubject(): Promise<any> {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * from school.subject ORDER BY name';
		client.query(query, [], (err: any, res: { rows: unknown; }) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		});
	});
}
