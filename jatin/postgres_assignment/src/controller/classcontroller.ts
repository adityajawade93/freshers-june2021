/* eslint-disable no-console */
export { };

const database = require('../services/classservices.ts');

async function addClass(ctx: any) {
  const obj = ctx.request.body;
  if (obj.classID == null || obj.room == null || obj.subjectID == null) {
    ctx.response.status = 404;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'data missing in class body',
    };
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
    ctx.response.status = 404;
    ctx.body = {
      msg: `something wrong in getting all classes + ${err}`,
    };
  }
}

module.exports = {
  addClass, getClass,
};
