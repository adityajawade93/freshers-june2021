import { query, setpath } from "./db_connection"
import { v4 as uuid } from 'uuid'
import { Context } from "vm";


function ValidId(uuid: string){
    if( uuid.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i) )
        return true;
    return false;        
  }

const ValidatePage = function(page: number, size: number):{result: string}{
    if (typeof page === "number" && typeof size === "number" && page >= 0 && size>=0 ) {
        return {result:"valid"};
    }
    return {result:"invalid"};
  }
  



export const AllStudents = async (ctx: Context) => {
    // console.log(ctx.request)
    var page = parseInt(ctx.request.query.page);
    var size = parseInt(ctx.request.query.size);
    // console.log(page,size);
    var isValid = ValidatePage(page,size);
  
    if(isValid.result === "valid"){
      let limit = size;
      let offset = page*size;
      const response = await query(
        `SELECT * FROM school.student LIMIT ${limit} OFFSET ${offset}`
      );
      ctx.response.status = 200;
      ctx.body = response.rows;
      return;
    }
    else{
      ctx.response.status = 400;
      ctx.body = "Invalid request";
      return;
    }
  };

  
  export const AllTeachers = async (ctx: Context) => {
    var page = parseInt(ctx.request.query.page);
    var size = parseInt(ctx.request.query.size);
    var isValid = ValidatePage(page,size);
  
    if(isValid.result === "valid"){
      let limit = size;
      let offset = page*size;
      const response = await query(
        `SELECT * FROM school.teacher LIMIT ${limit} OFFSET ${offset}`
      );
      ctx.response.status = 200;
      ctx.body = response.rows;
      return;
    }
    else{
      ctx.response.status = 400;
      ctx.body = "Invalid request";
      return;
    }
  };


  export const AllClasses = async (ctx: Context) => {
    var page = parseInt(ctx.request.query.page);
    var size = parseInt(ctx.request.query.size);
    var isValid = ValidatePage(page,size);
  
    if(isValid.result === "valid"){
      let limit = size;
      let offset = page*size;
      const response = await query(
        `SELECT * FROM school.class LIMIT ${limit} OFFSET ${offset}`
      );
      ctx.response.status = 200;
      ctx.body = response.rows;
      return;
    }
    else{
      ctx.response.status = 400;
      ctx.body = "Invalid request";
      return;
    }
  };


  export const AllSubjects = async (ctx: Context) => {
    var page = parseInt(ctx.request.query.page);
    var size = parseInt(ctx.request.query.size);
    var isValid = ValidatePage(page,size);
  
    if(isValid.result === "valid"){
      let limit = size;
      let offset = page*size;
      const response = await query(
        `SELECT * FROM school.subject LIMIT ${limit} OFFSET ${offset}`
      );
      ctx.response.status = 200;
      ctx.body = response.rows;
      return;
    }
    else{
      ctx.response.status = 400;
      ctx.body = "Invalid request";
      return;
    }
  };

  export const classStudent = async (ctx: Context) => {
    var id = ctx.params.id;
    if(ValidId(id)){
      try{
        const response = await query(
          `select * from school.student where classid = ${id}`
        );
        if(response.rows.length){
          ctx.response.status = 200;
          ctx.body = response.rows;
          return;
        }
        ctx.response.status = 400;
        ctx.body = "Required Id is not Present";
        return;
      }
      catch(error){
        ctx.response.status = 500;
        ctx.body = error.message;
        return;
      }
    }
    else{
      ctx.body = "invalid id";
      ctx.response.status = 400;
      return;
    }
  };



  export const TeacherStudent = async (ctx: Context) => {
    var id = ctx.params.id;
    if(ValidId(id)){
      try{
        const response = await query(
          `select * 
          from school.student as st, school.subject as sb
          where st.classid = sb.classid and sb.teacherid =  ${id}`
        );
        if(response.rows.length){
          ctx.response.status = 200;
          ctx.body = response.rows;
          return;
        }
        ctx.response.status = 400;
        ctx.body = "Id is not Present";
        return;
      }
      catch(error){
        ctx.response.status = 500;
        ctx.body = error.message;
        return;
      }
    }
    else{
      ctx.body = "invalid id passed";
      ctx.response.status = 400;
      return;
    }
  };
  

  export const SubjectStudent = async (ctx: Context) => {
    var id = ctx.params.id;
    if(ValidId(id)){
      try{
        const response = await query(
          `select * 
          from school.student as st, school.subject as sb
          where st.classid = sb.classid and sb.subjectid = ${id}`
        );
        if(response.rows.length){
          ctx.response.status = 200;
          ctx.body = response.rows;
          return;
        }
        ctx.response.status = 400;
        ctx.body = "Id is not Present";
        return;
      }
      catch(error){
        ctx.response.status = 500;
        ctx.body = error.message;
        return;
      }
    }
    else{
      ctx.body = "invalid id passed";
      ctx.response.status = 400;
      return;
    }
  };
  
  export const StudentMarks = async (ctx: Context) => {
    var id = ctx.params.id;
    if(ValidId(id)){
      try{
        const response = await query(
          `select * from school.marks where studentid = ${id}`
        );
        if(response.rows.length){
          ctx.response.status = 200;
          ctx.body = response.rows;
          return;
        }
        ctx.response.status = 400;
        ctx.body = "Required Id is not Present";
        return;
      }
      catch(error){
        ctx.response.status = 500;
        ctx.body = error.message;
        return;
      }
    }
    else{
      ctx.body = "invalid id passed";
      ctx.response.status = 400;
      return;
    }
  };
 
  
  export const highestSubjectMark = async (ctx: Context) => {
    let id = ctx.params.id;
    if(ValidId(id)){
      try{
        const response = await query(
          `select * from school.marks 
          where subjectid = $1
          order by marks desc
          limit ${id}`
        );
        if(response.rows.length){
          ctx.response.status = 200;
          ctx.body = response.rows;
          return;
        }
        ctx.response.status = 400;
        ctx.body = "Id is not Present";
        return;
      }
      catch(error){
        ctx.response.status = 500;
        ctx.body = error.message;
        return;
      }
    }
    else{
      ctx.body = "invalid id passed";
      ctx.response.status = 400;
      return;
    }
  };

  export const toppper = async (ctx: Context) => {
    var num = parseInt(ctx.params.num);
    if(typeof num === "number"){
      try{
        const response = query(
          `select studentid, sum(marks) as total 
          from school.marks 
          group by studentid 
          order by total desc 
          limit ${num}`
        );
          ctx.response.status = 200;
          ctx.body = response;
          return;
      }
      catch(error){
        ctx.response.status = 500;
        ctx.body = error.message;
        return;
      }
    }
    else{
      ctx.body = "Not correct number";
      ctx.response.status = 400;
      return;
    }
  };

  export const createStudent = async (ctx: Context) => {
      console.log(ctx.request.body)
    var name = ctx.request.body.name;
    var classid = ctx.request.body.classid;
    console.log(name)
    console.log(classid)
    if(!name || !classid){
        ctx.body = "Data should not be empty";
        ctx.response.status = 406;
        return;
    }
    if(ValidId(classid)){
      try{
        const response = await query(
          `INSERT INTO school.student(name, classid) 
          VALUES ${name} , ${classid}`
        );
        // console.log(response.rowCount); // 1
        if(response.rowCount){
          ctx.response.status = 201;
          ctx.body = "Student added successfully";
          return;
        }
        ctx.response.status = 500;
        ctx.body = "Some error occured !!!";
        return;
      }
      catch(error){
        ctx.response.status = 500;
        ctx.body = error.message;
        return;
      }
    }
    else{
      ctx.body = "Not correct class id";
      ctx.response.status = 406;
      return;
    }
  }

  
  export const createTeacher = async (ctx: Context) => {
    var name = ctx.request.body.name;
    if(!name){
        ctx.body = "Name should there for teacher";
        ctx.response.status = 406;
        return;
    }
    else {
      try{
        const response = await query(
          `INSERT INTO school.teacher(name) 
          VALUES ${name}`
        );
        // console.log(response.rowCount); // 1
        if(response.rowCount){
          ctx.response.status = 201;
          ctx.body = "Teacher added successfully";
          return;
        }
        ctx.response.status = 500;
        ctx.body = "Some error occured !!!";
        return;
      }
      catch(error){
        ctx.response.status = 500;
        ctx.body = error.message;
        return;
      }
    }
   
  }


  export const createClass = async (ctx: Context) => {
    var name = ctx.request.body.name;
    if(!name){
        ctx.body = "Class name can not be empty";
        ctx.response.status = 406;
        return;
    }
    else {
      try{
        const response = await query(
          `INSERT INTO school.class(name) 
          VALUES ${name}`
        );
        // console.log(response.rowCount); // 1
        if(response.rowCount){
          ctx.response.status = 201;
          ctx.body = "Class added successfully";
          return;
        }
        ctx.response.status = 500;
        ctx.body = "Some error occured !!!";
        return;
      }
      catch(error){
        ctx.response.status = 500;
        ctx.body = error.message;
        return;
      }
    }
   
  }

  




