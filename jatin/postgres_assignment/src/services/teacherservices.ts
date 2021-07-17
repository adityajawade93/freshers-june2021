/* eslint-disable max-len */
export { };

const client = require('../db.ts');

async function addTeacher(teacherID: string, name: string, gender: string, phone: string, subjectID: string) {
  return new Promise((resolve, reject) => {
    client.query('begin')
      .then(() => {
        const query = 'INSERT INTO school.teacher values ($1,$2,$3,$4)';
        return client.query(query, [teacherID, name, gender, phone]);
      })
      .then(() => {
        const query = 'INSERT INTO school.takes values ($1,$2)';
        return client.query(query, [teacherID, subjectID]);
      })
      .then(() => client.query('commit'))
      .then(() => {
        resolve(`${name} teacher added to the database`);
      })
      .catch((err: any) => {
        reject(err);
        return client.query('rollback');
      });
  });
}

async function getTeacher() {
  return new Promise((resolve, reject) => {
    client.query('select * from school.teacher order by name', [], (err: any, res: { rows: unknown }) => {
      if (err) {
        reject(err);
      } else resolve(res.rows);
    });
  });
}

module.exports = {
  addTeacher, getTeacher,
};
