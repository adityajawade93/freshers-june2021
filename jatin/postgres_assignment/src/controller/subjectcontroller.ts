/* eslint-disable no-console */
export { };

const uuid = require('uniqid');
const database = require('../services/subjectservices.ts');
const validation = require('../helpers/validation_schema.ts');

async function addSubject(ctx: any) {
  const obj = ctx.request.body;
  const id = uuid('SUB');
  const reqBody = await validation.subjectSchema.validate(obj);
  if (reqBody.error) {
    ctx.response.status = 422;
    ctx.body = reqBody.error.details[0].message;
    return;
  }
  try {
    const newSubject = await database.addSubject(id, obj.name);
    ctx.response.status = 200;
    ctx.body = {
      msg: 'subject added',
      data: newSubject,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = {
      msg: `something wrong while adding subject + ${err}`,
    };
  }
}

async function getSubject(ctx: any) {
  try {
    ctx.response.status = 200;
    const allSubject = await database.getSubject();
    ctx.body = {
      data: allSubject,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = {
      msg: `something went worng in getting all subjects + ${err}`,
    };
  }
}

module.exports = {
  addSubject, getSubject,
};
