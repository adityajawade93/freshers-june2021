import { query } from "../db/database";

interface ScheduleRequest{
    classId: string;
    subjectId: string;
    teacherId: string;
}

export async function createSchedule ( requestBody: ScheduleRequest ) {
    try {
        await query("insert into schedule values ($1, $2, $3)", [requestBody.subjectId, requestBody.classId, requestBody.teacherId]);
    }
    catch (err) {
        throw new Error(err);
    }

}