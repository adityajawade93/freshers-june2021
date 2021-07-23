import { Context } from 'vm';
import {
  getMarksOfStudent as get_marks_of_student,
  updateMarks as update_marks,
  addMarks as add_marks,
  highestMarksInSubject as highest_marks_in_subjects,
  topper as _topper
} from '../services/marks';

interface marksI {
  studentId: string;
  subjectId: string;
  marks: number;
}

export async function getMarksOfStudent(ctx: Context) {
  try {
    const studentId: string = ctx.request.params.studentId;
    const marksObtained = await get_marks_of_student(studentId);
    ctx.response.status = 200;
    ctx.body = {
      msg: `all subject marks for studentID ${studentId}`,
      marks: marksObtained
    };
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = `something went wrong in fetching mark  + ${e}`;
  }
}

import { marksSchema } from '../helper/validation';

export async function updateMarks(ctx: Context) {
  try {
    const obj = ctx.request.body;
    console.log(obj);
    const response = marksSchema.validate(obj);
    if (response.error) {
      ctx.response.status = 422;
      ctx.body = response.error.details[0].message;
      return;
    }
    const updatedMarks = await update_marks(
      obj.studentId,
      obj.subjectId,
      obj.marks
    );
    ctx.response.status = 200;
    ctx.body = {
      msg: 'data updated',
      data: updatedMarks
    };
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = `something went wrong in updating marks + ${e}`;
  }
}

export async function addMarks(ctx: any) {
  try {
    const obj = ctx.request.body;
    const response = await marksSchema.validate(obj);
    if (response.error) {
      ctx.response.status = 422;
      ctx.body = response.error.details[0].message;
      return;
    }
    const addedMarks = await add_marks(obj.studentID, obj.subjectID, obj.marks);
    ctx.response.status = 200;
    ctx.body = {
      msg: 'marks added',
      data: addedMarks
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = `something went wrong in adding marks + ${err}`;
  }
}

export async function highestMarksInSubject(ctx: Context) {
  try {
    const subjectId = ctx.request.params.subjectId;
    const marks = await highest_marks_in_subjects(subjectId);
    ctx.response.status = 200;
    ctx.body = {
      data: marks
    };
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = `${e}`;
  }
}

export async function topper(ctx: any) {
  try {
    const topperCount: number = ctx.request.params.topperCount;
    const toppers = await _topper(topperCount);
    ctx.response.status = 200;
    ctx.body = toppers;
  } catch (e) {
    ctx.response.status = 400;
    ctx.body = {
      error: `something went wrong ${e}`
    };
  }
}
