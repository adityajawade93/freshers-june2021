/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from "vm";
import * as marksService from "../services/mark";

import markSchema from "../db/validateSchema/markSchema";

import {
  classNoSchema,
  marksInputSchema,
  fetchTopBYNumberSchema,
  subjectIDSchema,
  studentIDSchema,
} from "../db/validateSchema/helperSchema";

interface IMark {
  student_id: string;
  subject_id: string;
  marks: number;
  teacher_id: string;
  class_number: number;
}

export const createMarks = async (ctx: Context) => {
  const m1: IMark = ctx.request.body;

  const reqData = await markSchema.validateAsync(m1);
  if (reqData.error) {
    ctx.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }

  const value = await Promise.all([
    marksService.checkStudentExist(m1),
    marksService.checkSubjectExist(m1),
    marksService.checkAlreadyExist(m1),
  ]);
  if (value[0] === 0) {
    ctx.status = 401;
    ctx.body = {
      status: `student with this id not available!! Enter valid student id`,
    };
    return;
  } else if (value[1] === 0) {
    ctx.status = 401;
    ctx.body = {
      status: `subject with this class not available!! Enter valid Details`,
    };
    return;
  } else if (value[2] > 0) {
    ctx.status = 409;
    ctx.body = {
      status: `data already available `,
    };
    return;
  }

  await marksService.addMark(m1);
  ctx.status = 200;
  ctx.body = {
    status: `successfully created marks with ${m1.student_id} & ${m1.subject_id}`,
  };
};

export const modifyMarks = async (ctx: Context) => {
  const student_id = ctx.params.studentId;
  const subject_id = ctx.params.subjectId;
  const { marks } = ctx.request.body;

  const reqData = await marksInputSchema.validateAsync({
    student_id,
    subject_id,
    marks,
  });
  if (reqData.error) {
    ctx.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }

  const data = await marksService.checkExist(student_id, subject_id);
  if (data === 0) {
    ctx.status = 401;
    ctx.body = {
      status: `either subject or student id not available`,
    };
    return;
  }
  await marksService.ModifyMarks(marks, student_id, subject_id);
  ctx.status = 200;
  ctx.body = {
    status: `successfully updated marks with ${student_id} & ${subject_id} with ${marks}`,
  };
};

export const fetchMarks = async (ctx: Context) => {
  const student_id = ctx.params.studentId;

  const reqData = await studentIDSchema.validateAsync({ student_id });
  if (reqData.error) {
    ctx.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }

  const data = await marksService.fetchMarks(student_id);
  if (data.length === 0) {
    ctx.status = 404;
    ctx.body = {
      status: "student id not found",
    };
    return;
  }
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};

export const fetchHighestMarksPerSubject = async (ctx: Context) => {
  const data = await marksService.fetchHighestMarksPerSubject();
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};

export const fetchHighestMarksPerSubjectWithSubjectID = async (
  ctx: Context
) => {
  const subject_id = ctx.params.subjectId;

  const reqData = await subjectIDSchema.validateAsync({ subject_id });
  if (reqData.error) {
    ctx.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }

  const data = await marksService.fetchHighestMarksPerSubjectWithSubjectID(
    subject_id
  );
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};

export const fetchTopBYNumber = async (ctx: Context) => {
  let number = ctx.params.number;

  const reqData = await fetchTopBYNumberSchema.validateAsync({ number });
  if (reqData.error) {
    ctx.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }

  number = Number(number);
  const data = await marksService.fetchTopBYNumber(number);
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};

export const fetchTopperPerClass = async (ctx: Context) => {
  const data = await marksService.fetchTopperPerClass();
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};

export const fetchTopperPerClassWithClassNumber = async (ctx: Context) => {
  let classNumber = ctx.params.classNumber;

  const reqData = await classNoSchema.validateAsync({ classNumber });
  if (reqData.error) {
    ctx.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }

  classNumber = Number(classNumber);
  const data = await marksService.fetchTopperPerClassWithClassNumber(
    classNumber
  );
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};
