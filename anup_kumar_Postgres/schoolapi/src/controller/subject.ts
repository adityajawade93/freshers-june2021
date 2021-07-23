import { Context } from 'vm';
import {
  getSubject as get_subject,
  studentOfSubject as student_of_subject,
  addSubject as add_subejct
} from '../services/subject';
import { subjectSchema } from '../helper/validation';

interface subjectI {
  name: string;
  classId: string;
  teacherId: string;
}

export async function getSubject(ctx: Context) {
  try {
    const allSubject = await get_subject();
    ctx.body = {
      message: 'Data fethced successfully',
      data: allSubject
    };
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = {
      msg: `something went worng in getting all subjects + ${e}`
    };
  }
}

export async function getStudentOfSubject(ctx: Context) {
  try {
    const subjectId = ctx.request.params.subjectId;
    const requestedStudent = await student_of_subject(subjectId);
    ctx.response.status = 200;
    ctx.body = requestedStudent;
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = {
      error: `something went wrong in getting student from subject id +  ${e}`
    };
  }
}

export async function addSubject(ctx: Context) {
  try {
    const obj: subjectI = ctx.request.body;
    const response = await subjectSchema.validate(obj);
    if (response.error) {
      ctx.response.status = 422;
      ctx.body = response.error.details[0].message;
      return;
    }
    const addedSubject = await add_subejct(
      obj.name,
      obj.classId,
      obj.teacherId
    );
    ctx.response.status = 200;
    ctx.body = {
      msg: 'New Sunect added',
      dataAdded: addedSubject
    };
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = {
      msg: `something went wrong in adding teacher ${e}`
    };
  }
}
