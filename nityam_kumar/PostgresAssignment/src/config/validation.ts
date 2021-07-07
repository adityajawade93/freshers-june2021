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

interface Mark {
  st_id: string;
  sub_id: string;
  marks: number;
  teacher_id: string;
  cl_no: number;
}

interface Subject {
  sub_id?: string;
  sub_name: string;
  teacher_id: string;
  cl_no: number;
}

export function checkStudent(s1: Student) {
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

export function checkTeacher(t1: Teacher) {
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

export function checkMark(m1: Mark) {
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

export function checkSubject(s1: Subject) {
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
