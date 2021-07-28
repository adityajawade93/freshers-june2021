/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';

import { validStudentToClassRequestData } from '../helper/validation';
import { reductiveLeaderboard } from '../helper/general';
import * as classService from '../services/class';
import * as generalService from '../services/general';
import { CError } from '../CustomError/index';

interface ClassObjI {
  name: string;
  id: string;
}

interface StudentToClassRequestI {
  student_id?: any;
  class_name?: any;
}

interface ClassLeaderboardI {
  [key: string]: Record<string, unknown>;
}

export async function addStudentToClass(ctx: Context) {
  try {
    const requestData: StudentToClassRequestI = ctx.request.body;
    const validRequestData: boolean = validStudentToClassRequestData(requestData);
    if (!validRequestData) throw new CError('invalid input data', 422);

    const student_id: string = requestData.student_id;
    const class_name: string = requestData.class_name.toLowerCase();
    const class_id: string = await classService.getClassId(class_name);

    await generalService.addStudentToClass(student_id, class_id);
    ctx.body = {
      message: `added student with ${student_id} to class`,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function getTopper(ctx: Context) {
  try {
    const class_id: string = ctx.params.class_id;
    const subject_id: string = ctx.params.subject_id;
    const topper = await generalService.getTopper(subject_id, class_id);
    ctx.body = {
      data: topper,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function getLeaderboard(ctx: Context) {
  try {
    const defaultleaderboardLength = 10;
    const leaderboardLength = ctx.request.query.limit ? ctx.request.query.limit : defaultleaderboardLength;
    const allClasses: ClassObjI[] = await classService.getClasses();

    const combinedleaderboard: ClassLeaderboardI = {};
    const tempResult: any[] = [];

    const tailResult = await reductiveLeaderboard(allClasses, tempResult, leaderboardLength);
    tempResult.push(tailResult);

    for (let index = 0; index < allClasses.length; index++) {
      const classInfo: ClassObjI = allClasses[index];
      combinedleaderboard[classInfo.name] = tempResult[index];
    }
    ctx.body = {
      data: combinedleaderboard,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}
