
const Router = require('@koa/router');
let uuid= require('uniqid');
let database = require('../editor/studenteditor')


/////////////////////////////////////////////////////////////////////////////////////////////////////
async function addStudent(ctx){
    let obj= ctx.request.body;
    if(obj.name==null || obj.gender==null || obj.phone==null || obj.classID==null){
        ctx.response.status=400;
        ctx.response.type= 'application/json';
        ctx.body={
            "msg":"data missing in student body"
        }
        return;
    }

    try{
        let id= uuid('S')
        const newStudent =  await database.addStudent(id,obj.name,obj.gender,obj.phone,obj.classID);
        ctx.response.status=200;
        ctx.response.type='application/json'
        ctx.body={
            msg:"student added",
            data_added: newStudent
        }
    }
    catch(err){
        console.log(err)
        ctx.response.status=400;
        ctx.response.type= 'application/json';
        ctx.body={
            "msg":`something went wrong in adding students ${err}`
        }
    }
}

async function getStudent(ctx){

    try{
        const allStudent = await database.getStudent();
        ctx.response.status=200;
        ctx.response.type='application/json'
        ctx.body={
            msg:"list of all students",
            data: allStudent
        }
    }
    
    catch(err){
        console.log(err);
        ctx.response.status=404;
        ctx.response.type='application/json';
        ctx.body={
            msg:`can't get all students something wrong ${err}`
        }
    }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////

async function addSubject(ctx){

    let obj = ctx.request.body;
    if(obj.name==null){
        ctx.response.status=400;
        ctx.body={
            msg:"properties of subject not defined"
        }
        return;
    }
    try{
        let id= uuid('SUB');
        const newSubject = await database.addSubject(id,obj.name);
        ctx.response.status =200;
        ctx.body={
            msg:'subject added',
            data: newSubject
        }
    }
    catch(err){
        ctx.body={
            msg: `something wrong while adding subject + ${err}`
        }
    }
}

async function getSubject(ctx){
    try{
        ctx.response.status=200;
        const allSubject = await database.getSubject();
        ctx.body={
            data: allSubject
        }
    }
    catch(err){
        ctx.response.status=400;
        ctx.body={
            "msg": `something went worng in getting all subjects + ${err}`
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

async function addTeacher(ctx){
    let obj= ctx.request.body;
    if(obj.name==null || obj.sex==null || obj.phone==null || obj.subjectID==null){
        ctx.response.status=400;
        ctx.response.type= 'application/json';
        ctx.body={
            "msg":"data missing in teacher body"
        }
        return;
    }

    try{
        let id= uuid('T')
        const newTeacher =  await database.addTeacher(id,obj.name,obj.sex,obj.phone,obj.subjectID);
        ctx.response.status=200;
        ctx.response.type='application/json'
        ctx.body={
            msg:"teacher added",
            data_added: newTeacher
        }
    }
    catch(err){
        console.log(err)
        ctx.response.status=400;
        ctx.response.type= 'application/json';
        ctx.body={
            "msg":`something went wrong in adding teacher ${err}`
        }
    }
}

async function getTeacher(ctx){
    try{
        const allTeachers = await database.getTeacher();
        ctx.response.status=200;
        ctx.body={
            msg:"list of all teachers",
            data: allTeachers
        }
    }
    catch (err){
        ctx.response.status=400;
        ctx.body={
            msg: `something wrong in getting teachers list + ${err}`
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


async function addClass(ctx){
    let obj = ctx.request.body;
    if(obj.classID==null || obj.room==null || obj.subjectID==null){
        ctx.response.status=404;
        ctx.response.type='application/json';
        ctx.body={
            msg:'data missing in class body',
        }
        return
    }
    try{
        const newclass = await database.addClass(obj.classID,obj.room,obj.subjectID);
        ctx.response.status=200;
        ctx.response.type='application/json'
        ctx.body={
            msg:'class added',
            data: newclass
        }
    }
    catch(err){
        console.log(err);
        ctx.body={
            msg:`something wrong  + ${err}`
        }
    }
}

async function getClass(ctx){
    try{
        ctx.response.status=200;
        const allClasses= await database.getClass()
        ctx.body={
            "msg": "list of all classes",
            data: allClasses
        }
    }
    catch(err){
        ctx.response.status=404;
        ctx.body={
            msg:`something wrong in getting all classes + ${err}`
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

async function getStudentFromClassID(ctx){
    try{
        let Classid= ctx.request.params.Classid;
        console.log("hello");
        let required_student = await database.getStudentFromClassID(Classid);
        ctx.response.status=200;
        ctx.body={
            msg: 'required student detail',
            data: required_student
        }
    }
    catch(err){
        ctx.response.status=400;
        ctx.body={
            error: `something wrong in getting student from class ID + ${err}`
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

async function getStudentFromSubjectID(ctx){
    try{
        let Subjectid = ctx.request.params.Subjectid;
        let required_student = await database.getStudentFromSubjectID(Subjectid);
        ctx.response.status=200;
        ctx.body=required_student;
    }catch(err){
        ctx.response.status=400;
        ctx.body={
            error: `something went wrong in getting student from subject id +  ${err}`
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////


async function getStudentFromTeacherID(ctx){
    try{
        let Teacherid = ctx.request.params.Teacherid;
        let required_student = await database.getStudentFromTeacherID(Teacherid);
        ctx.response.status=200;
        ctx.body=required_student 
    }catch(err){
        ctx.response.status=400;
        ctx.body={
            error:`something went wrong in getting student from teacher id + ${err}`
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports ={
    addStudent,getStudent,addSubject,getSubject,addTeacher,getTeacher,addClass,getClass,
    getStudentFromClassID, getStudentFromSubjectID, getStudentFromTeacherID
}