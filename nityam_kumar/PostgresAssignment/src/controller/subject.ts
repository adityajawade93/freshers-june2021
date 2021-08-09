/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import uuid from "uniqid";
import { Context } from "vm";
import * as subjectService from "../services/subject";
import * as teacherService from "../services/teacher";

import { subjectIDSchema } from "../db/validateSchema/helperSchema";

import subjectSchema from "../db/validateSchema/subjectSchema";

interface ISubject {
  subject_id?: string;
  subject_name: string;
  teacher_id: string;
  class_number: number;
}

export const createSubject = async (ctx: Context) => {
  const s1: ISubject = ctx.request.body;

  const { error } = subjectSchema.validate(s1);
  if (error) {
    ctx.status = 400;
    ctx.body = error.message;
    return;
  }

  const data = await Promise.all([
    teacherService.checkExists(s1.teacher_id),
    subjectService.checkAlreadyExist(s1),
  ]);

  if (data[0] === 0) {
    ctx.status = 401;
    ctx.body = {
      status: "Teacher with this id not available!! Enter valid teacher id",
    };
    return;
  } else if (data[1] > 0) {
    ctx.status = 409;
    ctx.body = {
      status: "subject already exist in this class",
    };
    return;
  }

  s1.subject_id = uuid();
  await subjectService.addSubject(s1);

  await subjectService.addTeaches(s1);

  await subjectService.addClass(s1);
  ctx.status = 201;
  ctx.body = {
    status: `successfully created subject with ${s1.subject_id}`,
  };
};

export const getSubject = async (ctx: Context) => {
  const data = await subjectService.getSubject();
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};

export const fetchStudentsWithSub = async (ctx: Context) => {
  const subject_id = ctx.params.subjectId;

  const { error } = subjectIDSchema.validate({ subject_id });
  if (error) {
    ctx.status = 400;
    ctx.body = error.message;
    return;
  }

  const data = await subjectService.fetchStudentsWithSub(subject_id);
  if (data.length === 0) {
    ctx.status = 404;
    ctx.body = {
      status: "id NOT FOUND!!",
    };
    return;
  }
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};
