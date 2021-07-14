import client from '../db/db.ts';

async function addMarks(studentID: string, subjectID: string, marks: number) {
	return new Promise((resolve, reject) => {
		client.query('INSERT INTO school.result values ($1,$2,$3)', [studentID, subjectID, marks], (err: any) => {
			if (err) reject(err);
			else resolve('Successful!');
		});
	});
}

async function updateMarks(studentID: string, subjectID: string, marks: number) {
	return new Promise((resolve, reject) => {
		client.query('UPDATE school.result set marks = $3 where studentid = $1 and subjectid = $2', [studentID, subjectID, marks], (err: any) => {
			if (err) reject(err);
			else resolve('Successful!');
		});
	});
}

async function getMarks(studentID: string) {
	return new Promise((resolve, reject) => {
		client.query('SELECT s.name , r.marks FROM school.result r LEFT JOIN school.subject s ON r.subjectid = s.subjectid WHERE r.studentid = $1 order by s.name', [studentID],
			(err: any, res: any) => {
				if (err) reject(err);
				else resolve(res.rows);
			});
	});
}

async function getHighestMarksPerSubject(Classid: string) {
	return new Promise((resolve, reject) => {
		client.query(`select subject.name as subjectname , max(result.marks) as max_marks
    from school.class c
    left join school.having_subject on having_subject.classid = c.classid
    left join school.subject on subject.subjectid = having_subject.subjectid
    left join school.result on result.subjectid = subject.subjectid
    where c.classid= $1
    group by subject.subjectid
    order by subjectname`, [Classid], (err: any, res: { rows: unknown; }) => {
			if (err) reject(err);
			else resolve(res.rows);
		});
	});
}

async function getToppersMarks(classid: any, toplimit: any) {
	const query = `select s.studentid, s.name, sum(result.marks) as total_marks
    from school.student s
    inner join school.result on result.studentid = s.studentid
    left join school.studies_in on studies_in.studentid = s.studentid
    left join school.class on class.classid = studies_in.classid
    where class.classid = $1
    group by s.studentid 
    order by total_marks desc
    limit $2`;

	return new Promise((resolve, reject) => {
		client.query(query, [classid, toplimit], (err: any, res: { rows: unknown; }) => {
			if (err) reject(err);
			else resolve(res.rows);
		});
	});
}

module.exports = {
	addMarks, updateMarks, getMarks, getHighestMarksPerSubject, getToppersMarks,
};
