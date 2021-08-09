import { client } from "../Database/Client";

export const getSubjectInfo = async () => {
    return (await client.query("SELECT * FROM school.subject ORDER BY suid")).rows;
}

export const getNumberOfSubjects = async () => {
    return (await client.query("SELECT COUNT(*) FROM school.subject")).rows;
}

export const insertSubjectInfo= async (subjectInfo: any): Promise<any> => {

    return (await client.query("INSERT INTO school.subject VALUES ($1,$2,$3,$4);", subjectInfo)).rows;
}