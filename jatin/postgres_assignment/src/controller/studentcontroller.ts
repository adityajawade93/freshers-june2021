export {};


const Router = require('@koa/router');
const uuid= require('uniqid');
let database = require('../services/studentservices')

async function addStudent(ctx:any){
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
        let id: string= uuid('S')
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

async function getStudent(ctx:any){

    let {page}= ctx.request.query
    let {size}= ctx.request.query

    if(isNaN(page) || isNaN(size)){
        ctx.response.status=400;
        ctx.body = 'invalid query'
    }

    let totalstudent: number = await database.getStudentCount();
    let totalpages : number= Math.ceil(totalstudent/size);
    
    if(page<0 || page>=totalpages){
        ctx.response.status=400;
        ctx.body = 'invalid page given'
        return
    }


    try{
        const allStudent = await database.getStudent(page,size);
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
async function getStudentFromClassID(ctx:any){
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

async function getStudentFromSubjectID(ctx:any){
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


async function getStudentFromTeacherID(ctx: any){
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


module.exports ={
    addStudent,getStudent,
    getStudentFromClassID, getStudentFromSubjectID, getStudentFromTeacherID
}