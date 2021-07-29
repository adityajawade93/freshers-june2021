/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from "vm";

import * as classService from "../services/classes";

import { classNoSchema } from "../db/validateSchema/helperSchema";

export const getClasses = async (ctx: Context) => {
  const AllAvailableClasses = await classService.getClasses();
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: AllAvailableClasses,
  };
};

export const getSchedule = async (ctx: Context) => {
  const data = await classService.getSchedule();
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};

export const getClassSchedule = async (ctx: Context) => {
  let classNumber = ctx.params.classNumber;

  const reqData = await classNoSchema.validateAsync({ classNumber });

  if (reqData.error) {
    ctx.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }

  classNumber = Number(classNumber);
  const data = await classService.getClassSchedule(classNumber);
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};

export const fetchStudentsWithClass = async (ctx: Context) => {
  const classNumber = ctx.params.classNumber;

  const reqData = await classNoSchema.validateAsync({ classNumber });
  if (reqData.error) {
    ctx.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }

  const data = await classService.fetchStudentsWithClass(classNumber);
  if (data.length === 0) {
    ctx.status = 404;
    ctx.body = {
      status: `classNumber NOT FOUND`,
    };
  }
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};
