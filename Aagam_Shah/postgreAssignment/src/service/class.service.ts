// const db = require('../config/database').pool;
import db from '../config/database';
import * as validation from '../helper/validation';
import { CError } from '../helper/customError';

export async function getClasses(page: number, size: number) {
  try{
    // if(!page || !size){
    //   page = 0;
    //   size = 5;
    // }
    const isValid = validation.page_validation(page,size);
    if(isValid.message === 'true'){
      const limit = size;
      const offset = page*size;
      const response = await db.query(
        'SELECT * FROM school.class LIMIT $1 OFFSET $2', [limit,offset]
      );
      return response.rows;
    }
    else{
      throw new CError(isValid.message, isValid.status);
    }    
  }
  catch (e) {
    throw new CError(e.message, e.status);
  }
};
