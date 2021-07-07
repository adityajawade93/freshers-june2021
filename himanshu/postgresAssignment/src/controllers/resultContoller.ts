const resultServices = require('../services/resultServices.ts');

exports.addMarks = async (ctx :any) => {
  const object = ctx.request.body;
  if (object.studentId == null || object.subjectId == null || object.marks == null) {
    ctx.response.status = 400;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'Data missing',
    };
    return;
  }
  try {
    const checkSubject = await resultServices.checkSubject(object.studentId, object.subjectId);
    if (checkSubject === false) {
      ctx.response.status = 400;
      ctx.response.type = 'application/json';
      ctx.body = {
        msg: 'Subject not found related to student',
      };
      return;
    }
    await resultServices.addMarks(object.studentId, object.subjectId, object.marks);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'Marks added',
    };
  } catch (e) {
    console.log(e.stack);
    ctx.response.status = 500;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'something wrong happens',
    };
  }
};

exports.updateMarks = async (ctx :any) => {
  const object = ctx.request.body;
  if (object.studentId == null || object.subjectId == null || object.marks == null) {
    ctx.response.status = 400;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'Data missing',
    };
    return;
  }
  try {
    const checkSubject = await resultServices.checkSubject(object.studentId, object.subjectId);
    if (checkSubject === false) {
      ctx.response.status = 400;
      ctx.response.type = 'application/json';
      ctx.body = {
        msg: 'Subject not found related to student',
      };
      return;
    }
    await resultServices.updateMarks(object.studentId, object.subjectId, object.marks);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'Marks Updated',
    };
  } catch (e) {
    console.log(e.stack);
    ctx.response.status = 500;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'something wrong happens',
    };
  }
};

exports.getMarksByStudentId = async (ctx : any) => {
  const { studentId } = ctx.request.params;
  if (studentId == null || studentId === undefined) {
    ctx.response.status = 400;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'Invalid classId',
    };
    return;
  }
  try {
    const marksData = await resultServices.getMarks(studentId);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = marksData;
  } catch (e) {
    console.log(e.stack);
    ctx.response.status = 500;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'something wrong happens',
    };
  }
};

exports.getHighestMarksPerSubject = async (ctx : any) => {
  const { classId } = ctx.request.params;
  if (classId == null || classId === undefined) {
    ctx.response.status = 400;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'Invalid classId',
    };
    return;
  }
  try {
    const marksData = await resultServices.getHighestMarksPerSubject(classId);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = marksData;
  } catch (e) {
    console.log(e.stack);
    ctx.response.status = 500;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'something wrong happens',
    };
  }
};

exports.getleaderboard = async (ctx : any) => {
  const { classId } = ctx.request.params;
  const { count } = ctx.request.params;
  if (classId == null || classId === undefined) {
    ctx.response.status = 400;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'Invalid classId',
    };
    return;
  }
  if (count == null || count === undefined || Number.isNaN(count)) {
    ctx.response.status = 400;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'Invalid count',
    };
    return;
  }
  try {
    const marksData = await resultServices.getTop10Marks(classId, count);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = marksData;
  } catch (e) {
    console.log(e.stack);
    ctx.response.status = 500;
    ctx.response.type = 'application/json';
    ctx.body = {
      msg: 'something wrong happens',
    };
  }
};
