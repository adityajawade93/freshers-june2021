import { client } from "./Client";

export const insertClassScheduleInfoIntoDB = (classScheduleinfo: any) => {
    const insertDBPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("INSERT INTO school.classschedule VALUES ($1,$2,$3,$4);", classScheduleinfo).then((result) => {
                resolve(result.rows);
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return insertDBPromise;
}