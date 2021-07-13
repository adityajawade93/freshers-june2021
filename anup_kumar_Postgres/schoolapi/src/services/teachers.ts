import { query } from "../database/index";
import { handle_error } from "../helper/index";

export async function all_teachers() {
  try {
    const [response, responseError] = await handle_error(
      query("select * from school.teacher")
    );

    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export async function student_of_teachers(id: string) {
  try {
    const [response, responseError] = await handle_error(
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

export async function add_teachers(name: string) {
  try {
    const [, responseError] = await handle_error(
      query(`INSERT INTO school.teacher(name) VALUES ('${name}')`)
    );
    if (responseError) throw new Error(responseError);
    return;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}
