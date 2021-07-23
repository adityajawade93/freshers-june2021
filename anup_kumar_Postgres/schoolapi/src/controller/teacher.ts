import { Context } from 'vm';
import {
  allteacher,
  studentOfteacher as student_of_teacher,
  addTeacher as add_teacher
} from '../services/teachers';

export async function getTeachers(ctx: Context) {
  try {
    const response = await allteacher();
    ctx.response.status = 200;
    ctx.body = {
      msg: 'List of all the teachers',
      data: response.rows
    };
    return;
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = { msg: `something wrong in getting teachers list + ${e}` };
  }
}

export async function studentOfteacher(ctx: Context) {
  try {
    const teacherId: string = ctx.request.params.teacherId;
    const requiredStudent = await student_of_teacher(teacherId);

    ctx.response.status = 200;
    ctx.body = requiredStudent;
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = {
      error: `something went wrong in getting student from teacher id + ${e}`
    };
  }
}

import { teacherSchema } from '../helper/validation';
export async function addTeacher(ctx: Context) {
  try {
    const obj = ctx.request.body;
    const response = await teacherSchema.validate(obj);
    if (response.error) {
      ctx.response.status = 422;
      ctx.body = response.error.details[0].message;
      return;
    }
    const newTeacher = await add_teacher(obj.name, obj.sex, obj.phone);
    ctx.response.status = 200;
    ctx.body = {
      msg: 'teacher added',
      dataAdded: newTeacher
    };
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = {
      msg: `something went wrong in adding teacher ${e}`
    };
  }
}
