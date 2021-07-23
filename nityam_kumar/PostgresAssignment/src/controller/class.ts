import { Context } from "vm";

import * as classService from "../services/classes";

import AppError from "../utils/appError";

export const getClasses = async (ctx: Context) => {
  try {
    const AllAvailableClasses = await classService.getClassesDB();
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
    const data = await classService.getScheduleDB();
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
    if (classNumber && isNaN(classNumber)) {
      throw new AppError("BAD DATA", 400);
    }
    classNumber = Number(classNumber);
    const data = await classService.getClassScheduleDB(classNumber);
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
  const class_number = ctx.params.classNumber;
  try {
    if (!class_number || typeof class_number !== "number") {
      throw new AppError("BAD DATA", 400);
    }

    const data = await classService.fetchStudentsWithClassDB(class_number);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};
