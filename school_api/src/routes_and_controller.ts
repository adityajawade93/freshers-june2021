import uuid from "uniqid";
import { Context } from "vm";
import db from "./db/";

interface Student {
  cl_no: number;
  age: number;
  st_id?: string;
  fname: string;
  lname: string;
  sex?: string;
}

interface Teacher {
  age: number;
  fname: string;
  lname: string;
  teacher_id?: string;
  sex?: string;
}

interface Subject {
  sub_id?: string;
  sub_name: string;
  teacher_id: string;
  cl_no: number;
}

interface Mark {
  st_id: string;
  sub_id: string;
  marks: number;
  teacher_id: string;
  cl_no: number;
}

function checkStudent(s1: Student) {
  if (
    !s1.fname ||
    !s1.lname ||
    !s1.age ||
    !s1.cl_no ||
    typeof s1.fname !== "string" ||
    typeof s1.lname !== "string" ||
    typeof s1.age !== "number" ||
    typeof s1.cl_no !== "number" ||
    s1.age <= 0 ||
    s1.age > 110 ||
    !s1.fname.trim() ||
    !s1.lname.trim()
  ) {
    return false;
  }

  if (s1.sex) {
    if (
      s1.sex &&
      s1.sex.length === 1 &&
      (s1.sex === "f" || s1.sex === "F" || s1.sex === "m" || s1.sex === "M")
    ) {
      return true;
    }
    return false;
  }

  return true;
}

function checkTeacher(t1: Teacher) {
  if (
    !t1.fname ||
    !t1.lname ||
    !t1.age ||
    typeof t1.fname !== "string" ||
    typeof t1.lname !== "string" ||
    typeof t1.age !== "number" ||
    t1.age <= 0 ||
    t1.age > 110 ||
    !t1.fname.trim() ||
    !t1.lname.trim()
  ) {
    return false;
  }
  if (t1.sex) {
    if (
      t1.sex &&
      t1.sex.length === 1 &&
      (t1.sex === "f" || t1.sex === "F" || t1.sex === "m" || t1.sex === "M")
    ) {
      return true;
    }
    return false;
  }
  return true;
}

function checkSubject(s1: Subject) {
  if (
    !s1.sub_name ||
    !s1.teacher_id ||
    !s1.cl_no ||
    typeof s1.sub_name !== "string" ||
    typeof s1.teacher_id !== "string" ||
    typeof s1.cl_no !== "number" ||
    s1.cl_no <= 0 ||
    !s1.sub_name.trim() ||
    !s1.teacher_id.trim()
  ) {
    return false;
  }

  return true;
}

function checkMark(m1: Mark) {
  if (
    !m1.sub_id ||
    !m1.teacher_id ||
    !m1.cl_no ||
    !m1.st_id ||
    !m1.marks ||
    typeof m1.sub_id !== "string" ||
    typeof m1.teacher_id !== "string" ||
    typeof m1.st_id !== "string" ||
    typeof m1.cl_no !== "number" ||
    typeof m1.marks !== "number" ||
    m1.marks < 0 ||
    m1.marks > 100 ||
    !m1.sub_id.trim() ||
    !m1.teacher_id.trim()
  ) {
    return false;
  }

  return true;
}
export const createStudent = async (ctx: Context) => {
  try {
    // const { fname, lname, age, cl_no } = ctx.request.body;
    const s1: Student = ctx.request.body;
    if (!checkStudent(s1)) {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input Data`,
      };
      return;
    }
    // console.log("check");
    s1.st_id = uuid();
    const text = "INSERT INTO student VALUES($1,$2,$3,$4,$5,$6)";
    const values = [
      s1.st_id,
      s1.fname.trim(),
      s1.lname.trim(),
      s1.age,
      s1.cl_no,
      s1.sex,
    ];
    await db.query(text, values);
    ctx.status = 200;
    ctx.body = {
      status: `successfully created student with ${s1.st_id}`,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const createTeacher = async (ctx: Context) => {
  try {
    // const { fname, lname, age } = ctx.request.body;
    const t1: Teacher = ctx.request.body;
    if (!checkTeacher(t1)) {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input Data`,
      };
      return;
    }
    t1.teacher_id = uuid();
    const text = "INSERT INTO teacher VALUES($1,$2,$3,$4,$5)";
    const values = [
      t1.teacher_id,
      t1.fname.trim(),
      t1.lname.trim(),
      t1.age,
      t1.sex,
    ];
    await db.query(text, values);
    ctx.status = 200;
    ctx.body = {
      status: `successfully created teacher with ${t1.teacher_id}`,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const createSubject = async (ctx: Context) => {
  try {
    // const { sub_name, cl_no, teacher_id } = ctx.request.body;
    const s1: Subject = ctx.request.body;
    if (!checkSubject(s1)) {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input Data`,
      };
      return;
    }

    const text4 = "select * from teacher where teacher_id =$1";
    const values4 = [s1.teacher_id.trim()];

    const check_teacher = await db.query(text4, values4);
    if (check_teacher.rows.length === 0) {
      ctx.status = 401;
      ctx.body = {
        status: `Teacher with this id not available!! Enter valid teacher id`,
      };
      return;
    }

    const text5 = "select * from subject where cl_no=$1 and sub_name=$2";
    const values5 = [s1.cl_no, s1.sub_name.trim()];

    const check_already_exist = await db.query(text5, values5);
    if (check_already_exist.rows.length > 0) {
      ctx.status = 400;
      ctx.body = {
        status: `subject already exist in this class`,
      };
      return;
    }

    s1.sub_id = uuid();
    const text = "INSERT INTO subject VALUES($1,$2,$3,$4)";
    const values = [
      s1.sub_id,
      s1.sub_name.trim(),
      s1.cl_no,
      s1.teacher_id.trim(),
    ];
    await db.query(text, values);
    const text2 = "INSERT INTO teaches VALUES($1,$2)";
    const values2 = [s1.teacher_id.trim(), s1.sub_id.trim()];
    await db.query(text2, values2);
    const text3 = "INSERT INTO classes VALUES($1,$2,$3)";
    const values3 = [s1.cl_no, s1.sub_id.trim(), s1.teacher_id.trim()];
    await db.query(text3, values3);

    ctx.status = 200;
    ctx.body = {
      status: `successfully created subject with ${s1.sub_id}`,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const createMarks = async (ctx: Context) => {
  try {
    // const { st_id, sub_id, marks, teacher_id, cl_no } = ctx.request.body;
    const m1: Mark = ctx.request.body;
    if (!checkMark(m1)) {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input Data`,
      };
      return;
    }

    const text4 = "select * from student where st_id =$1";
    const values4 = [m1.st_id.trim()];
    const check_student = await db.query(text4, values4);
    if (check_student.rows.length === 0) {
      ctx.status = 401;
      ctx.body = {
        status: `student with this id not available!! Enter valid student id`,
      };
      return;
    }

    const text5 =
      "select * from classes where cl_no =$1 and sub_id =$2 and teacher_id =$3";
    const values5 = [m1.cl_no, m1.sub_id.trim(), m1.teacher_id.trim()];
    const check_subject_cl = await db.query(text5, values5);
    if (check_subject_cl.rows.length === 0) {
      ctx.status = 401;
      ctx.body = {
        status: `subject with this class not available!! Enter valid Details`,
      };
      return;
    }
    const text6 =
      "select * from marks where cl_no =$1 and sub_id =$2 and teacher_id =$3";
    const values6 = [m1.cl_no, m1.sub_id.trim(), m1.teacher_id.trim()];
    const check_already_exist = await db.query(text6, values6);

    if (check_already_exist.rows.length > 0) {
      ctx.status = 200;
      ctx.body = {
        status: `data already available `,
      };
      return;
    }

    const text = "INSERT INTO marks VALUES($1,$2,$3,$4,$5)";
    const values = [
      m1.st_id.trim(),
      m1.sub_id.trim(),
      m1.marks,
      m1.teacher_id.trim(),
      m1.cl_no,
    ];
    await db.query(text, values);
    ctx.status = 200;
    ctx.body = {
      status: `successfully created marks with ${m1.st_id} & ${m1.sub_id}`,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

//modify

export const modifyStudent = async (ctx: Context) => {
  try {
    const st_id = ctx.params.st_id;
    if (!st_id || typeof st_id !== "string") {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input`,
      };
      return;
    }
    const res = await db.query("select * from student where st_id =$1", [
      st_id,
    ]);

    if (res.rows.length === 0) {
      ctx.status = 400;
      ctx.body = {
        status: `student with this id not found`,
      };
      return;
    }
    const { fname, lname, age, cl_no } = ctx.request.body;

    if (fname && typeof fname === "string") {
      await db.query("update student set fname=$1 where st_id=$2", [
        fname.trim(),
        st_id,
      ]);
    }

    if (lname && typeof lname === "string") {
      await db.query("update student set lname=$1 where st_id=$2", [
        lname.trim(),
        st_id,
      ]);
    }

    if (age && typeof age === "number") {
      await db.query("update student set age=$1 where st_id=$2", [age, st_id]);
    }

    if (cl_no && typeof cl_no === "number") {
      await db.query("update student set cl_no=$1 where st_id=$2", [
        cl_no,
        st_id,
      ]);
    }

    ctx.status = 200;
    ctx.body = {
      status: `successfully updated student with ${st_id}`,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const modifyTeacher = async (ctx: Context) => {
  try {
    const teacher_id = ctx.params.teacher_id;
    if (!teacher_id || typeof teacher_id !== "string") {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input`,
      };
      return;
    }
    const res = await db.query("select * from teacher where teacher_id =$1", [
      teacher_id,
    ]);

    if (res.rows.length === 0) {
      ctx.status = 400;
      ctx.body = {
        status: `teacher with this id not found`,
      };
      return;
    }
    const { fname, lname, age } = ctx.request.body;

    if (fname && typeof fname === "string") {
      await db.query("update teacher set fname=$1 where teacher_id=$2", [
        fname.trim(),
        teacher_id,
      ]);
    }

    if (lname && typeof lname === "string") {
      await db.query("update teacher set lname=$1 where teacher_id=$2", [
        lname.trim(),
        teacher_id,
      ]);
    }

    if (age && typeof age === "number") {
      await db.query("update teacher set age=$1 where teacher_id=$2", [
        age,
        teacher_id,
      ]);
    }

    ctx.status = 200;
    ctx.body = {
      status: `successfully updated teacher with ${teacher_id}`,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const modifyMarks = async (ctx: Context) => {
  try {
    const st_id = ctx.params.st_id;
    const sub_id = ctx.params.sub_id;

    if (
      !sub_id ||
      !st_id ||
      typeof st_id !== "string" ||
      typeof sub_id !== "string"
    ) {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input`,
      };
      return;
    }
    const res = await db.query(
      "select * from marks where st_id =$1 and sub_id=$2",
      [st_id.trim(), sub_id.trim()]
    );

    if (res.rows.length === 0) {
      ctx.status = 401;
      ctx.body = {
        status: `either subject or student id not available`,
      };
      return;
    }
    const { marks } = ctx.request.body;

    if (marks && typeof marks === "number") {
      await db.query(
        "update marks set marks=$1 where st_id =$2 and sub_id=$3",
        [marks, st_id.trim(), sub_id.trim()]
      );
    }

    ctx.status = 200;
    ctx.body = {
      status: `successfully updated marks with ${st_id} & ${sub_id} with ${marks}`,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const getStudents = async (ctx: Context) => {
  try {
    let page = ctx.query.page;
    let size = ctx.query.size;

    if (!page || !size || isNaN(page) || isNaN(size)) {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input`,
      };
      return;
    }

    page = Number(page);
    size = Number(size);

    let student_table_sizee = await db.query("SELECT count(*) from student");
    let student_table_size = student_table_sizee.rows[0].count;
    // console.log(daba);
    const max_page_limit: number = Math.ceil(student_table_size / size);
    // console.log(total_no_details, max_page_limit);
    const max_size_limit = 500;

    if (
      page <= 0 ||
      page > max_page_limit ||
      size < 0 ||
      size > max_size_limit
    ) {
      ctx.status = 404;
      ctx.message = "NOT FOUND!!";
      ctx.type = "text/html";
      ctx.body = {
        msg: "Page NOT FOUND!!",
        status: "fail",
      };

      return;
    }

    const start_index = (page - 1) * size;
    const end_index = Math.min(page * size, student_table_size);
    const req_size = end_index - start_index;
    const data = await db.query("SELECT * from student offset $1 limit $2", [
      start_index,
      req_size,
    ]);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const getTeachers = async (ctx: Context) => {
  try {
    let page = ctx.query.page;
    let size = ctx.query.size;

    if (!page || !size || isNaN(page) || isNaN(size)) {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input`,
      };
      return;
    }

    page = Number(page);
    size = Number(size);

    let teacher_table_sizee = await db.query("SELECT count(*) from teacher");
    let teacher_table_size: number = teacher_table_sizee.rows[0].count;
    // console.log(daba);
    const max_page_limit = Math.ceil(teacher_table_size / size);
    // console.log(total_no_details, max_page_limit);
    const max_size_limit = 500;

    if (
      page <= 0 ||
      page > max_page_limit ||
      size < 0 ||
      size > max_size_limit
    ) {
      ctx.status = 404;
      ctx.message = "NOT FOUND!!";
      ctx.type = "text/html";
      ctx.body = {
        msg: "Page NOT FOUND!!",
        status: "fail",
      };

      return;
    }

    const start_index = (page - 1) * size;
    const end_index = Math.min(page * size, teacher_table_size);
    const req_size = end_index - start_index;
    const data = await db.query("SELECT * from teacher offset $1 limit $2", [
      start_index,
      req_size,
    ]);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const getTeachersTeaching = async (ctx: Context) => {
  try {
    let page = ctx.query.page;
    let size = ctx.query.size;

    if (!page || !size || isNaN(page) || isNaN(size)) {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input`,
      };
      return;
    }

    page = Number(page);
    size = Number(size);

    let teacher_table_sizee = await db.query("SELECT count(*) from teacher");
    let teacher_table_size = teacher_table_sizee.rows[0].count;
    // console.log(daba);
    const max_page_limit = Math.ceil(teacher_table_size / size);
    // console.log(total_no_details, max_page_limit);
    const max_size_limit = 500;

    if (
      page <= 0 ||
      page > max_page_limit ||
      size < 0 ||
      size > max_size_limit
    ) {
      ctx.status = 404;
      ctx.message = "NOT FOUND!!";
      ctx.type = "text/html";
      ctx.body = {
        msg: "Page NOT FOUND!!",
        status: "fail",
      };

      return;
    }

    const start_index = (page - 1) * size;
    const end_index = Math.min(page * size, teacher_table_size);
    const req_size = end_index - start_index;

    const data = await db.query(
      "select t1.teacher_id,t1.fname,t1.lname,t1.age,t2.sub_name,t2.cl_no FROM teacher as t1 inner join subject as t2 on t1.teacher_id=t2.teacher_id offset $1 limit $2",
      [start_index, req_size]
    );

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const getClasses = async (ctx: Context) => {
  try {
    const data = await db.query(
      "select c.cl_no,c.sub_id,c.teacher_id,t.fname,t.lname,s.sub_name from classes as c inner join teacher as t on c.teacher_id=t.teacher_id inner join subject as s on s.sub_id=c.sub_id order by c.cl_no"
    );

    const data2 = await db.query("select distinct cl_no as class from student");
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: [data2.rows, data.rows],
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const getSchedule = async (ctx: Context) => {
  try {
    const data =
      await db.query(`select c.cl_no as class_no,s1.sub_id,s1.sub_name as subject_name,t1.teacher_id,concat(t1.fname,' ',t1.lname) as teacher_name 
    from classes as c
    inner join subject as s1
    on s1.sub_id=c.sub_id
    inner join teacher as t1
    on t1.teacher_id=c.teacher_id
    order by class_no`);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const getSubject = async (ctx: Context) => {
  try {
    const data = await db.query("select * from subject");

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = {
      status: `Internal Server Error`,
    };
  }
};

export const fetchStudentsWithClass = async (ctx: Context) => {
  try {
    const cl_id = ctx.params.cl_id;
    if (!cl_id || typeof cl_id !== "string") {
      ctx.status = 400;
      ctx.body = {
        status: `Bad Data`,
      };
      return;
    }

    const data = await db.query("select * from student where cl_no=$1", [
      cl_id,
    ]);

    if (data.rows.length === 0) {
      ctx.status = 404;
      ctx.body = {
        status: `id not found`,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const fetchStudentsWithTeacher = async (ctx: Context) => {
  try {
    const teacher_id = ctx.params.teacher_id;
    if (!teacher_id || typeof teacher_id !== "string") {
      ctx.status = 400;
      ctx.body = {
        status: `Bad Data`,
      };
      return;
    }

    const data = await db.query(
      "select s1.st_id,s1.fname,s1.lname,s1.age,s1.cl_no from student as s1 where s1.cl_no in (select distinct cl_no from subject as sub where teacher_id=$1",
      [teacher_id]
    );

    if (data.rows.length === 0) {
      ctx.status = 404;
      ctx.body = {
        status: `id not found`,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const fetchStudentsWithSub = async (ctx: Context) => {
  try {
    const sub_id = ctx.params.sub_id;
    if (!sub_id || typeof sub_id !== "string") {
      ctx.status = 400;
      ctx.body = {
        status: `Bad Data`,
      };
      return;
    }
    const data = await db.query(
      "select s1.fname,s1.lname,s1.cl_no,s1.age,sub.sub_id,sub.sub_name from subject as sub,student as s1 where sub.sub_id=$1 and sub.cl_no=s1.cl_no",
      [sub_id.trim()]
    );
    if (data.rows.length === 0) {
      ctx.status = 404;
      ctx.body = {
        status: `id not found`,
      };
      return;
    }
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 500;
    ctx.body = {
      status: `Internal Server error`,
    };
  }
};

export const fetchMarks = async (ctx: Context) => {
  try {
    const st_id = ctx.params.st_id;
    if (!st_id || typeof st_id !== "string") {
      ctx.status = 400;
      ctx.body = {
        status: `Bad Data`,
      };
      return;
    }
    const data = await db.query(
      "select s.fname,s.lname,s.cl_no,m1.marks from marks as m1,student as s where m1.st_id=$1 and s.st_id= m1.st_id",
      [st_id.trim()]
    );
    if (data.rows.length === 0) {
      ctx.status = 404;
      ctx.body = {
        status: `id not found`,
      };
      return;
    }
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const fetchHighestMarksPerSubject = async (ctx: Context) => {
  try {
    const data = await db.query(
      "select concat(s1.fname,' ',s1.lname)as student_name,s1.age as student_age,s1.cl_no as class_no,maxa.sub_id,sub1.sub_name,maxa.marks as highest_marks,maxa.teacher_id,concat(t1.fname,' ',t1.lname) as teacher_name from student as s1 inner join (select m.st_id,m.sub_id,m.marks,m.cl_no,m.teacher_id from marks as m inner join ( select MAX(marks) as maximum,(sub_id) from marks  group by sub_id order by sub_id )maxmarks on maxmarks.maximum=m.marks)maxa on maxa.st_id=s1.st_id inner join subject as sub1 on maxa.sub_id=sub1.sub_id inner join teacher as t1 on t1.teacher_id=maxa.teacher_id order by highest_marks desc"
    );

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const fetchTopTen = async (ctx: Context) => {
  try {
    const data = await db.query(
      "select s1.st_id as student_id,Concat(s1.fname,' ',s1.lname)as student_name,s1.age as student_age,s1.cl_no as class_no,total.total_marks from student as s1 inner join (select st_id,sum(marks)as total_marks  from marks group by st_id limit 10)total on total.st_id=s1.st_id order by total.total_marks desc"
    );

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};

export const fetchTopperPerClass = async (ctx: Context) => {
  try {
    const data =
      await db.query(`select maxa3.class_no,maxa3.highest_marks,maxa3.student_id,concat(fname,' ',lname)as student_name,age as student_age
    from student
    inner join
    (select maxa2.class_no,maxa2.maximum as highest_marks,first_table.student_id as student_id from
    (select sum(marks) as total_sum,cl_no as class_no,st_id as student_id
    from marks
    group by st_id,cl_no)as first_table
    inner join
    (select max(maxa.total_sum) as maximum,maxa.class_no
    from (select sum(marks) as total_sum,cl_no as class_no,st_id as student_id
    from marks
    group by st_id,cl_no)as maxa
    group by maxa.class_no)as maxa2
    on maxa2.maximum=first_table.total_sum)as maxa3
    on maxa3.student_id=st_id
    order by maxa3.highest_marks desc`);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data.rows,
    };
  } catch (err) {
    console.log(err);

    ctx.status = 400;
    ctx.body = {
      status: `Bad Data`,
    };
  }
};
