/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable max-len */

const uuid = require('uniqid');
const database = require('../services/teacherservices.ts');

async function addTeacher(ctx: { request: { body: any; }; response: { status: number; type: string; }; body: { msg: string; data_added?: any; }; }) {
  const obj = ctx.request.body;
  if (obj.name == null || obj.sex == null || obj.phone == null || obj.subjectID == null) {
    ctx.response.status = 400;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'data missing in teacher body',
    };
    return;
  }

  try {
    const id = uuid('T');
    const newTeacher = await database.addTeacher(id, obj.name, obj.sex, obj.phone, obj.subjectID);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'teacher added',
      data_added: newTeacher,
    };
  } catch (err) {
    console.log(err);
    ctx.response.status = 400;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: `something went wrong in adding teacher ${err}`,
    };
  }
}

async function getTeacher(ctx: { response: { status: number; }; body: { msg: string; data?: any; }; }) {
  try {
    const allTeachers = await database.getTeacher();
    ctx.response.status = 200;
    ctx.body = {
      msg: 'list of all teachers',
      data: allTeachers,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = {
      msg: `something wrong in getting teachers list + ${err}`,
    };
  }
}

module.exports = {
  addTeacher, getTeacher,
};
