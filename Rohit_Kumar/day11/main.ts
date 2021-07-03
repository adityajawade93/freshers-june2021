import { Context } from "vm";
const koarouter = require("@koa/router");
const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");

const fn = require("./sql");

const port = 4000;
let app = new koa();

let router = new koarouter();

interface studentinfo {
  s_id: number;
  s_name: string;
  dob: Date;
  gender: CharacterData;
  slice(a: number, b: number): studentinfo;
}

interface teacherinfo {
  t_id: number;
  t_fname: string;
  t_lname: string;
  gender: CharacterData;
}

interface classesinfo {
  cls_id: number;
  st_id: number;
}

interface subjectinfo {
  sub_id: number;
  sub_name: string;
}

interface class_scheduleinfo {
  classid: number;
  classno: number;
  subj_id: number;
  subj_name: string;
  tch_id: number;
  tch_fname: string;
}

interface classesinfo{
  cls_id: number,
  st_id:number
}

interface resultinfo {
  result_id: number;
  studentid: number;
  clas_id: number;
  subjectid: number;
  marks: number;
}

interface student_details {
  student_id: number;
  fname: string;
}

interface marksinfo {
  subject_id: number;
  subject_name: string;
  marks: number;
}

interface topper {
  s_id: number;
  s_name: string;
  marks: number;
}

router.get("/student", async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: studentinfo }> = [];
    rows = await fn.get_student();

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/teacher", async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: teacherinfo }> = [];
    rows = await fn.get_teacher();

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/classes", async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: classesinfo }> = [];
    rows = await fn.get_classes();

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/subject", async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: subjectinfo }> = [];
    rows = await fn.get_subject();

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/class_schedule", async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: class_scheduleinfo }> = [];
    rows = await fn.get_class_schedule();
    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/result", async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: resultinfo }> = [];
    rows = await fn.get_result();

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/class/:id", async (ctx: Context) => {
  try {
    var id: number = parseInt(ctx.params.id);
    if (id === undefined || typeof id !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let [rows]: Array<{ rows: student_details }> = [];
    rows = await fn.get_student_by_classid(id);
    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/teacher/:id", async (ctx: Context) => {
  try {
    var id: number = parseInt(ctx.url.substring(9));
    if (id === undefined || typeof id !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let [rows]: Array<{ rows: student_details }> = [];
    rows = await fn.get_student_by_teacherid(id);

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/subject/:id", async (ctx: Context) => {
  try {
    var id: number = parseInt(ctx.url.substring(9));
    if (id === undefined || typeof id !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let [rows]: Array<{ rows: student_details }> = [];
    rows = await fn.get_student_by_subjectid(id);
    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/marks/:id", async (ctx: Context) => {
  try {
    var id: number = parseInt(ctx.url.substring(7));
    if (id === undefined || typeof id !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let [rows]: Array<{ rows: marksinfo }> = [];
    rows = await fn.get_subjectmarks_by_studentid(id);
    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/topperclass/:c_id/subject/:sub_id", async (ctx: Context) => {
  try {
    var c_id: number = parseInt(ctx.params.c_id);
    var sub_id: number = parseInt(ctx.params.sub_id);
    if (
      c_id === undefined ||
      typeof c_id !== "number" ||
      sub_id === undefined ||
      typeof sub_id !== "number"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let [rows]: Array<{ rows: topper }> = [];
    rows = await fn.get_topper_by_classid_and_subjectid(c_id,sub_id);

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.get("/topten/:c_id", async (ctx: Context) => {
  try {
    var c_id = parseInt(ctx.params.c_id);
    if (c_id === undefined || typeof c_id !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let [rows]: Array<{ rows: topper }> = [];
    rows = await fn.get_topten_students(c_id);

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.post("/createstudent", async (ctx: Context) => {
  try {
    let req: studentinfo = ctx.request.body;
    if (
      req.s_id === undefined ||
      req.s_name === undefined ||
      req.dob === undefined ||
      req.gender === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (req.s_name.trim() === "") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      typeof req.s_id !== "number" ||
      typeof req.s_name !== "string" ||
      typeof req.dob !== "string" ||
      typeof req.gender !== "string"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    await fn.add_student(req.s_id, req.s_name, req.dob, req.gender);

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in students table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.post("/createteacher", async (ctx: Context) => {
  try {
    let req: teacherinfo = ctx.request.body;
    if (
      req.t_id === undefined ||
      req.t_fname === undefined ||
      req.t_lname === undefined ||
      req.gender === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (req.t_fname.trim() === "" || req.t_lname.trim() === "") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      typeof req.t_id !== "number" ||
      typeof req.t_fname !== "string" ||
      typeof req.t_lname !== "string" ||
      typeof req.gender !== "string"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    await fn.add_teacher(req.t_id, req.t_fname, req.t_lname, req.gender);

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in teacher table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.post("/createclasses", async (ctx: Context) => {
  try {
    let req: classesinfo = ctx.request.body;
    if (
      req.cls_id === undefined ||
      req.st_id === undefined ||
      typeof req.cls_id !== "number" ||
      typeof req.st_id !== "number"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    await fn.add_student_in_class(req.cls_id, req.st_id);

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in classes table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.post("/createsubject", async (ctx: Context) => {
  try {
    let req: subjectinfo = ctx.request.body;
    if (
      req.sub_id === undefined ||
      req.sub_name === undefined ||
      typeof req.sub_id !== "number" ||
      typeof req.sub_name !== "string" ||
      req.sub_name.trim() === ""
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    await fn.add_subject(req.sub_id, req.sub_name);

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in Subject table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.post("/createclass_schedule", async (ctx: Context) => {
  try {
    let req: class_scheduleinfo = ctx.request.body;
    if (
      req.classid === undefined ||
      req.classno === undefined ||
      req.subj_id === undefined ||
      req.subj_name === undefined ||
      req.tch_id === undefined ||
      req.tch_fname === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      typeof req.classid !== "number" ||
      typeof req.classno !== "number" ||
      typeof req.subj_id !== "number" ||
      typeof req.subj_name !== "string" ||
      typeof req.tch_id !== "number" ||
      typeof req.tch_fname !== "string"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (req.subj_name.trim() === "" || req.tch_fname.trim() === "") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    await fn.add_class_schedule(
      req.classid,
      req.classno,
      req.subj_id,
      req.subj_name,
      req.tch_id,
      req.tch_fname
    );

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in Class_schedule table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.post("/createresult", async (ctx: Context) => {
  try {
    let req: resultinfo = ctx.request.body;
    if (
      req.result_id === undefined ||
      req.studentid === undefined ||
      req.clas_id === undefined ||
      req.subjectid === undefined ||
      req.marks === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      typeof req.result_id !== "number" ||
      typeof req.studentid !== "number" ||
      typeof req.clas_id !== "number" ||
      typeof req.subjectid !== "number" ||
      typeof req.marks !== "number"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    await fn.add_result(
      req.result_id,
      req.studentid,
      req.clas_id,
      req.subjectid,
      req.marks
    );

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in result table";
  } catch {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
});

router.put("/updateresult", async (ctx: Context) => {
  try {
    let req: resultinfo = ctx.request.body;
    let [rows]: Array<{ rows: any }> = [];
    if (req.studentid === undefined || req.subjectid === undefined || req.marks === undefined) {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "Bad Request";
      return;
    }


    if (typeof req.studentid !== 'number' || typeof req.subjectid !== 'number' || typeof req.marks !== 'number') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "Bad Request";
      return;
    }
    let flag = 0;
    rows = await fn.check_subject(req.studentid);
    let length = await fn.subject_length(req.studentid);
    for (let i = 0; i < length.rows[0].count; i++) {
      if (req.subjectid === rows.rows[i].subj_id) {
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "This subject is not opted by the student";
      return;
    }


    await fn.update_result(req.studentid, req.subjectid, req.marks);


    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = "marks are updated in result table";
  } catch {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = "internal server error";
    return;
  }
});

app.use(json());
app.use(bodyParser());

app.use(router.routes());
app.use(async (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.type = "text/html";
  ctx.body = "Not Found";
});

app.listen(port, () => {
  console.log("server is running at port " + port);
});
