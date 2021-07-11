import { dbQuery } from '../db/db';


export async function addStudent(studentid: string, name: string, sex: string | null, age: number | null, classid: string) {
	try {
		const query = 'insert into student (id, name, sex, age, class_id) values ($1, $2, $3, $4,$5)';
		const res = await dbQuery(query, [studentid, name, sex, age, classid]);

		if (res && res.command === 'INSERT')
			return true;

		return false;

	} catch (e) {
		throw new Error(e);
	}
}

export async function countStudents() {
	try {
		const query = 'select count(*) as total from student';
		const res = await (dbQuery(query));

		return res.rows[0].total;
	} catch (e) {
		throw new Error(e);
	}
}

export async function getStudents() {
	try {
		// offset = null & limit = null ==> fetches all data
		const query = 'select * from student';
		const res = await (dbQuery(query));

		return res.rows;
	} catch (e) {
		throw new Error(e);
	}
}

export async function getStudentMarks(id: string) {
	try {
		const query = `
        select subname as subject, mark.marks
        from mark
        inner join student on student.id = mark.student_id
        inner join subject on subject.id = mark.subject_id
        where mark.student_id = $1
      `;
		const res = await (dbQuery(query, [id]));

		return res.rows;
	} catch (e) {
		throw new Error(e);
	}
}


export async function getStudentClassId(classid: string) {
	try {

		const query2 = 'select * from student where class_id = $1';
		const res = await (dbQuery(query2, [classid]));

		return res.rows;
	} catch (e) {
		throw new Error(e.message);
	}
}

export async function getStudentSubjectId(subid: string) {
	try {

		const query2 = ` select student.id,student.name
        from student
        inner join schedule on student.class_id = schedule.class_id
                inner join subject on schedule.subject_id = subject.id 
                where subject.id = $1;`;
		const res = await (dbQuery(query2, [subid]));

		return res.rows;
	} catch (e) {
		throw new Error(e.message);
	}
}
export async function getStudentTeacherId(teacherid: string) {
	try {

		const query2 = ` select student.id, student.name
        from student
               inner join schedule on student.class_id = schedule.class_id
               inner join teacher on schedule.teacher_id = teacher.id 
                where teacher.id= $1;`;
		const res = await (dbQuery(query2, [teacherid]));

		return res.rows;
	} catch (e) {
		throw new Error(e.message);
	}
}

