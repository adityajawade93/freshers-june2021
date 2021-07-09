export { };

const client = require("../db")

async function addSubject(subjectID: string, name: string) {

    return new Promise((resolve, reject) => {
        client.query("INSERT INTO school.subject values ($1,$2)", [subjectID, name])
            .then(() => {
                resolve(`subject ${name} added to the database`);
            })
            .catch((err: any) => {
                reject(err);
            })
    })


}

async function getSubject() {
    console.log('hey, you asked for subject list');
    return new Promise((resolve, reject) => {
        let query = 'select * from school.subject';
        client.query(query, [], (err: any, res: { rows: unknown; }) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res.rows);
            }
        })
    })

}

module.exports = {
    addSubject, getSubject
}