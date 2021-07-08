import { query } from "../database/index";
import { handleError } from "../helper/index";

export async function AllSubjects(limit: number, offset: number) {
  try {
    const [response, responseError] = await handleError(
      query(`select * from school.subject LIMIT ${limit} OFFSET ${offset}`)
    );
    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export async function SubjectStudent(id: string) {
  try {
    const [response, responseError] = await handleError(
      query(
        `select * 
            from school.student as st, school.subject as sb
            where st.classid = sb.classid and sb.subjectid = '${id}'`
      )
    );
    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export async function AddSubject(
  name: string,
  classid: string,
  teacherid: string
) {
  try {
    const [, responseError] = await handleError(
      query(`INSERT INTO school.subject(name, classid, teacherid) VALUES
        ('${name}','${classid}','${teacherid}')`)
    );
    if (responseError) throw new Error(responseError);
    return;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}
