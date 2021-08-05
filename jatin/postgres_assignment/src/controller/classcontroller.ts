/* eslint-disable no-console */
export { };

const database = require('../services/classservices.ts');
const validation = require('../helpers/validation_schema.ts');

async function addClass(ctx: any) {
  const obj = ctx.request.body;
  const reqBody = await validation.classSchema.validate(obj);
  if (reqBody.error) {
    ctx.response.status = 422;
    ctx.body = reqBody.error.details[0].message;
    return;
  }
  try {
    const newclass = await database.addClass(obj.classID, obj.room, obj.subjectID);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'class added',
      data: newclass,
    };
  } catch (err) {
    console.log(err);
    ctx.body = {
      msg: `something wrong  + ${err}`,
    };
  }
}

async function getClass(ctx: any) {
  try {
    ctx.response.status = 200;
    const allClasses = await database.getClass();
    ctx.body = {
      msg: 'list of all classes',
      data: allClasses,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = {
      msg: `something wrong in getting all classes + ${err}`,
    };
  }
}

module.exports = {
  addClass, getClass,
};
