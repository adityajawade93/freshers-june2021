import joi from 'joi';

export function page_validation(page: number, size: number): {status: number, message: string}{
    if (typeof page !== 'number' || typeof size !== 'number') {
        return {status: 400,  message: 'Invalid parameters'};
    }
    if(page < 0 || size <= 0){
        return {status: 400, message: 'Invalid parameters'};
    }
    return {status: 200, message: 'true'};
}
  
export function isValidId(uuid: string){
    if( uuid.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i) )
        return true;
    return false;        
}

export function validateStudent(student: any){
    const studentSchema = joi.object({
        name: joi.string()
                .required(),
        classid: joi.string()
                .uuid()
                .required()
    });
    return studentSchema.validate(student);
}