/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

interface PersonRequestI {
  name?: any;
  sex?: any;
  age?: any;
}

interface SubjectRequestI {
  name?: any;
}

interface ScheduleRequestI {
  subject_name?: any;
  class_name?: any;
  teacher_id?: any;
}

interface StudentToClassRequestI {
  student_id?: any;
  class_name?: any;
}

interface MarkRequestI {
  student_id?: any;
  subject_name?: any;
  marks?: any;
}

export function validStudentToClassRequestData(data: StudentToClassRequestI) {
  if (!data || !data.student_id || !data.class_name) return false;
  if (
    typeof data.student_id !== 'string' ||
    !data.student_id.trim() ||
    typeof data.class_name !== 'string' ||
    !data.class_name.trim()
  )
    return false;
  return true;
}

export function validPersonRequestData(data: PersonRequestI) {
  if (!data) return false;
  if (
    (data.name && (typeof data.name !== 'string' || !data.name.trim())) ||
    (data.sex &&
      (typeof data.sex !== 'string' || !data.sex.trim() || !['male', 'female'].includes(data.sex.toLowerCase()))) ||
    (data.age && (typeof data.age !== 'number' || data.age <= 0))
  )
    return false;
  return true;
}

export function validSubjectRequestData(data: SubjectRequestI) {
  if (!data) return false;
  if (data.name && (typeof data.name !== 'string' || !data.name.trim())) return false;
  return true;
}

export function validClassRequestData(data: SubjectRequestI) {
  if (!data) return false;
  if (data.name && (typeof data.name !== 'string' || !data.name.trim())) return false;
  return true;
}

export function validScheduleRequestData(data: ScheduleRequestI) {
  if (!data) return false;
  if (
    (data.subject_name && (typeof data.subject_name !== 'string' || !data.subject_name.trim())) ||
    (data.class_name && (typeof data.class_name !== 'string' || !data.class_name.trim())) ||
    (data.teacher_id && (typeof data.teacher_id !== 'string' || !data.teacher_id.trim()))
  )
    return false;
  return true;
}

export function validMarkRequestData(data: MarkRequestI) {
  if (!data) return false;
  if (
    (data.subject_name && (typeof data.subject_name !== 'string' || !data.subject_name.trim())) ||
    (data.student_id && (typeof data.student_id !== 'string' || !data.student_id.trim())) ||
    (data.marks && (typeof data.marks !== 'number' || data.marks <= 0))
  )
    return false;
  return true;
}
