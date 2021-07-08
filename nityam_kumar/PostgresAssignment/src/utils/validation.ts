interface IStudent {
  class_number: number;
  age: number;
  student_id?: string;
  fname: string;
  lname: string;
  sex?: string;
}

interface ITeacher {
  age: number;
  fname: string;
  lname: string;
  teacher_id?: string;
  sex?: string;
}

interface IMark {
  student_id: string;
  subject_id: string;
  marks: number;
  teacher_id: string;
  class_number: number;
}

interface ISubject {
  subject_id?: string;
  subject_name: string;
  teacher_id: string;
  class_number: number;
}

export function checkStudent(s1: IStudent) {
  if (
    !s1.fname ||
    !s1.lname ||
    !s1.age ||
    !s1.class_number ||
    typeof s1.fname !== "string" ||
    typeof s1.lname !== "string" ||
    typeof s1.age !== "number" ||
    typeof s1.class_number !== "number" ||
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

export function checkTeacher(t1: ITeacher) {
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

export function checkMark(m1: IMark) {
  if (
    !m1.subject_id ||
    !m1.teacher_id ||
    !m1.class_number ||
    !m1.student_id ||
    !m1.marks ||
    typeof m1.subject_id !== "string" ||
    typeof m1.teacher_id !== "string" ||
    typeof m1.student_id !== "string" ||
    typeof m1.class_number !== "number" ||
    typeof m1.marks !== "number" ||
    m1.marks < 0 ||
    m1.marks > 100 ||
    !m1.subject_id.trim() ||
    !m1.teacher_id.trim()
  ) {
    return false;
  }

  return true;
}

export function checkSubject(s1: ISubject) {
  if (
    !s1.subject_name ||
    !s1.teacher_id ||
    !s1.class_number ||
    typeof s1.subject_name !== "string" ||
    typeof s1.teacher_id !== "string" ||
    typeof s1.class_number !== "number" ||
    s1.class_number <= 0 ||
    !s1.subject_name.trim() ||
    !s1.teacher_id.trim()
  ) {
    return false;
  }

  return true;
}
