/* eslint-disable no-console */
export { };

const database = require('../services/resultservices.ts');
const validation = require('../helpers/validation_schema.ts');

async function addMarks(ctx: any) {
  const obj = ctx.request.body;
  const reqBody = await validation.resultSchema.validate(obj);
  if (reqBody.error) {
    ctx.response.status = 422;
    ctx.body = reqBody.error.details[0].message;
    return;
  }
  try {
    const addedMarks = await database.addMarks(obj.studentID, obj.subjectID, obj.marks);
    ctx.response.status = 200;
    ctx.body = {
      msg: 'marks added',
      data: addedMarks,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = `something went wrong in adding marks + ${err}`;
  }
}

async function updateMarks(ctx: any) {
  const obj = ctx.request.body;
  const reqBody = validation.resultSchema.validate(obj);
  if (reqBody.error) {
    ctx.response.status = 422;
    ctx.body = reqBody.error.details[0].message;
    return;
  }
  try {
    const updatedMarks = await database.updateMarks(obj.studentID, obj.subjectID, obj.marks);
    ctx.response.status = 200;
    ctx.body = {
      msg: 'data updated',
      data: updatedMarks,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = `something went wrong in update marks + ${err}`;
  }
}

async function getMarks(ctx: any) {
  try {
    const { Studentid } = ctx.request.params;
    const markslist = await database.getMarks(Studentid);
    ctx.response.status = 200;
    ctx.body = {
      msg: `all subject marks for studentID ${Studentid}`,
      markslist,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = `something went wrong in adding marks + ${err}`;
  }
}

async function getHighestMarksPerSubject(ctx: any) {
  try {
    const { Classid } = ctx.request.params;
    const report = await database.getHighestMarksPerSubject(Classid);
    ctx.response.status = 200;
    ctx.body = {
      data: report,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = `${err}`;
  }
}

async function getToppersMarks(ctx: any) {
  const { Classid } = ctx.request.params;
  const { toplimit } = ctx.request.params;

  try {
    const listoftopten = await database.getToppersMarks(Classid, toplimit);
    ctx.response.status = 200;
    ctx.body = listoftopten;
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = {
      error: `${err}`,
    };
  }
}

module.exports = {
  addMarks,
  updateMarks,
  getMarks,
  getHighestMarksPerSubject,
  getToppersMarks,
};
