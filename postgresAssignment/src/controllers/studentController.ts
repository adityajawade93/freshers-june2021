const uuid = require('uniqid');
const services = require('../services/studentServices');

exports.addStudent = async (ctx: any) => {


    let object = ctx.request.body;
    if (object.name == null || object.gender == null || object.phone == null || object.classId == null) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Data missing"
        };
        return;
    }

    try {

        let id = uuid('S')
        await services.addStudent(id, object.name, object.gender, object.phone, object.classId);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Student added"
        };


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };

    }


}
exports.addTeacher = async (ctx: any) => {


    let object = ctx.request.body;
    if (object.name == null || object.gender == null || object.phone == null || object.subjectId == null) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Data missing"
        };
        return;
    }

    try {

        let id = uuid('T')
        await services.addTeacher(id, object.name, object.gender, object.phone, object.subjectId);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Teacher added"
        };


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };

    }


}
exports.addSubject = async (ctx: any) => {


    let object = ctx.request.body;
    if (object.subjectName == null) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Data missing"
        };
        return;
    }

    try {

        let id = uuid('S')
        await services.addSubject(id, object.subjectName);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Subject added"
        };


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };

    }


}

exports.addSchedule = async (ctx: any) => {


    let object = ctx.request.body;
    if (object.classId == null || object.subjectId == null) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Data missing"
        };
        return;
    }

    try {

        let id = uuid('S')
        await services.addSchedule(object.classId, object.subjectId);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Schedule added"
        };


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };

    }


}

exports.getTeachers = async (ctx: any) => {



    try {


        let teachersData = await services.getTeachers();
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = teachersData;


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };

    }


}

exports.getSubjects = async (ctx: any) => {



    try {


        let subjectData = await services.getSubjects();
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = subjectData;


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };

    }


}


exports.getClasses = async (ctx: any) => {



    try {


        let classData = await services.getClasses();
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = classData;


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };

    }


}

exports.getStudents = async (ctx: any) => {

    let page: number = ctx.request.query.page;
    let size: number = ctx.request.query.size;
    if (isNaN(page) || isNaN(size)) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid query"
        }
        return;
    }

    let totalstudents: number = await services.getStudentcount();
    let totalPages: number = Math.ceil(totalstudents / size);
    if (page < 0 || page >= totalPages) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "page number not found"
        }
        return;
    }
    if (size <= 0) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid size"
        }
        return;
    }


    try {



        let studentData = await services.getStudents(size, page);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = studentData;


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };

    }


}

exports.getStudentsByClassId = async (ctx: any) => {

    let classId: string = ctx.request.params.classId;
    if (classId == null || classId == undefined) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid classId"
        }
        return;
    }
    try {

        let studentData = await services.getStudentsByClassId(classId);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = studentData;


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };
    }


}

exports.getStudentsBySubjectId = async (ctx: any) => {

    let subjectId: string = ctx.request.params.subjectId;
    if (subjectId == null || subjectId == undefined) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid classId"
        }
        return;
    }
    try {

        let studentData = await services.getStudentsBySubjectId(subjectId);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = studentData;


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };
    }


}

exports.getStudentsByTeacherId = async (ctx: any) => {

    let teacherId: string = ctx.request.params.teacherId;
    if (teacherId == null || teacherId == undefined) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid classId"
        }
        return;
    }
    try {

        let studentData = await services.getStudentsByTeacherId(teacherId);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = studentData;


    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };
    }


}

