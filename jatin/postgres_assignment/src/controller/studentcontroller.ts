/* eslint-disable no-console */
export { };

const uuid = require('uniqid');
const database = require('../services/studentservices.ts');
const validation = require('../helpers/validation_schema.ts');

async function addStudent(ctx: any) {
  const obj = ctx.request.body;
  try {
    const reqBody = await validation.studentSchema.validate(obj);
    console.log(reqBody);
    const id: string = uuid('S');
    const newStudent = await database.addStudent(id, obj.name, obj.gender, obj.phone, obj.classID);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'student added',
      data_added: newStudent,
    };
  } catch (err) {
    if (err.isJoi === true) {
      ctx.response.status = 422;
      console.log('validation error');
    } else {
      ctx.response.status = 400;
      ctx.response.type = 'application/json';
      ctx.body = {
        msg: `something went wrong in adding students ${err}`,
      };
    }
  }
}

async function getStudent(ctx: any) {
  const { page } = ctx.request.query;
  const { size } = ctx.request.query;

  if (Number.isNaN(page) || Number.isNaN(size)) {
    ctx.response.status = 400;
    ctx.body = 'invalid query';
  }

  const totalstudent: number = await database.getStudentCount();
  const totalpages: number = Math.ceil(totalstudent / size);

  if (page < 0 || page >= totalpages) {
    ctx.response.status = 400;
    ctx.body = 'invalid page given';
    return;
  }

  try {
    const allStudent = await database.getStudent(page, size);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'list of all students',
      data: allStudent,
    };
  } catch (err) {
    console.log(err);
    ctx.response.status = 400;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: `can't get all students something wrong ${err}`,
    };
  }
}
async function getStudentFromClassID(ctx: any) {
  try {
    const { Classid } = ctx.request.params;
    console.log('hello');
    const requiredStudent = await database.getStudentFromClassID(Classid);
    ctx.response.status = 200;
    ctx.body = {
      msg: 'required student detail',
      data: requiredStudent,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = {
      error: `something wrong in getting student from class ID + ${err}`,
    };
  }
}

async function getStudentFromSubjectID(ctx: any) {
  try {
    const { Subjectid } = ctx.request.params;
    const requiredStudent = await database.getStudentFromSubjectID(Subjectid);
    ctx.response.status = 200;
    ctx.body = requiredStudent;
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = {
      error: `something went wrong in getting student from subject id +  ${err}`,
    };
  }
}

async function getStudentFromTeacherID(ctx: any) {
  try {
    const { Teacherid } = ctx.request.params;
    const requiredStudent = await database.getStudentFromTeacherID(Teacherid);
    ctx.response.status = 200;
    ctx.body = requiredStudent;
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = {
      error: `something went wrong in getting student from teacher id + ${err}`,
    };
  }
}

module.exports = {
  addStudent,
  getStudent,
  getStudentFromClassID,
  getStudentFromSubjectID,
  getStudentFromTeacherID,
};
