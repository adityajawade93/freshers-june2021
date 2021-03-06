import { dbQuery } from "../db/db";



export async function addStudent(studentid: string, name: string, sex: string | null, dob: Date | null, classid: string): Promise<boolean | Error> {
    try {
        const query = 'insert into student (studentid, name, sex, dob, classid) values ($1, $2, $3, $4,$5)';
        const res = await dbQuery(query, [studentid, name, sex, dob, classid]);

        if (res && res.command === 'INSERT')
            return true;

        return false;

    } catch (e) {
        throw new Error(e);
    }
}

export async function countStudents(): Promise<number | Error> {
    try {
        const query = 'select count(*) as total from student';
        const res = await (dbQuery(query));

        return res.rows[0].total;
    } catch (e) {
        throw new Error(e);
    }
}

export async function getStudents(page: number, size: number): Promise<Array<string>> {
    try {
        // offset = null & limit = null ==> fetches all data
        if (page === 0 && size === 0) {
            const query = `select * from student order by name`;
            const res = await (dbQuery(query));

            return res.rows;

        } else {
            const query = `SELECT *
            FROM student order by name
             LIMIT  ${size} OFFSET  ${page * size};`;
            //console.log(query);
            const res = await (dbQuery(query));

            return res.rows;

        }

    } catch (e) {

        throw new Error(e);
    }
}

export async function getStudentMarks(id: string): Promise<Array<string>> {
    try {
        const query = `
        select subname as subject, mark.marks
        from mark
        inner join student on student.studentid = mark.studentid
        inner join subject on subject.subid = mark.subid
        where mark.studentid = $1
      `;
        const res = await (dbQuery(query, [id]));

        return res.rows;
    } catch (e) {
        throw new Error(e);
    }
}


export async function getStudentByClassId(classid: string): Promise<Array<string>> {
    try {

        const query2 = `select * from student where classid =$1 order by student.name`;
        const res = await (dbQuery(query2, [classid]));

        return res.rows;
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getStudentBySubjectId(subid: string): Promise<Array<string>> {
    try {

        const query2 = ` select student.studentid,student.name
        from student 
        inner join schedule on student.classid = schedule.classid
                inner join subject on schedule.subjectid=subject.subid 
                where subject.subid = $1 order by student.name;`;
        const res = await (dbQuery(query2, [subid]));

        return res.rows;
    } catch (e) {
        throw new Error(e.message);
    }
}
export async function getStudentByTeacherId(teacherid: string): Promise<Array<string>> {
    try {

        const query2 = ` select student.studentid, student.name
        from student
               inner join schedule on student.classid = schedule.classid
               inner join teacher on schedule.teacherid=teacher.teacherid 
                where teacher.teacherid= $1 order by student.name;`;
        const res = await (dbQuery(query2, [teacherid]));

        return res.rows;
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getTopTenMarks(subid: string): Promise<Array<string>> {//given subid get top ten students by marks on that subject
    try {

        const query2 = ` SELECT student.studentid, marks,student.name FROM mark 
        inner join student on student.studentid = mark.studentid where 
        subid=$1
        ORDER BY marks DESC limit 10 ;`;
        const res = await (dbQuery(query2, [subid]));

        return res.rows;
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getTopScorerEachSub(): Promise<Array<string>> {//given subid get top ten students by marks on that subject
    try {

        const query1 = ` 
        select student.name,subject.subname,mark.marks from mark
        inner join student on student.studentid = mark.studentid 
        inner join subject on subject.subid = mark.subid
        where marks in (select max(marks) from mark group by subid) order by student.name ;`;
        const res = await (dbQuery(query1));

        return res.rows;
    } catch (e) {
        throw new Error(e.message);
    }
}

