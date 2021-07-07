import uuid from "uniqid";
import { Context } from "vm";
import * as subjectWorker from "../services/subject";
import * as teacherWorker from "../services/teacher";
import {
  invalidData,
  serverERROR,
  NOTFOUNDERROR,
  CONFLICTERROR,
  UNAUTHORIZEDERROR,
} from "../config/error";

interface Subject {
  sub_id?: string;
  sub_name: string;
  teacher_id: string;
  cl_no: number;
}

import { checkSubject } from "../config/validation";

export const createSubject = async (ctx: Context) => {
  try {
    const s1: Subject = ctx.request.body;
    if (!checkSubject(s1)) {
      invalidData(ctx, "bad input data");
      return;
    }

    if (!(await teacherWorker.checkExists(s1.teacher_id))) {
      UNAUTHORIZEDERROR(
        ctx,
        `Teacher with this id not available!! Enter valid teacher id`
      );

      return;
    }

    if (await subjectWorker.checkAlreadyExistDB(s1)) {
      CONFLICTERROR(ctx, "subject already exist in this class");
      return;
    }

    s1.sub_id = uuid();

    if (!(await subjectWorker.addSubjectDB(s1))) {
      invalidData(ctx, "bad Input");
    }

    if (!(await subjectWorker.addTeachesDB(s1))) {
      invalidData(ctx, "bad Input");
    }

    if (!(await subjectWorker.addClassDB(s1))) {
      invalidData(ctx, "bad Input");
    }

    ctx.status = 200;
    ctx.body = {
      status: `successfully created subject with ${s1.sub_id}`,
    };
  } catch (err) {
    serverERROR(ctx);
  }
};

export const getSubject = async (ctx: Context) => {
  try {
    const data = await subjectWorker.getSubjectDB();
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
    const sub_id = ctx.params.sub_id;
    if (!sub_id || typeof sub_id !== "string") {
      invalidData(ctx, "bad Input");
      return;
    }
    const data = await subjectWorker.fetchStudentsWithSubDB(sub_id);
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
