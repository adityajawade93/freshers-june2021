
import { Context } from "vm";

import * as classWorker from "../services/classes";

import { invalidData, serverERROR, NOTFOUNDERROR } from "../config/error";

export const getClasses = async (ctx: Context) => {
  try {
    const [data1, data2] = await classWorker.getClassesDB();
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data1,
      dat2: data2,
    };
  } catch (err) {
    serverERROR(ctx);
  }
};

export const getSchedule = async (ctx: Context) => {
  try {
    const data = await classWorker.getScheduleDB();
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
    const cl_id = ctx.params.cl_id;
    if (!cl_id || typeof cl_id !== "string") {
      invalidData(ctx, "bad Input");
      return;
    }

    const data = await classWorker.fetchStudentsWithClassDB(cl_id);

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


