import { Teacher } from "../Entity/Teacher";
import {client} from "./Client";

export const getTeacherInfoFromDB = (resolve: any, reject: any) => {
    client.connect().then(() => {
        client.query("SELECT * FROM school.teacher").then((result) => {
            resolve(result.rows);
        }).catch(() => {

            reject(false);
        }).finally(() => {
            //client.end();

        });
    });
}

export const insertTeacherInfoIntoDB = (teacherInfo:any) => {
    const insertDBPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("INSERT INTO school.teacher VALUES ($1,$2,$3,$4);", teacherInfo).then((result) => {
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