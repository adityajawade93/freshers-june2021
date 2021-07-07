const resultServices = require('../services/resultServices');


exports.addMarks = async(ctx :any) =>{

    let object = ctx.request.body;
    if (object.studentId == null || object.subjectId == null || object.marks == null) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Data missing"
        };
        return;
    }
    try {

       
        let checkSubject = await resultServices.checkSubject(object.studentId,object.subjectId);
        if(checkSubject==false)
        {
            ctx.response.status = 400;
            ctx.response.type = 'application/json';
            ctx.body = {
                "msg": "Subject not found related to student"
            };
            return;   
        }
        await resultServices.addMarks(object.studentId,object.subjectId,object.marks);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Marks added"
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

exports.updateMarks = async(ctx :any) =>{

    let object = ctx.request.body;
    if (object.studentId == null || object.subjectId == null || object.marks == null) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Data missing"
        };
        return;
    }
    try {

       
        let checkSubject = await resultServices.checkSubject(object.studentId,object.subjectId)
        if(checkSubject==false)
        {
            ctx.response.status = 400;
            ctx.response.type = 'application/json';
            ctx.body = {
                "msg": "Subject not found related to student"
            };
            return;   
        }
        await resultServices.updateMarks(object.studentId,object.subjectId,object.marks);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Marks Updated"
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


exports.getMarksByStudentId = async(ctx : any) =>{

    let studentId: string = ctx.request.params.studentId;
    if (studentId == null || studentId == undefined) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid classId"
        }
        return;
    }
    try {

        let marksData = await resultServices.getMarks(studentId);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = marksData;


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



exports.getHighestMarksPerSubject = async(ctx : any) =>{

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

        let marksData = await resultServices.getHighestMarksPerSubject(classId);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = marksData;


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

exports.getTop10Marks = async(ctx : any) =>{

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

        let marksData = await resultServices.getTop10Marks(classId);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = marksData;


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