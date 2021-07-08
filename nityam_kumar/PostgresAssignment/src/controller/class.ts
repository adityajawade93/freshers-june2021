import { Context } from "vm";

import * as classService from "../services/classes";

import { invalidData, serverERROR, NOTFOUNDERROR } from "../utils/util";

export const getClasses = async (ctx: Context) => {
  try {
    const AllAvailableClasses = await classService.getClassesDB();
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: AllAvailableClasses,
    };
  } catch (err) {
    serverERROR(ctx);
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
    serverERROR(ctx);
  }
};

export const getClassSchedule = async (ctx: Context) => {
  try {
    let classNumber = ctx.params.classNumber;
    if (classNumber && isNaN(classNumber)) {
      invalidData(ctx, "Bad Input");
      return;
    }
    classNumber = Number(classNumber);
    const data = await classService.getClassScheduleDB(classNumber);
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    serverERROR(ctx);
  }
};

export const fetchStudentsWithClass = async (ctx: Context) => {
  try {
    const class_number = ctx.params.classNumber;
    if (!class_number || typeof class_number !== "number") {
      invalidData(ctx, "bad Input");
      return;
    }

    const data = await classService.fetchStudentsWithClassDB(class_number);

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
