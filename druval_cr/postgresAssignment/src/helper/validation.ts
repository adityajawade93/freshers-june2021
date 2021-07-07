/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

interface StudentToClassRequestI {
  student_id?: any;
  class_name?: any;
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
