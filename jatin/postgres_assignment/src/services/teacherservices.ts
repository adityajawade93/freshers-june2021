export { }

const client = require("../db")


async function addTeacher(teacherID: string, name: string, gender: string, phone: string, subjectID: string) {
    return new Promise((resolve, reject) => {
        client.query('begin')
            .then(() => {
                let query = "INSERT INTO school.teacher values ($1,$2,$3,$4)"
                return client.query(query, [teacherID, name, gender, phone])
            })
            .then(() => {
                let query = "INSERT INTO school.takes values ($1,$2)"
                return client.query(query, [teacherID, subjectID]);
            })
            .then(() => {
                return client.query('commit');
            })
            .then(() => {
                resolve(`${name} teacher added to the database`)
            })
            .catch((err: any) => {
                reject(err);
                return client.query('rollback');
            })
    })
}

async function getTeacher() {
    console.log('hey teacher list');
    return new Promise((resolve, reject) => {
        client.query("select * from school.teacher", [], (err: any, res: { rows: unknown }) => {
            if (err) {
                reject(err);
            }
            else resolve(res.rows);
        })
    })

}

module.exports = {
    addTeacher, getTeacher
}