import { client } from "./Client";

export const getSubjectInfoFromDB = (resolve: any, reject: any) => {
    client.connect().then(() => {
        client.query("SELECT * FROM school.subject").then((result) => {
            resolve(result.rows);
        }).catch(() => {

            reject(false);
        }).finally(() => {
            //client.end();

        });
    });
}

export const insertSubjectInfoIntoDB = (subjectInfo) => {
    const insertDBPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("INSERT INTO school.subject VALUES ($1,$2,$3,$4);", subjectInfo).then((result) => {
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