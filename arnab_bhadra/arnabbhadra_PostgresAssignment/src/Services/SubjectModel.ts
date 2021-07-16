import { client } from "../Database/Client";

export const getSubjectInfoFromDB = async () => {
    return (await client.query("SELECT * FROM school.subject")).rows;
}

export const insertSubjectInfoIntoDB = async (subjectInfo: any): Promise<any> => {

    return (await client.query("INSERT INTO school.subject VALUES ($1,$2,$3,$4);", subjectInfo)).rows;
}