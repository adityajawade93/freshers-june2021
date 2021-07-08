import { Context } from "vm";
import * as marksService from "../services/mark";
// import { checkMark } from "../helper/validation";
import markSchema from "../config/db/validateSchema/markSchema";

import {
  invalidData,
  serverERROR,
  NOTFOUNDERROR,
  CONFLICTERROR,
  UNAUTHORIZEDERROR,
} from "../utils/util";

interface IMark {
  student_id: string;
  subject_id: string;
  marks: number;
  teacher_id: string;
  class_number: number;
}

export const createMarks = async (ctx: Context) => {
  try {
    const m1: IMark = ctx.request.body;

    await markSchema.validateAsync(m1);

    if (!(await marksService.checkStudentExist(m1))) {
      UNAUTHORIZEDERROR(
        ctx,
        `student with this id not available!! Enter valid student id`
      );
      return;
    }

    if (!(await marksService.checkSubjectExist(m1))) {
      UNAUTHORIZEDERROR(
        ctx,
        `subject with this class not available!! Enter valid Details`
      );
      return;
    }

    if (await marksService.checkAlreadyExist(m1)) {
      CONFLICTERROR(ctx, `data already available `);
      return;
    }

    if (marksService.addMarkDB(m1)) {
      ctx.status = 200;
      ctx.body = {
        status: `successfully created marks with ${m1.student_id} & ${m1.subject_id}`,
      };
    } else {
      invalidData(ctx, "Bad input Data");
    }
  } catch (err) {
    serverERROR(ctx);
  }
};

export const modifyMarks = async (ctx: Context) => {
  try {
    const student_id = ctx.params.studentId;
    const subject_id = ctx.params.subjectId;

    if (
      !subject_id ||
      !student_id ||
      typeof student_id !== "string" ||
      typeof subject_id !== "string"
    ) {
      invalidData(ctx, "Bad input Data");
      return;
    }

    if (!(await marksService.checkExist(student_id, subject_id))) {
      UNAUTHORIZEDERROR(ctx, `either subject or student id not available`);
      return;
    }

    const { marks } = ctx.request.body;

    if (await marksService.ModifyMarksDB(marks, student_id, subject_id)) {
      ctx.status = 200;
      ctx.body = {
        status: `successfully updated marks with ${student_id} & ${subject_id} with ${marks}`,
      };
    } else {
      invalidData(ctx, "Bad input Data");
    }
  } catch (err) {
    serverERROR(ctx);
  }
};

export const fetchMarks = async (ctx: Context) => {
  try {
    const student_id = ctx.params.studentId;
    if (!student_id || typeof student_id !== "string") {
      invalidData(ctx, "Bad input Data");
      return;
    }
    const data = await marksService.fetchMarksDB(student_id);
    if (data.length === 0) {
      NOTFOUNDERROR(ctx, `id not found`);
      return;
    }
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    invalidData(ctx, "Bad input Data");
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
    serverERROR(ctx);
  }
};

//to do
export const fetchHighestMarksPerSubjectWithSubjectID = async (
  ctx: Context
) => {
  try {
    const subject_id = ctx.params.subjectId;
    if (subject_id && typeof subject_id !== "string") {
      invalidData(ctx, "Bad input Data");
      return;
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
    serverERROR(ctx);
  }
};

export const fetchTopBYNumber = async (ctx: Context) => {
  try {
    let number = ctx.params.number;
    if (!number || isNaN(number)) {
      invalidData(ctx, "Bad input Data");
      return;
    }
    number = Number(number);
    const data = await marksService.fetchTopBYNumberDB(number);
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    serverERROR(ctx);
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
    serverERROR(ctx);
  }
};

export const fetchTopperPerClassWithClassNumber = async (ctx: Context) => {
  try {
    let classNumber = ctx.params.classNumber;
    if (classNumber && isNaN(classNumber)) {
      invalidData(ctx, "Bad input Data");
      return;
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
    serverERROR(ctx);
  }
};
