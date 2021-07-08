import { query } from "../database/index";
import { handleError } from "../helper/index";

export async function Allteacher() {
  try {
    const [response, responseError] = await handleError(
      query("select * from school.teacher")
    );

    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export async function TeacherStudent(id: string) {
  try {
    const [response, responseError] = await handleError(
      query(
        `select * 
          from school.student as st, school.subject as sb
          where st.classid = sb.classid and sb.teacherid =  '${id}'`
      )
    );
    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export async function AddTeacher(name: string) {
  try {
    const [, responseError] = await handleError(
      query(`INSERT INTO school.teacher(name) VALUES ('${name}')`)
    );
    if (responseError) throw new Error(responseError);
    return;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}
