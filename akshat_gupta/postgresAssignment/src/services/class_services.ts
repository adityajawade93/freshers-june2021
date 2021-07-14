import { client } from '../db/db';

export async function addClass(classID: string, room: string, subjectID: string) {
	return new Promise((resolve, reject) => {
		client.query('INSERT INTO school.class values ($1,$2)', [classID, room])
			.then(() => {
				client.query('INSERT into school.having_subject values ($1,$2)', [classID, subjectID]);
			})
			.then(() => {
				resolve(`class ID ${classID} with subject ${subjectID} is added to the database`);
			})
			.catch((err: any) => {
				reject(err);
			});
	});
}

export async function getClass() {
	return new Promise((resolve, reject) => {
		client.query('select * from school.class order by classid', [], (err: any, res: any) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		});
	});
}
