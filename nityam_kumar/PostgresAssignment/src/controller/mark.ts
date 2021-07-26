import { Context } from "vm";
import * as marksService from "../services/mark";

import markSchema from "../db/validateSchema/markSchema";
import AppError from "../utils/appError";

interface IMark {
  student_id: string;
  subject_id: string;
  marks: number;
  teacher_id: string;
  class_number: number;
}

export const createMarks = async (ctx: Context) => {
  const m1: IMark = ctx.request.body;

  try {
    await markSchema.validateAsync(m1);
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }

  try {
    await Promise.all([
      marksService.checkStudentExist(m1),
      marksService.checkSubjectExist(m1),
      marksService.checkAlreadyExist(m1),
    ]);
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }

  try {
    await marksService.addMarkDB(m1);
    ctx.status = 200;
    ctx.body = {
      status: `successfully created marks with ${m1.student_id} & ${m1.subject_id}`,
    };
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }
};

export const modifyMarks = async (ctx: Context) => {
  const student_id = ctx.params.studentId;
  const subject_id = ctx.params.subjectId;
  const { marks } = ctx.request.body;
  try {
    if (
      !subject_id ||
      !student_id ||
      typeof student_id !== "string" ||
      typeof subject_id !== "string"
    ) {
      throw new AppError("BAD INPUT DATA", 400);
    }

    await marksService.checkExist(student_id, subject_id);

    await marksService.ModifyMarksDB(marks, student_id, subject_id);
    ctx.status = 200;
    ctx.body = {
      status: `successfully updated marks with ${student_id} & ${subject_id} with ${marks}`,
    };
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }
};

export const fetchMarks = async (ctx: Context) => {
  const student_id = ctx.params.studentId;
  try {
    if (!student_id || typeof student_id !== "string") {
      throw new AppError("BAD INPUT DATA", 400);
    }
    const data = await marksService.fetchMarksDB(student_id);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

export const fetchHighestMarksPerSubject = async (ctx: Context) => {
  try {
    const data = await marksService.fetchHighestMarksPerSubjectDB();
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

export const fetchHighestMarksPerSubjectWithSubjectID = async (
  ctx: Context
) => {
  const subject_id = ctx.params.subjectId;
  try {
    if (subject_id && typeof subject_id !== "string") {
      throw new AppError("BAD INPUT DATA", 400);
    }
    const data = await marksService.fetchHighestMarksPerSubjectWithSubjectIDDB(
      subject_id
    );
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

export const fetchTopBYNumber = async (ctx: Context) => {
  let number = ctx.params.number;
  try {
    if (!number || isNaN(number)) {
      throw new AppError("BAD INPUT DATA", 400);
    }
    number = Number(number);
    const data = await marksService.fetchTopBYNumberDB(number);
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

export const fetchTopperPerClass = async (ctx: Context) => {
  try {
    const data = await marksService.fetchTopperPerClassDB();
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

export const fetchTopperPerClassWithClassNumber = async (ctx: Context) => {
  let classNumber = ctx.params.classNumber;
  try {
    if (classNumber && isNaN(classNumber)) {
      throw new AppError("BAD INPUT DATA", 400);
    }
    classNumber = Number(classNumber);
    const data = await marksService.fetchTopperPerClassWithClassNumberDB(
      classNumber
    );
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};
