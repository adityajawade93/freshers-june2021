const client = require("../db")


async function addStudent(studentID,name,gender,phone,classID){
    
    return new Promise((resolve,reject)=>{

        client.query('begin')
        .then(()=>{
            let query="INSERT INTO school.student(studentID,name,gender,phone) VALUES ($1,$2,$3,$4)"
            return client.query(query,[studentID,name,gender,phone]);
        })
        .then(()=>{
            return client.query("INSERT INTO school.studies_in (studentID,classID) VALUES ($1,$2)",
            [studentID,classID])
        })
        .then(()=>{
            return client.query('commit');
        })
        .then(()=>{
            resolve('student added');
        })
        .catch((err)=>{
            reject(err)
            return client.query('rollback')
        })
    
    })
}

async function getStudent(page,size){
    return new Promise((resolve,reject)=>{
        let query = "select * from school.student OFFSET $1 LIMIT $2";
        client.query(query,[page*size,size],(err,res)=>{
            if(err){
                reject(err);
            }else{
                const data=[];
                for(let i=0;i<res.rows.size();i++){
                    data.push({
                        "studentID" : res.rows[i].studentID,
                        "name": res.rows[i].name,
                        "gender": res.rows[i].gender,
                        "phone": res.rows[i].phone
                    }) 
                    resolve(data);
                }
            }
        });

        
    })
}

module.exports ={
    addStudent,getStudent
};
