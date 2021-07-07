/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';

import { validStudentToClassRequestData } from '../helper/validation';
import * as classService from '../services/class';
import * as generalService from '../services/general';

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
  const requestData: StudentToClassRequestI = ctx.request.body;
  const validRequestData: boolean = validStudentToClassRequestData(requestData);
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    const student_id: string = requestData.student_id;
    const class_name: string = requestData.class_name.toLowerCase();

    if (!uuidValidate(student_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validStudent: boolean = await checkExistByUniqueKeys('student', ['id'], [student_id]);
    if (!validStudent) {
      ctx.status = 400;
      ctx.body = 'invalid student id';
      return;
    }
    const validClass: boolean = await checkExistByUniqueKeys('class', ['name'], [class_name]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class name';
      return;
    }
    const class_id: string = await classService.getClassId(class_name);

    const duplicate: boolean = await checkExistByUniqueKeys('student_class', ['student_id'], [student_id]);
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'student is already alotted a class';
      return;
    }

    const result: boolean = await generalService.addStudentToClass(student_id, class_id);
    if (result) {
      ctx.body = {
        message: 'added student to class',
      };
    } else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getTopper(ctx: Context) {
  try {
    const class_id: string = ctx.params.class_id;
    const subject_id: string = ctx.params.subject_id;
    if (!uuidValidate(class_id) || !uuidValidate(subject_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['id'], [subject_id]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject id';
      return;
    }

    const validClass: boolean = await checkExistByUniqueKeys('class', ['id'], [class_id]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class id';
      return;
    }

    const topper = await generalService.getTopper(subject_id, class_id);
    ctx.body = {
      data: topper,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

async function reductiveLeaderboard(allClasses: ClassObjI[], result: any[], leaderboardLength: number) {
  try {
    return allClasses.reduce(
      (chain: any, classInfo: ClassObjI) =>
        chain.then(async (value: Record<string, unknown>) => {
          // base condition promise won't have data
          if (value) result.push(value);
          return await generalService.fetchClassLeaderboard(classInfo.id, leaderboardLength);

          // base condition
        }),
      Promise.resolve(),
    );
  } catch (e) {
    throw Error(e);
  }
}

export async function getLeaderboard(ctx: Context) {
  const leaderboardLength = 3;
  try {
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
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}
