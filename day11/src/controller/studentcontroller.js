
let uuid= require('uniqid');
let database = require('../editor/studenteditor')

async function addStudent(ctx){
    let obj= ctx.request.body;
    if(obj.name==null || obj.gender==null || obj.phone==null || obj.classID==null){
        ctx.response.status=400;
        ctx.response.type= 'application/json';
        ctx.body={
            "msg":"data missing"
        }
        return;
    }

    try{
        let id= uuid('N')
        await database.addStudent(id,obj.name,obj.gender,obj.phone,obj.classID);
        ctx.response.status=200;
        ctx.response.type='application/json'
        ctx.body={
            msg:"student added",
            // data_added: newStudent
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

module.exports ={
    addStudent,getStudent
}