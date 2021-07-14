import { client } from '../db/db';

export async function addStudent(studentID: string, name: string, gender: string, phone: string, classID: string) {
	return new Promise((resolve, reject) => {
		client.query('begin')
			.then(() => {
				const query = 'INSERT INTO school.student(studentID,name,gender,phone) VALUES ($1,$2,$3,$4)';
				return client.query(query, [studentID, name, gender, phone]);
			})
			.then(() => client.query('INSERT INTO school.studies_in (studentID,classID) VALUES ($1,$2)',
				[studentID, classID]))
			.then(() => client.query('commit'))
			.then(() => {
				resolve(`${name} added to students list.`);
			})
			.catch((err: any) => {
				reject(err);
				return client.query('rollback');
			});
	});
}

export async function getStudentCount() {
	return new Promise((resolve, reject): any => {
		client.query('SELECT COUNT(*) as count from school.student', [], (err: any, res: any) => {
			if (err) reject(err);
			else resolve(res.rows[0].count);
		});
	});
}

export async function getStudent(page: number, size: number) {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * from school.student ORDER BY name offset $1 limit $2';
		client.query(query, [page * size, size], (err: any, res: any) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		});
	});
}

export async function getStudentFromClassID(id: string) {
	return new Promise((resolve, reject) => {
		client.query(`
        SELECT s.studentid, s.name, class.classid
        FROM school.student s
        LEFT JOIN school.studies_in ON studies_in.studentid = s.studentid
        LEFT JOIN school.class ON class.classid = studies_in.classid
        WHERE class.classid = $1 ORDER BY s.name`, [id],
		(err: any, res: any) => {
			if (err) reject(err);
			else resolve(res.rows);
		});
	});
}

export async function getStudentFromSubjectID(id: string) {
	return new Promise((resolve, reject) => {
		client.query(`
        SELECT s.name, class.classid, subject.name as subject_name
        FROM school.student s
        LEFT JOIN school.studies_in ON studies_in.studentid = s.studentid
        LEFT JOIN school.class ON class.classid = studies_in.classid
        LEFT JOIN school.having_subject ON class.classid = having_subject.classid
        LEFT JOIN school.subject ON subject.subjectid = having_subject.subjectid
        WHERE subject.subjectid = $1 ORDER BY s.name`, [id],
		(err: any, res: any) => {
			if (err) reject(err);
			else resolve(res.rows);
		});
	});
}

export async function getStudentFromTeacherID(id: string) {
	return new Promise((resolve, reject) => {
		client.query(`
        SELECT s.name, class.classid, teacher.name AS teacher_name
        FROM school.student s
        LEFT JOIN school.studies_in on studies_in.studentid = s.studentid
        LEFT JOIN school.class on class.classid = studies_in.classid
        LEFT JOIN school.having_subject on class.classid = having_subject.classid
        LEFT JOIN school.subject on subject.subjectid = having_subject.subjectid
        LEFT JOIN school.takes on subject.subjectid = takes.subjectid
        LEFT JOIN school.teacher on teacher.teacherid = takes.teacherid
        WHERE teacher.teacherid = $1 ORDER BY s.name`, [id],
		(err: any, res: any) => {
			if (err) reject(err);
			else resolve(res.rows);
		});
	});
}
