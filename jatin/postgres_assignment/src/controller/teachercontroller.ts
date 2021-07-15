/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable max-len */
export { };

const uuid = require('uniqid');
const database = require('../services/teacherservices.ts');
const validation = require('../helpers/validation_schema.ts');

async function addTeacher(ctx: { request: { body: any; }; response: { status: number; type: string; }; body: { msg: string; data_added?: any; }; }) {
  const obj = ctx.request.body;
  try {
    const req_body = await validation.teacherSchema.validate(obj);
    console.log(req_body);
    const id = uuid('T');
    const newTeacher = await database.addTeacher(id, obj.name, obj.sex, obj.phone, obj.subjectID);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'teacher added',
      data_added: newTeacher,
    };
  } catch (err) {
    if (err.isJoi === true) {
      ctx.response.status = 422;
    } else {
      ctx.response.status = 400;
      ctx.response.type = 'application/json';
      ctx.body = {
        msg: `something went wrong in adding teacher ${err}`,
      };
    }
    console.log(err);
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
