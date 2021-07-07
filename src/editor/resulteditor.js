const client = require('../db');

async function addMarks(studentID, subjectID, marks){
    return new Promise((resolve,reject)=>{
        client.query('INSERT INTO school.result values ($1,$2,$3)',[studentID, subjectID, marks],(err,res)=>{
            if(err)reject(err);
            else resolve('query fetched');
        })
    })
}

async function updateMarks(studentID, subjectID, marks){
    return new Promise((resolve,reject)=>{
        client.query('UPDATE school.result set marks = $3 where studentid = $1 and subjectid = $2',[studentID, subjectID, marks],(err,res)=>{
            if(err)reject(err);
            else resolve('query fetched');
        })
    })
}

async function getMarks(studentID){
    return new Promise((resolve,reject)=>{
        client.query('SELECT s.name , r.marks FROM school.result r LEFT JOIN school.subject s ON r.subjectid = s.subjectid WHERE r.studentid = $1',[studentID],
        (err,res)=>{
            if(err)reject(err);
            else resolve(res.rows);
        })
    })
}

module.exports={
    addMarks,updateMarks,getMarks
}