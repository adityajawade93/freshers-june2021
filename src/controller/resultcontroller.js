const database = require('../editor/resulteditor');

async function addMarks(ctx){
    let obj= ctx.request.body;
    if(obj.studentID==null || obj.subjectID == null || obj.marks==null){
        ctx.response.status=400;
        ctx.body = 'data missing';
        return;
    }

    try{
        const added_marks = await database.addMarks(obj.studentID,obj.subjectID,obj.marks);
        ctx.response.status=200;
        ctx.body={
            "msg": 'marks added',
            data: added_marks
        }
    }
    catch(err){
        ctx.response.status=400;
        ctx.body= `something went wrong in adding marks + ${err}`;
    }

}

async function updateMarks(ctx){
    let obj= ctx.request.body;
    if(obj.studentID==null || obj.subjectID == null || obj.marks==null){
        ctx.response.status=400;
        ctx.body = 'data missing';
        return;
    }

    try{
        const updated_marks = await database.updateMarks(obj.studentID,obj.subjectID,obj.marks);
        ctx.response.status=200;
        ctx.body={
            msg:'data updated',
            data: updated_marks
        }
    }
    catch(err){
        ctx.response.status=400;
        ctx.body= `something went wrong in update marks + ${err}`;
    }

}

async function getMarks(ctx){
    
    try{
        let Studentid = ctx.request.params.Studentid
        const markslist = await database.getMarks(Studentid);
        ctx.response.status=200;
        ctx.body={
            'msg': `all subject marks for studentID ${Studentid}`,
            'markslist': markslist
        }
    }
    catch(err){
        ctx.response.status=400;
        ctx.body= `something went wrong in adding marks + ${err}`;
    }

}

module.exports= {
    addMarks,updateMarks,getMarks
}