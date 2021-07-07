import { query } from "../database/clientdb"

export var getstudents = () => {

    try {
        var result = query('select * from students')
        return result
    } catch (e) {
        throw new Error(e)
    }

}

export var getstudentsbysid = (studentid: any) => {

    try {
        var result = query(`select * from students
                             where studentid = '${studentid}'`)
        return result
    } catch (e) {
        throw new Error(e)
    }
}

export var getstudentsbytid = (teacherid: any) => {

    try {
        var result = query(`select students.* from students
        inner join classes
        on classes.cstudentid = students.studentid
        inner join sechdule
        on sechdule.std = classes.cstandard
        where sechdule.tid ='${teacherid}'`)
        return result
    } catch (e) {
        throw new Error(e)
    }


}

export var getstudentsbysubname = (subjectname: any) => {


    try {
        var result = query(`select students.*
        from students 
        inner join classes
        on classes.cstudentid =students.studentid
        inner join sechdule
        on sechdule.std = classes.cstandard
        where sechdule.subjectname = '${subjectname}'`)
        return result
    } catch (e) {
        throw new Error(e)
    }
}

export var createstudents = (fname: string, lname: string | null, dob: Date) => {

    try{
        var result = query(`insert into students(fname,lname,bdate) values('${fname}','${lname}','${dob}')`)
        return result
    }catch(e){
        throw new Error(e)
    }

    



}