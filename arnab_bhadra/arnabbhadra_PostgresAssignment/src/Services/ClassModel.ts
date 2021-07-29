import { client } from "../Database/Client";

export const insertClassScheduleInfo = async (classScheduleinfo: any) => {

    return (await client.query("INSERT INTO school.classschedule VALUES ($1,$2,$3,$4);", classScheduleinfo)).rows;
}