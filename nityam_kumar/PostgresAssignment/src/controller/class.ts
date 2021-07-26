import { Context } from "vm";

import * as classService from "../services/classes";

import AppError from "../utils/appError";

import { classNoSchema } from "../db/validateSchema/helperSchema";

export const getClasses = async (ctx: Context) => {
  try {
    const AllAvailableClasses = await classService.getClasses();
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: AllAvailableClasses,
    };
  } catch (err) {
    throw err;
  }
};

export const getSchedule = async (ctx: Context) => {
  try {
    const data = await classService.getSchedule();
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

export const getClassSchedule = async (ctx: Context) => {
  let classNumber = ctx.params.classNumber;

  try {
    await classNoSchema.validateAsync({ classNumber });
  } catch (err) {
    throw new AppError("BAD DATA", 400);
  }

  try {
    classNumber = Number(classNumber);
    const data = await classService.getClassSchedule(classNumber);
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

export const fetchStudentsWithClass = async (ctx: Context) => {
  const classNumber = ctx.params.classNumber;
  try {
    await classNoSchema.validateAsync({ classNumber });
  } catch (err) {
    throw new AppError("BAD DATA", 400);
  }
  try {
    const data = await classService.fetchStudentsWithClass(classNumber);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};
