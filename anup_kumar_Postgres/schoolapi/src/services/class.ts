import { query } from "../database/index";
import { handleError } from "../helper/index";

export async function AllClasses() {
  try {
    const [response, responseError] = await handleError(
      query(`SELECTs * FROM school.class`)
    );
    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e.message);
  }
}

export async function classStudent(id: string) {
  try {
    const [response, responseError] = await handleError(
      query(`select * from school.student where classid = '${id}'`)
    );

    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export async function addClass(name: string) {
  try {
    const [, responseError] = await handleError(
      query(
        `INSERT INTO school.class(name) 
            VALUES (${name})`
      )
    );
    if (responseError) throw new Error(responseError);
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}
