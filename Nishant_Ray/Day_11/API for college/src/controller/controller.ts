import { Context } from "vm";

const fn=require('../sql_functions/sqlfunctions');


interface student_data{
    student_id: number;
    fname:string;
    mname:string;
    lname:string;
    dob :Date;
    gender: CharacterData;
    address:string;
    slice(a:number,b:number): student_data;
}

interface teacher_data{
    teacher_id: number;
    fname:string;
    mname:string;
    lname:string;
    dob :Date;
    gender: CharacterData;
    address:string;
}

interface subject_data{
    subject_id:number;
    subject_name:string;
}

interface  class_schedule_data{
    classid:number;
    classno:number;
    subj_id:number;
    subj_name:string;
    t_id:number;
    t_fname:string;
}

interface class_student_data{
    class_id:number;
    studid:number
}

interface student_details_data{
    student_id:number;
    fname:string;
}

interface student_marks{
    subject_id:number;
    subject_name:string;
    marks:number;
}

interface topper{
    student_id:number;
    fname:string;
    marks:number;
}

interface result_data{
    result_id:number;
    studentid:number;
    clas_id:number;
    subjectid:number;
    marks:number;
}

exports.getStudent = async (ctx: Context) =>{
    try{
        let [rows]: Array<{rows: student_data}>=[];
        let length:any;
      rows=await  fn.get_student();
      length=await  fn.get_student_length()
        const page = parseInt(ctx.request.query.page);
        const size= parseInt(ctx.request.query.size);
        const totalPages=Math.ceil(length.rows[0].count/ size) ;
        if(page===undefined || size===undefined || typeof page!=='number' || typeof size!=='number'){
          ctx.response.status = 400;
           ctx.response.type = 'text/html';
           ctx.body = "Bad Request";
           return;
        }
    
        if(page<0 || size<0 || page>totalPages){
          ctx.response.status = 404;
           ctx.response.type = 'text/html';
           ctx.body = "Not Found";
           return;
        }
    
        const startid=page*size;
        const endid=Math.min((page+1)*size,length.rows[0].count);
          let req_data=rows.rows;
          req_data=(req_data).slice(startid,endid);
          ctx.response.status = 200;
          ctx.response.type = 'application/json';
          ctx.body=req_data;
      }catch(err){
            ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ;
        }
}

exports.getTeacher = async (ctx: Context) => {
    try{
        let [rows]: Array<{rows: teacher_data}>=[];
        rows=await  fn.get_teacher();
        
            ctx.response.status = 200;
            ctx.response.type = 'application/json';
          ctx.body=rows.rows;
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ;
        }
}

exports.getSubject = async (ctx: Context) => {
    try{
        let [rows]: Array<{rows: subject_data}>=[];
        rows=await fn.get_subject();
         
            ctx.response.status = 200;
          ctx.response.type = 'application/json';
          ctx.body=rows.rows;
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ;
        }      
}

exports.getClass = async (ctx: Context) => {
    try{
        let [rows]: Array<{rows: class_schedule_data}>=[];
        rows=await  fn.get_class();
            ctx.response.status = 200;
          ctx.response.type = 'application/json';
          ctx.body=rows.rows;
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ;
        }
}


exports.getStudentByClassId = async (ctx: Context) => {
    try{
        var id:number=parseInt(ctx.params.id);
        if(id===undefined || typeof id!=='number')
        {
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
        ctx.body ='Bad Request';
        return ;
        }
        let [rows]: Array<{rows: student_details_data}>=[];
        rows=await  fn.get_student_by_classid(id);
            ctx.response.status = 200;
          ctx.response.type = 'application/json';
          ctx.body=rows.rows;
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ;
        }
}


exports.getStudentByTeacherId = async (ctx: Context) => {
    try{
        var id:number=parseInt(ctx.url.substring(9));
        if(id===undefined || typeof id!=='number')
        {
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
        ctx.body ='Bad Request';
        return ;
        }
        let [rows]: Array<{rows: student_details_data}>=[];
       rows=await  fn.get_student_by_teacherid(id);
         
            ctx.response.status = 200;
            ctx.response.type = 'application/json';
          ctx.body=rows.rows;
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ;
        }
}

exports.getStudentBySubjectId = async (ctx: Context) => {
    try{
        var id:number=parseInt(ctx.url.substring(9));
        if(id===undefined || typeof id!=='number')
      {
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
      ctx.body ='Bad Request';
      return ;
      }
        let [rows]: Array<{rows: student_details_data}>=[];
        rows=await  fn.get_student_by_subjectid(id);
            ctx.response.status = 200;
          ctx.response.type = 'application/json';
          ctx.body=rows.rows;
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ;
        }
}

exports.getSubjectMarksByStudentId = async (ctx: Context) => {
    try{
        var id:number=parseInt(ctx.url.substring(7));
        if(id===undefined || typeof id!=='number')
    {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
    ctx.body ='Bad Request';
    return ;
    }
        let [rows]: Array<{rows: student_marks}>=[];
        rows=await  fn.get_subjectmarks_by_subjectid(id);
            ctx.response.status = 200;
            ctx.response.type = 'application/json';
          ctx.body=rows.rows;
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ;
        }
}

exports.gettopperByclassIdAndSubjectId = async (ctx: Context) => {
    try{
        var c_id=parseInt(ctx.params.c_id);
        var s_id=parseInt(ctx.params.s_id);
      if(c_id===undefined || typeof c_id!=='number' || s_id===undefined || typeof s_id!=='number')
      {
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
      ctx.body ='Bad Request';
      return ;
      }
      let [rows]: Array<{rows: topper}>=[];
      rows=await  fn.get_topper_by_classid_and_subjectid(c_id,s_id);
       
          ctx.response.status = 200;
          ctx.response.type = 'application/json';
        ctx.body=rows.rows;
      }catch(err){
        ctx.response.status = 500;
        ctx.response.type = 'text/html';
        ctx.body = "internal server error"; 
        return ;
      }
}

exports.addStudent = async (ctx: Context) => {
    try{
        let req:student_data=ctx.request.body;
        if(req.student_id===undefined || req.fname===undefined || req.mname===undefined || req.lname===undefined || req.dob===undefined || req.gender===undefined || req.address===undefined){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if( req.fname.trim()==='' || req.mname.trim()==='' || req.lname.trim()==='' || req.address.trim()===''){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if(typeof req.student_id!=='number' || typeof req.fname!=='string' || typeof req.mname!=='string' || typeof req.lname!=='string' || typeof req.dob!=='string' || typeof req.gender!=='string' || typeof req.address!=='string'){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        await  fn.add_student(req.student_id,req.fname,req.mname,req.lname,req.dob,req.gender,req.address);
       
          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data is inserted in student table";
        }catch(err){
          ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ; 
        }
}

exports.addTeacher = async (ctx: Context) => {
    try{
        let req:teacher_data=ctx.request.body;
        if(req.teacher_id===undefined || req.fname===undefined || req.mname===undefined || req.lname===undefined || req.dob===undefined || req.gender===undefined || req.address===undefined){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if( req.fname.trim()==='' || req.mname.trim()==='' || req.lname.trim()==='' || req.address.trim()===''){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if(typeof req.teacher_id!=='number' || typeof req.fname!=='string' || typeof req.mname!=='string' || typeof req.lname!=='string' || typeof req.dob!=='string' || typeof req.gender!=='string' || typeof req.address!=='string'){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await  fn.add_teacher(req.teacher_id,req.fname,req.mname,req.lname,req.dob,req.gender,req.address);

          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data is inserted in teacher table";
        }catch(err){
          ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ; 
        }
}

exports.addStudentInClass = async (ctx: Context) => {
    try{
        let req:class_student_data=ctx.request.body;
        if(req.class_id===undefined || req.studid===undefined || typeof req.class_id!=='number' || typeof req.studid!=='number'){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await  fn.add_student_in_class(req.class_id,req.studid);

          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data is inserted in Class_student table";
        }catch(err){
          ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ; 
        }
}

exports.addSubject= async (ctx: Context) => {
    try{
        let req:subject_data=ctx.request.body;
        if(req.subject_id===undefined || req.subject_name===undefined || typeof req.subject_id!=='number' || typeof req.subject_name!=='string' || req.subject_name.trim()===''){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await  fn.add_subject(req.subject_id,req.subject_name);
     
          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data is inserted in Subject table";
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ; 
        }
}

exports.addClassSchedule= async (ctx: Context) => {
    try{
        let req:class_schedule_data=ctx.request.body;
        if(req.classid===undefined || req.classno===undefined || req.subj_id===undefined || req.subj_name===undefined || req.t_id===undefined || req.t_fname===undefined){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if(typeof req.classid!=='number' || typeof req.classno!=='number' || typeof req.subj_id!=='number' || typeof req.subj_name!=='string' || typeof req.t_id!=='number' || typeof req.t_fname!=='string'){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if(req.subj_name.trim()==='' || req.t_fname.trim()===''){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await  fn.add_class_schedule(req.classid,req.classno,req.subj_id,req.subj_name,req.t_id,req.t_fname);

          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data is inserted in Class_schedule table";
        }catch(err){
          ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ; 
        }
}

exports.addResult= async (ctx: Context) => {
    try{
        let req:result_data=ctx.request.body;
        if(req.result_id===undefined || req.studentid===undefined || req.clas_id===undefined || req.subjectid===undefined || req.marks===undefined){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if(typeof req.result_id!=='number' || typeof req.studentid!=='number' || typeof req.clas_id!=='number' || typeof req.subjectid!=='number' || typeof req.marks!=='number'){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await  fn.add_result(req.result_id,req.studentid,req.clas_id,req.subjectid,req.marks);
       
          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data is inserted in result table";
        }catch{
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ; 
        }
}