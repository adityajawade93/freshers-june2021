import { Context } from "vm";
import { 
  query as dbQuery,
  checkExistByUniqueKeys,
  setPath as dbSetPath
} from '../database/index';
import uuidValidate from 'uuid-validate';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from "pg";

interface PersonRequestI {
  name?: any, sex? :any, age?: any
}

interface SubjectRequestI {
  name?: any
}

interface ClassRequestI {
  name?: any
}

interface ClassObjI {
  name: string, id: string
}

interface ScheduleRequestI {
  subject_name?: any, class_name?: any, teacher_id?: any
}

interface StudentToClassRequestI {
  student_id?: any, class_name?: any
}

interface MarkRequestI {
  student_id?: any, subject_name?: any, marks?: any
}

interface ClassLeaderboardI {
  [key: string]: object []
}

interface PaginationBoundaryI { 
  offset: number, limit: number 
}

// helper functions ---------------------------------------------------------

function getGenderNotation(gender: any) {
  if (!gender || typeof gender !== 'string' || !gender.trim() || !['male', 'female'].includes(gender.toLowerCase()))
    return null;
  if (gender.toLowerCase() === 'male') return 'M';
  return 'F';
}

function validStudentToClassRequestData(data: StudentToClassRequestI) {
  if (!data || !data.student_id || !data.class_name) return false;
  if ( (typeof data.student_id !== 'string' || !data.student_id.trim())
    || (typeof data.class_name !== 'string' || !data.class_name.trim())
  ) return false;
  return true;
}

function validPersonRequestData(data: PersonRequestI) {
  if (!data) return false;
  if ( (data.name && (typeof data.name !== 'string' || !data.name.trim()))
    || (data.sex && (typeof data.sex !== 'string' || !data.sex.trim() || !['male', 'female'].includes(data.sex.toLowerCase())))
    || (data.age && (typeof data.age !== 'number' || data.age <= 0))
  ) return false;
  return true;
}

function validSubjectRequestData(data: SubjectRequestI) {
  if (!data) return false;
  if (data.name && (typeof data.name !== 'string' || !data.name.trim())) return false;
  return true;
}

function validClassRequestData(data: SubjectRequestI) {
  if (!data) return false;
  if (data.name && (typeof data.name !== 'string' || !data.name.trim())) return false;
  return true;
}

function validScheduleRequestData(data: ScheduleRequestI) {
  if (!data) return false;
  if ( (data.subject_name && (typeof data.subject_name !== 'string' || !data.subject_name.trim()))
    || (data.class_name && (typeof data.class_name !== 'string' || !data.class_name.trim()))
    || (data.teacher_id && (typeof data.teacher_id !== 'string' || !data.teacher_id.trim()))
  ) return false;
  return true;
}

function validMarkRequestData(data: MarkRequestI) {
  if (!data) return false;
  if ( (data.subject_name && (typeof data.subject_name !== 'string' || !data.subject_name.trim()))
    || (data.student_id && (typeof data.student_id !== 'string' || !data.student_id.trim()))
    || (data.marks && (typeof data.marks !== 'number' || data.marks <= 0))
  ) return false;
  return true;
}

function isDataFetchable(page: number, size: number, total: number) {
  if (total === 0 || size <= 0) return false;
  const totalPages: number = Math.ceil(total/size);
  
  // page: [0, totalPages)
  return (page >= 0 && page < totalPages); 
}

function pagenation(page: number, size: number, total: number) {
  // default value
  let offset: number = 0;
  let limit: number = 0;

  if (isDataFetchable(page, size, total)) {
    offset = page * size;
    limit = size;
  };

  return {offset, limit}
}

function validQueryParams(query: { page?: string, size?: string } | null) {
  interface ResultI { 
    page: number, size: number
  }
  const result: ResultI = {
    page: -1, size: -1,
  };

  if (query) {
    if (query.page) {
      const page: number = parseInt(query.page, 10);
      if (!isNaN(page) && page >= 0) result.page = page;
    }
    if (query.size) {
      const size: number = parseInt(query.size, 10);
      if (!isNaN(size) && size > 0) result.size = size;
    }
  }
  return result;
}

// controllers ---------------------------------------------------------

// addStudent ---------------------------------------------------------
export async function addStudent(ctx: Context) {
  const requestData: PersonRequestI = ctx.request.body;
  const validRequestData: boolean = (validPersonRequestData(requestData) && requestData.name);
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const id: string = uuidv4();
    const name: string = requestData.name.trim();
    const sex: string | null = requestData.sex? getGenderNotation(requestData.sex) : null; 
    const age: number | null = requestData.age? requestData.age : null;
    
    const query: string = 'insert into student (id, name, sex, age) values ($1, $2, $3, $4)';
    const result: QueryResult<any> = await dbQuery(query, [id, name, sex, age]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: `student with id: ${id} created`,
      }
    }
    else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// addStudentToClass ---------------------------------------------------------
export async function addStudentToClass(ctx: Context) {
  const requestData: StudentToClassRequestI = ctx.request.body;
  const validRequestData: boolean = validStudentToClassRequestData(requestData);
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const student_id: string = requestData.student_id;
    const class_name: string = requestData.class_name.toLowerCase();
    
    if (!uuidValidate(student_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validStudent: boolean = await checkExistByUniqueKeys('student', ['id'], [student_id]);
    if (!validStudent) {
      ctx.status = 400;
      ctx.body = 'invalid student id';
      return;
    }
    const validClass: boolean = await checkExistByUniqueKeys('class', ['name'], [class_name]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class name';
      return;
    }
    // note that the class is valid
    const classResult: QueryResult<any> = await dbQuery('select id from class where name = $1', [class_name]);
    const class_id: string = classResult.rows[0].id;

    const duplicate: boolean = await checkExistByUniqueKeys(
      'student_class', ['student_id'], [student_id]
    );
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'student is already alotted a class';
      return;
    }

    const query: string = 'insert into student_class (student_id, class_id) values ($1, $2)';
    const result: QueryResult<any> = await dbQuery(query, [student_id, class_id]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: 'added student to class',
      }
    }
    else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// addTeacher ---------------------------------------------------------
export async function addTeacher(ctx: Context) {
  const requestData: PersonRequestI = ctx.request.body;
  const validRequestData: boolean = (validPersonRequestData(requestData) && requestData.name);
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const id: string = uuidv4();
    const name: string = requestData.name.trim();
    const sex: string | null = requestData.sex? getGenderNotation(requestData.sex) : null; 
    const age: number = requestData.age? requestData.age : null;
    
    const query: string = 'insert into teacher (id, name, sex, age) values ($1, $2, $3, $4)';
    const result: QueryResult<any> = await dbQuery(query, [id, name, sex, age]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: `teacher with id: ${id} created`,
      }
    }
    else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// addSubject ---------------------------------------------------------
export async function addSubject(ctx: Context) {
  const requestData: SubjectRequestI = ctx.request.body;
  const validRequestData: boolean = (validSubjectRequestData(requestData) && requestData.name);
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const id: string = uuidv4();
    const name: string = requestData.name.toLowerCase();

    const duplicate: boolean = await checkExistByUniqueKeys('subject', ['name'], [name]);
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }
    const query: string = 'insert into subject (id, name) values ($1, $2)';
    const result: QueryResult<any> = await dbQuery(query, [id, name]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: `subject with id: ${id} created`,
      }
    }
    else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// addClass ---------------------------------------------------------
export async function addClass(ctx: Context) {
  const requestData: ClassRequestI = ctx.request.body;
  const validRequestData: boolean = (validClassRequestData(requestData) && requestData.name);
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const id: string = uuidv4();
    const name: string = requestData.name.toLowerCase();

    const duplicate: boolean = await checkExistByUniqueKeys('class', ['name'], [name]);
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }
    const query: string = 'insert into class (id, name) values ($1, $2)';
    const result: QueryResult<any> = await dbQuery(query, [id, name]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: `class with id: ${id} created`,
      }
    }
    else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// addSchedule ---------------------------------------------------------
export async function addSchedule(ctx: Context) {
  const requestData: ScheduleRequestI = ctx.request.body;
  const validRequestData: boolean = (
    validScheduleRequestData(requestData)
    && requestData.subject_name
    && requestData.class_name
    && requestData.teacher_id
  );
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const subject_name: string = requestData.subject_name.toLowerCase();
    const class_name: string = requestData.class_name.toLowerCase();
    const teacher_id: string = requestData.teacher_id;
    if (!uuidValidate(teacher_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['name'], [subject_name]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject name';
      return;
    }
    const validClass: boolean = await checkExistByUniqueKeys('class', ['name'], [class_name]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class name';
      return;
    }
    const validTeacher: boolean = await checkExistByUniqueKeys('teacher', ['id'], [teacher_id]);
    if (!validTeacher) {
      ctx.status = 400;
      ctx.body = 'invalid teacher id';
      return;
    }
    // note that the class, subject is valid
    const classResult: QueryResult<any> = await dbQuery('select id from class where name = $1', [class_name]);
    const class_id: string = classResult.rows[0].id;
    const subjectResult: QueryResult<any> = await dbQuery('select id from subject where name = $1', [subject_name]);
    const subject_id: string = subjectResult.rows[0].id;

    const duplicate: boolean = await checkExistByUniqueKeys(
      'schedule', ['subject_id', 'class_id', 'teacher_id'], [subject_id, class_id, teacher_id]
    );
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }
    const query: string = 'insert into schedule (subject_id, class_id, teacher_id) values ($1, $2, $3)';
    const result: QueryResult<any> = await dbQuery(query, [subject_id, class_id, teacher_id]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: 'added schedule',
      }
    }
    else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// addMarks ---------------------------------------------------------
export async function addMarks(ctx: Context) {
  const requestData: MarkRequestI = ctx.request.body;
  const validRequestData: boolean = (
    validMarkRequestData(requestData)
    && requestData.student_id
    && requestData.subject_name
    && requestData.marks
  );
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const student_id: string = requestData.student_id;
    const subject_name: string = requestData.subject_name.toLowerCase();
    const marks: number = requestData.marks;
    if (!uuidValidate(student_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['name'], [subject_name]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject name';
      return;
    }
    const validStudent: boolean = await checkExistByUniqueKeys('student', ['id'], [student_id]);
    if (!validStudent) {
      ctx.status = 400;
      ctx.body = 'invalid student id';
      return;
    }
    // note that the subject is valid
    const subjectResult: QueryResult<any> = await dbQuery('select id from subject where name = $1', [subject_name]);
    const subject_id: string = subjectResult.rows[0].id;

    const duplicate: boolean = await checkExistByUniqueKeys(
      'mark', ['student_id', 'subject_id'], [student_id, subject_id]
    );
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }
    const query: string = 'insert into mark (student_id, subject_id, marks) values ($1, $2, $3)';
    const result: QueryResult<any> = await dbQuery(query, [student_id, subject_id, marks]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: 'added the student result',
      }
    }
    else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// updateMarks ---------------------------------------------------------
export async function updateMarks(ctx: Context) {
  const requestData: MarkRequestI = ctx.request.body;
  const validRequestData: boolean = (
    validMarkRequestData(requestData)
    && requestData.student_id
    && requestData.subject_name
    && requestData.marks
  );
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const student_id: string = requestData.student_id;
    const subject_name: string = requestData.subject_name.toLowerCase();
    const marks: number = requestData.marks;
    if (!uuidValidate(student_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['name'], [subject_name]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject name';
      return;
    }
    const validStudent: boolean = await checkExistByUniqueKeys('student', ['id'], [student_id]);
    if (!validStudent) {
      ctx.status = 400;
      ctx.body = 'invalid student id';
      return;
    }
    // note that the subject is valid
    const subjectResult: QueryResult<any> = await dbQuery('select id from subject where name = $1', [subject_name]);
    const subject_id: string = subjectResult.rows[0].id;

    const entryExists: boolean = await checkExistByUniqueKeys(
      'mark', ['student_id', 'subject_id'], [student_id, subject_id]
    );
    if (!entryExists) {
      ctx.status = 400;
      ctx.body = "entry doesn't exists";
      return;
    }
    const query: string = 'update mark set marks = $1 where student_id = $2 and subject_id = $3';
    const result: QueryResult<any> = await dbQuery(query, [marks, student_id, subject_id]);
    if (result && result.command === 'UPDATE') {
      ctx.body = {
        message: 'updated the student result',
      }
    }
    else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getStudents ---------------------------------------------------------
export async function getStudents(ctx: Context) {
  try {
    await dbSetPath();
    const paramsData: { page: number, size: number } = validQueryParams(ctx.request.query);
    const totalStudentQuery: QueryResult<any> = await dbQuery('select count(*) as total from student');
    const totalStudent = totalStudentQuery.rows[0].total;

    let boundary: { offset: number, limit: number } = {
      offset: 0, limit: totalStudent
    }
    if (paramsData.page !== -1 && paramsData.size !== -1) { 
      const paginationResult: { offset: number, limit: number } = pagenation(
        paramsData.page, paramsData.size, totalStudent
      );
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }

    const allStudentsQuery: QueryResult<any> = await dbQuery(
      'select * from student offset $1 limit $2', [boundary.offset, boundary.limit]
    );
    const allStudents = allStudentsQuery.rows;

    ctx.body = {
      count: allStudents.length,
      data: allStudents,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getTeachers ---------------------------------------------------------
export async function getTeachers(ctx: Context) {
  try {
    await dbSetPath();
    const paramsData: { page: number, size: number } = validQueryParams(ctx.request.query);
    const totalTeacherQuery: QueryResult<any> = await dbQuery('select count(*) as total from teacher');
    const totalTeacher: number = totalTeacherQuery.rows[0].total;

    let boundary: { offset: number, limit: number } = {
      offset: 0, limit: totalTeacher
    }
    if (paramsData.page !== -1 && paramsData.size !== -1) { 
      const paginationResult: { offset: number, limit: number } = pagenation(
        paramsData.page, paramsData.size, totalTeacher
      );
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }

    const allTeachersQuery: QueryResult<any> = await dbQuery(
      'select * from teacher offset $1 limit $2', [boundary.offset, boundary.limit]
    );
    const allTeachers = allTeachersQuery.rows;

    ctx.body = {
      count: allTeachers.length,
      data: allTeachers,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getClasses ---------------------------------------------------------
export async function getClasses(ctx: Context) {
  try {
    await dbSetPath();
    const allClassesOuery: QueryResult<any> = await dbQuery('select * from class');
    const allClasses = allClassesOuery.rows;

    ctx.body = {
      count: allClasses.length,
      data: allClasses,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getSubjects ---------------------------------------------------------
export async function getSubjects(ctx: Context) {
  try {
    await dbSetPath();
    const allSubjectsOuery: QueryResult<any> = await dbQuery('select * from subject');
    const allSubjects = allSubjectsOuery.rows;

    ctx.body = {
      count: allSubjects.length,
      data: allSubjects,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getClassStudents ---------------------------------------------------------
export async function getClassStudents(ctx: Context) {
  try {
    await dbSetPath();
    const class_id: string = ctx.params.class_id;
    if (!uuidValidate(class_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validClass: boolean = await checkExistByUniqueKeys('class', ['id'], [class_id]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class id';
      return;
    }

    const joinTableQuery: string = `
      student
      inner join student_class on student.id = student_class.student_id
      where student_class.class_id = '${class_id}'
    `;

    const paramsData: { page: number, size: number } = validQueryParams(ctx.request.query);
    const totalEntryQuery: QueryResult<any> = await dbQuery(`select count(*) as total from ${joinTableQuery}`);
    const totalEntry: number = totalEntryQuery.rows[0].total;

    let boundary: PaginationBoundaryI = {
      offset: 0, limit: totalEntry
    }
    if (paramsData.page !== -1 && paramsData.size !== -1) { 
      const paginationResult: PaginationBoundaryI = pagenation(
        paramsData.page, paramsData.size, totalEntry
      );
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }

    const query: string = `
      select student.id, student.name, student.sex, student.age
      from ${joinTableQuery}
      offset $1 limit $2
    `;
    const result: QueryResult<any> = await dbQuery(query, [boundary.offset, boundary.limit]);
    const students = result.rows;
    ctx.body = {
      total_students: totalEntry,
      data: students,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getTeacherStudents ---------------------------------------------------------
export async function getTeacherStudents(ctx: Context) {
  try {
    await dbSetPath();
    const teacher_id: string = ctx.params.teacher_id;
    if (!uuidValidate(teacher_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validTeacher: boolean = await checkExistByUniqueKeys('teacher', ['id'], [teacher_id]);
    if (!validTeacher) {
      ctx.status = 400;
      ctx.body = 'invalid teacher id';
      return;
    }

    const joinTableQuery: string = `
      student
      inner join student_class on student.id = student_class.student_id
      inner join schedule on schedule.class_id = student_class.class_id
      where schedule.teacher_id = '${teacher_id}'
    `;

    const paramsData: { page: number, size: number } = validQueryParams(ctx.request.query);
    const totalEntryQuery: QueryResult<any> = await dbQuery(`select count(*) as total from ${joinTableQuery}`);
    const totalEntry: number = totalEntryQuery.rows[0].total;

    let boundary: PaginationBoundaryI = {
      offset: 0, limit: totalEntry
    }
    if (paramsData.page !== -1 && paramsData.size !== -1) { 
      const paginationResult: PaginationBoundaryI = pagenation(
        paramsData.page, paramsData.size, totalEntry
      );
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }

    const query: string = `
      select distinct student.id, student.name, student.sex, student.age
      from ${joinTableQuery}
      offset $1 limit $2
    `;
    const result: QueryResult<any> = await dbQuery(query, [boundary.offset, boundary.limit]);
    const students = result.rows;
    ctx.body = {
      total_students: totalEntry,
      data: students,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getSubjectStudents ---------------------------------------------------------
export async function getSubjectStudents(ctx: Context) {
  try {
    await dbSetPath();
    const subject_id: string = ctx.params.subject_id;
    if (!uuidValidate(subject_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['id'], [subject_id]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject id';
      return;
    }

    const joinTableQuery: string = `
      student
      inner join student_class on student.id = student_class.student_id
      inner join schedule on schedule.class_id = student_class.class_id
      where schedule.subject_id = '${subject_id}'
    `;

    const paramsData: { page: number, size: number } = validQueryParams(ctx.request.query);
    const totalEntryQuery: QueryResult<any> = await dbQuery(`select count(*) as total from ${joinTableQuery}`);
    const totalEntry: number = totalEntryQuery.rows[0].total;

    let boundary: PaginationBoundaryI = {
      offset: 0, limit: totalEntry
    }
    if (paramsData.page !== -1 && paramsData.size !== -1) { 
      const paginationResult: PaginationBoundaryI = pagenation(
        paramsData.page, paramsData.size, totalEntry
      );
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }

    const query: string = `
      select distinct student.id, student.name, student.sex, student.age
      from ${joinTableQuery}
      offset $1 limit $2
    `;
    const result: QueryResult<any> = await dbQuery(query, [boundary.offset, boundary.limit]);
    const students = result.rows;
    ctx.body = {
      total_students: totalEntry,
      data: students,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getStudentMarks ---------------------------------------------------------
export async function getStudentMarks(ctx: Context) {
  try {
    await dbSetPath();
    const student_id: string = ctx.params.student_id;
    if (!uuidValidate(student_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validStudent: boolean = await checkExistByUniqueKeys('student', ['id'], [student_id]);
    if (!validStudent) {
      ctx.status = 400;
      ctx.body = 'invalid student id';
      return;
    }

    const query: string = `
      select subject.name as subject, mark.marks
      from mark
      inner join student on student.id = mark.student_id
      inner join subject on subject.id = mark.subject_id
      where mark.student_id = $1
    `;
    const result: QueryResult<any> = await dbQuery(query, [student_id]);
    const studentMarks = result.rows;
    ctx.body = {
      count: studentMarks.length,
      data: studentMarks,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getTopper ---------------------------------------------------------
export async function getTopper(ctx: Context) {
  try {
    await dbSetPath();
    const class_id: string = ctx.params.class_id;
    const subject_id: string = ctx.params.subject_id;
    if (!uuidValidate(class_id) || !uuidValidate(subject_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['id'], [subject_id]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject id';
      return;
    }

    const validClass: boolean = await checkExistByUniqueKeys('class', ['id'], [class_id]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class id';
      return;
    }

    const query: string = `
      select student.name, student.age, student.sex, mark.marks
      from student
      inner join student_class on student.id = student_class.student_id
      inner join mark on student.id = mark.student_id
      where mark.subject_id = $1 and student_class.class_id = $2
      order by mark.marks desc limit 1;
    `;
    const result: QueryResult<any> = await dbQuery(query, [subject_id, class_id]);
    const topper = result.rows;
    ctx.body = {
      data: topper,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}

// getLeaderboard ---------------------------------------------------------
function fetchClassLeaderboard(classInfo: ClassObjI, leaderboardLength: number) {
  const query: string = `
    select student.name, student.age, student.sex, SUM(mark.marks)
    from student
    inner join student_class on student.id = student_class.student_id
    inner join mark on student.id = mark.student_id
    where student_class.class_id = $1
    group by student.id
    order by SUM(mark.marks) desc
    limit ${leaderboardLength}
  `;
  return dbQuery(query, [classInfo.id]);
}

function reductiveLeaderboard(allClasses: ClassObjI [], result: object [], leaderboardLength: number) {
  return allClasses.reduce((chain: any, classInfo: ClassObjI) => chain.then((value: { rows: object; }) => {
    // base condition promise won't have data
    if (value) result.push(value.rows);
    return fetchClassLeaderboard(classInfo, leaderboardLength);

    // base condition
  }), Promise.resolve());
}

export async function getLeaderboard(ctx: Context) {
  const leaderboardLength: number = 3;
  try {
    await dbSetPath();
    const allClassesOuery: QueryResult<any> = await dbQuery('select * from class');
    const allClasses: ClassObjI [] = allClassesOuery.rows;    

    let combinedleaderboard: ClassLeaderboardI = {};
    let tempResult: any [] = [];

    const tailResult = await reductiveLeaderboard(allClasses, tempResult, leaderboardLength);
    tempResult.push(tailResult.rows);
    
    for (let index: number = 0; index < allClasses.length; index++) {
      const classInfo: ClassObjI = allClasses[index];
      combinedleaderboard[classInfo.name] = tempResult[index];
    }
    ctx.body = {
      data: combinedleaderboard,
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e
    };
  }
}