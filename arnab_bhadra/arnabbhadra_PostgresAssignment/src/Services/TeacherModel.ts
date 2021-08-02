import {client} from "../Database/Client";

export const getTeacherInfo = async (): Promise<any> => {

    return (await client.query("SELECT * FROM school.teacher ORDER BY tid")).rows;
}

export const getNumberOfTeachers = async() =>{
    
    return (await client.query("SELECT COUNT(*) FROM school.teacher")).rows;
}

export const insertTeacherInfo = async (teacherInfo:any) => {
    
    return (await client.query("INSERT INTO school.teacher VALUES ($1,$2,$3,$4);", teacherInfo)).rows;
}