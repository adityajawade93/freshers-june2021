// const db = require('../config/database').pool;
import db from '../config/database';
import * as validation from '../helper/validation';
import { CError } from '../helper/customError';

export async function getMarksByStudentId(studentId: string){
  if(validation.isValidId(studentId)){
    try{
      const response = await db.query(
        `select * from school.marks where studentid = $1`, [studentId]
      );
      if(response.rows.length){
        return response.rows;
      }
      throw new CError('Required Id is not Present', 400);
    }
    catch(error){
      throw new CError(error.message, error.status);
    }
  }
  else{
    throw new CError('invalid id passed', 400);
  }
};

export async function highestMarksBySubject(subjetId: string){
  if(validation.isValidId(subjetId)){
    try{
      const response = await db.query(
        `select * from school.marks 
        where subjectid = $1
        order by marks desc
        limit 1`, [subjetId]
      );
      if(response.rows.length){
        return response.rows;
      }
      throw new CError('Required Id is not Present', 400);
    }
    catch(error){
      throw new CError(error.message, error.status);
    }
  }
  else{
    throw new CError('invalid id passed', 400);
  }
};
