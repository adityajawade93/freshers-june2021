import { query } from "../database/index";
import { handle_error } from "../helper/index";

export async function all_classes() {
  try {
    const [response, responseError] = await handle_error(
      query(`SELECTs * FROM school.class`)
    );
    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e.message);
  }
}

export async function student_of_class(classid: string) {
  try {
    const [response, responseError] = await handle_error(
      query(`select * from school.student where classid = '${classid}'`)
    );

    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export async function add_class(classname: string) {
  try {
    const [, responseError] = await handle_error(
      query(
        `INSERT INTO school.class(name) 
            VALUES (${classname})`
      )
    );
    if (responseError) throw new Error(responseError);
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}
