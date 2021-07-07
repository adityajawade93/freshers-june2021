import { Context } from "vm";
import * as marksWorker from "../services/mark";
import { checkMark } from "../config/validation";

import {
  invalidData,
  serverERROR,
  NOTFOUNDERROR,
  CONFLICTERROR,
  UNAUTHORIZEDERROR,
} from "../config/error";

interface Mark {
  st_id: string;
  sub_id: string;
  marks: number;
  teacher_id: string;
  cl_no: number;
}

export const createMarks = async (ctx: Context) => {
  try {
    const m1: Mark = ctx.request.body;
    if (!checkMark(m1)) {
      invalidData(ctx, "bad input data");
      return;
    }

    if (!(await marksWorker.checkStudentExist(m1))) {
      UNAUTHORIZEDERROR(
        ctx,
        `student with this id not available!! Enter valid student id`
      );
      return;
    }

    if (!(await marksWorker.checkSubjectExist(m1))) {
      UNAUTHORIZEDERROR(
        ctx,
        `subject with this class not available!! Enter valid Details`
      );
      return;
    }

    if (await marksWorker.checkAlreadyExist(m1)) {
      CONFLICTERROR(ctx, `data already available `);
      return;
    }

    if (marksWorker.addMarkDB(m1)) {
      ctx.status = 200;
      ctx.body = {
        status: `successfully created marks with ${m1.st_id} & ${m1.sub_id}`,
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
    const st_id = ctx.params.st_id;
    const sub_id = ctx.params.sub_id;

    if (
      !sub_id ||
      !st_id ||
      typeof st_id !== "string" ||
      typeof sub_id !== "string"
    ) {
      invalidData(ctx, "Bad input Data");
      return;
    }

    if (!(await marksWorker.checkExist(st_id, sub_id))) {
      UNAUTHORIZEDERROR(ctx, `either subject or student id not available`);
      return;
    }

    const { marks } = ctx.request.body;

    if (await marksWorker.ModifyMarksDB(marks, st_id, sub_id)) {
      ctx.status = 200;
      ctx.body = {
        status: `successfully updated marks with ${st_id} & ${sub_id} with ${marks}`,
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
    const st_id = ctx.params.st_id;
    if (!st_id || typeof st_id !== "string") {
      invalidData(ctx, "Bad input Data");
      return;
    }
    const data = await marksWorker.fetchMarksDB(st_id);
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
    const data = await marksWorker.fetchHighestMarksPerSubjectDB();
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
    const data = await marksWorker.fetchTopBYNumberDB(number);
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
    const data = await marksWorker.fetchTopperPerClassDB();
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    serverERROR(ctx);
  }
};
