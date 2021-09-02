import { jest } from '@jest/globals';

const addStudentToClassList = jest.fn();
const addSchedule = jest.fn();
const addStudentToList = jest.fn();
const updateStudentToList = jest.fn();
const addSubjectToList = jest.fn();
const updateSubjectInList = jest.fn();
const addTeacherToList = jest.fn();
const updateTeacherInList = jest.fn();

module.exports = {addStudentToClassList, addSchedule, addStudentToList, updateStudentToList, addSubjectToList, updateSubjectInList, addTeacherToList, updateTeacherInList};
