import uuid from "uniqid";
import { Context } from "vm";
import * as subjectService from "../services/subject";
import * as teacherService from "../services/teacher";


import AppError from "../utils/appError";

import subjectSchema from "../db/validateSchema/subjectSchema";

interface ISubject {
  subject_id?: string;
  subject_name: string;
  teacher_id: string;
  class_number: number;
}

export const createSubject = async (ctx: Context) => {
  try {
    const s1: ISubject = ctx.request.body;

    await subjectSchema.validateAsync(s1);

    await teacherService.checkExists(s1.teacher_id);

    await subjectService.checkAlreadyExistDB(s1);

    s1.subject_id = uuid();

    await subjectService.addSubjectDB(s1);

    await subjectService.addTeachesDB(s1);

    await subjectService.addClassDB(s1);

    ctx.status = 200;
    ctx.body = {
      status: `successfully created subject with ${s1.subject_id}`,
    };
  } catch (err) {
    throw err;
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
    throw err;
  }
};

export const fetchStudentsWithSub = async (ctx: Context) => {
  try {
    const subject_id = ctx.params.subjectId;
    if (!subject_id || typeof subject_id !== "string") {
      throw new AppError("INVALID Data", 400);
    }
    const data = await subjectService.fetchStudentsWithSubDB(subject_id);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};
