import { query } from '../database/index';

export async function getMarksOfStudent(studentId: string) {
  try {
    const response = await query(
      `SELECT * FROM school.marks where studentid='${studentId}'`
    );
    return response.rows;
  } catch (e) {
    throw Error(e);
  }
}

export async function updateMarks(
  studentId: string,
  subjectId: string,
  marks: number
) {
  try {
    const response = await query(`UPDATE school.marks
    SET marks = '${marks}'
    WHERE studentId = '${studentId}'
    and subjectId= '${subjectId}'
    RETURNING *`);
    return response.rows;
  } catch (e) {
    throw Error(e);
  }
}

export async function addMarks(
  studentid: string,
  subjectid: string,
  marks: number
) {
  try {
    query(
      `INSERT INTO school.marks(studentid, subjectid, marks) VALUES 
            ('${studentid}','${subjectid}','${marks}')`
    );
  } catch (e) {
    throw Error(e);
  }
}

export async function highestMarksInSubject(subjectId: string) {
  try {
    const response = await query(`select * from school.marks 
        where subjectid = '${subjectId}'
        order by marks desc
        limit 1`);
    return response.rows;
  } catch (e) {
    throw Error(e);
  }
}

export async function topper(topperCount: number) {
  try {
    const response = await query(
      `select studentid, sum(marks) as total 
            from school.marks  group by marks.studentid order by total desc limit ${topperCount}`
    );
    return response.rows;
  } catch (e) {
    throw Error(e);
  }
}
