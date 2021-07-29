import {client} from "../Database/Client";

export const getTeacherInfo = async () => {

    return (await client.query("SELECT * FROM school.teacher ORDER BY tid")).rows;
}

export const insertTeacherInfo = async (teacherInfo:any) => {
    
    return (await client.query("INSERT INTO school.teacher VALUES ($1,$2,$3,$4);", teacherInfo)).rows;
}