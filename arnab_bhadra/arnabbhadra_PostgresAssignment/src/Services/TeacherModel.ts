import {client} from "../Database/Client";

export const getTeacherInfoFromDB = async () => {

    return (await client.query("SELECT * FROM school.teacher")).rows;
}

export const insertTeacherInfoIntoDB = async (teacherInfo:any) => {
    
    return (await client.query("INSERT INTO school.teacher VALUES ($1,$2,$3,$4);", teacherInfo)).rows;
}