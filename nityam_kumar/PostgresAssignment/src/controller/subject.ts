import uuid from "uniqid";
import { Context } from "vm";
import * as subjectService from "../services/subject";
import * as teacherService from "../services/teacher";
import {
  invalidData,
  serverERROR,
  NOTFOUNDERROR,
  CONFLICTERROR,
  UNAUTHORIZEDERROR,
} from "../utils/util";

// import { checkSubject } from "../helper/validation";

import subjectSchema from "../config/db/validateSchema/subjectSchema";

interface ISubject {
  subject_id?: string;
  subject_name: string;
  teacher_id: string;
  class_number: number;
}

export const createSubject = async (ctx: Context) => {
  try {
    const s1: ISubject = ctx.request.body;

    // if (!checkSubject(s1)) {
    //   invalidData(ctx, "bad input data");
    //   return;
    // }
    await subjectSchema.validateAsync(s1);

    if (!(await teacherService.checkExists(s1.teacher_id))) {
      UNAUTHORIZEDERROR(
        ctx,
        `Teacher with this id not available!! Enter valid teacher id`
      );

      return;
    }

    if (await subjectService.checkAlreadyExistDB(s1)) {
      CONFLICTERROR(ctx, "subject already exist in this class");
      return;
    }

    s1.subject_id = uuid();

    if (!(await subjectService.addSubjectDB(s1))) {
      invalidData(ctx, "bad Input");
    }

    if (!(await subjectService.addTeachesDB(s1))) {
      invalidData(ctx, "bad Input");
    }

    if (!(await subjectService.addClassDB(s1))) {
      invalidData(ctx, "bad Input");
    }

    ctx.status = 200;
    ctx.body = {
      status: `successfully created subject with ${s1.subject_id}`,
    };
  } catch (err) {
    serverERROR(ctx);
  }
};

export const getSubject = async (ctx: Context) => {
  try {
    const data = await subjectService.getSubjectDB();
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    serverERROR(ctx);
  }
};

export const fetchStudentsWithSub = async (ctx: Context) => {
  try {
    const subject_id = ctx.params.subjectId;
    if (!subject_id || typeof subject_id !== "string") {
      invalidData(ctx, "bad Input");
      return;
    }
    const data = await subjectService.fetchStudentsWithSubDB(subject_id);
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
    serverERROR(ctx);
  }
};
