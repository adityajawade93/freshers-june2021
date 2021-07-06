//import koa from "koa";
import * as koaBody from "koa-body";
import * as koa from "koa";
import * as Router from "@koa/router";
import { Client } from "pg";
//import Clienttt from "pg/lib/client";

//const {Clientt} = require('pg');
//const koaa = require('koa');
//const koarouter = require('@koa/router');

const app = new koa();
const router = new Router();

const connectionString: string = 'postgressql://postgres:postgres@localhost:5432/practice';

const create_student = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let req: any = ctx.request.body;
        let id: string = req["id"];
        let name: string = req["name"];

        if (!id || !name) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (id) != 'string' || typeof (name) != 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        await client.query("insert into students values ($1,$2)", [id, name]);
        ctx.status = 200;
        ctx.body = "student created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const student_class = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let req: any = ctx.request.body;
        let student_id: string = req["student_id"];
        let class_id: string = req["class_id"];

        if (!student_id || !class_id) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (student_id) != 'string' || typeof (class_id) != 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        await client.query("insert into student_class values ($1,$2)", [req["student_id"], req["class_id"]]);
        ctx.status = 200;
        ctx.body = "student has been added to class.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log("disconnected.");
    }
}

const create_teacher = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let req: any = ctx.request.body;
        let id: string = req["id"];
        let name: string = req["name"];
        let sub_id: string = req["sub_id"];

        if (!id || !name || !sub_id) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (id) != 'string' || typeof (name) != 'string' || typeof(sub_id) != 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        await client.query("insert into teachers values ($1,$2,$3)", [req["id"], req["name"], req["sub_id"]]);
        ctx.status = 200;
        ctx.body = "teacher created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const create_subject = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let req: any = ctx.request.body;
        let id: string = req["id"];
        let name: string = req["name"];

        if (!id || !name) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (id) != 'string' || typeof (name) != 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        await client.query("insert into subjects values ($1,$2)", [req["id"], req["name"]]);
        ctx.status = 200;
        ctx.body = "subject created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const create_schedule = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let req: any = ctx.request.body;
        let sub_id: string = req["sub_id"];
        let class_id: string = req["class_id"];
        let teacher_id: string = req["teacher_id"];

        if (!sub_id || !class_id || !teacher_id) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (sub_id) != 'string' || typeof (class_id) != 'string' || typeof (teacher_id) != 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        await client.query("insert into schedule values ($1,$2,$3)", [req["sub_id"], req["class_id"], req["teacher_id"]]);
        ctx.status = 200;
        ctx.body = "schedule created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const create_result = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let req: any = ctx.request.body;
        let student_id: string = req["student_id"];
        let class_id: string = req["class_id"];
        let sub_id: string = req["sub_id"];
        let marks: string = req["marks"];

        if (!student_id || !class_id || !sub_id || !marks) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (student_id) != 'string' || typeof (class_id) != 'string' || typeof (sub_id) != 'string' || typeof(marks) != 'number') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        await client.query("insert into results values ($1,$2,$3,$4)", [req["student_id"], req["class_id"], req["sub_id"], req["marks"]]);
        ctx.status = 200;
        ctx.body = "result created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const update_result = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let req: any = ctx.request.body;
        let st_id: string = req["student_id"].trim();
        let sub_id: string = req["sub_id"].trim();
        let marks: number = req["marks"];

        if (!st_id || !sub_id || !marks) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (st_id) != 'string' || typeof (sub_id) != 'string' || typeof (marks) != 'number') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        await client.query(`update results set marks = ${marks} where student_id = '${st_id}' and subject_id = '${sub_id}'`);
        ctx.status = 200;
        ctx.body = "result updated.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const student_list = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let page: number = Number(ctx.query.page);
        let size: number = Number(ctx.query.size);

        if (!page || !size) {
            ctx.status = 400;
            ctx.body = "Please enter page and size";
            return;
        }
        if ( page < 0 || size <= 0 ) {
            ctx.status = 400;
            ctx.body = "Please page and size in appropriate range";
            return;
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        let res: any = await client.query(`select * from students offset ${page * size} fetch next ${size} rows only;`);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const teacher_list = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        let res: any = await client.query("select * from teachers");
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const class_list = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        let res: any = await client.query("select * from classes");
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const subject_list = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        let res: any = await client.query("select * from subjects");
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const student_list_with_classid = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let class_id: string = ctx.params.id.trim();
        if( !class_id || class_id == null ){
            ctx.status = 400;
            ctx.body = "Please enter class id.";
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        var sql: string = `select students.student_id,student_name from students,student_class where student_class.class_id = '${class_id}' and students.student_id = student_class.student_id;`
        let res: any = await client.query(sql);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const student_list_with_teacherid = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let teacher_id: string = ctx.params.id.trim();
        if( !teacher_id ){
            ctx.status = 400;
            ctx.body = "Please enter teacher id.";
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        var sql: string = `select students.student_id,student_name from students,student_subjects,teachers where teacher_id ='${teacher_id}' and students.student_id = student_subjects.student_id and (student_subjects.first_lang = teachers.subject_id or student_subjects.second_lang = teachers.subject_id or student_subjects.opt1 = teachers.subject_id or student_subjects.opt2 = teachers.subject_id or student_subjects.opt3 = teachers.subject_id);`
        let res: any = await client.query(sql);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const student_list_with_subid = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let sub_id: string = ctx.params.id.trim();
        if( !sub_id ){
            ctx.status = 400;
            ctx.body = "Please enter subject id.";
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        var sql: string = `select students.student_id,student_name from students,student_subjects where students.student_id = student_subjects.student_id and (student_subjects.first_lang = '${sub_id}' or student_subjects.second_lang = '${sub_id}' or student_subjects.opt1 = '${sub_id}' or student_subjects.opt2 = '${sub_id}' or student_subjects.opt3 = '${sub_id}');`
        let res: any = await client.query(sql);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}

const highest_mark_class_sub = async (ctx: koa.Context, next: koa.Next) => {
    let client: Client = new Client({ connectionString: connectionString });
    try {
        let class_id = ctx.query.classid;
        let sub_id = ctx.query.subid;

        if( !class_id || !sub_id){
            ctx.status = 400;
            ctx.body = "Please enter class id and subject id.";
        }

        await client.connect();
        console.log('connected...');
        await client.query("set search_path to school");
        var sql: string = `select results.student_id,student_name,marks from students,results where students.student_id = results.student_id and class_id = '${class_id}' and subject_id = '${sub_id}' and marks = (select max(marks) from results where class_id = '${class_id}' and subject_id = '${sub_id}');`
        let res: any = await client.query(sql);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
    }
    finally {
        await client.end();
        console.log('Client disconnected.');
    }
}


router.post("/s/student", create_student);
router.post("/s/student_class", student_class);
router.post("/s/teacher", create_teacher);
router.post("/s/subject", create_subject);
router.post("/s/schedule", create_schedule);
router.post("/s/result", create_result);
router.put("/s/update_result", update_result);

router.get("/s/student_list", student_list);
router.get("/s/teacher_list", teacher_list);
router.get("/s/class_list", class_list);
router.get("/s/subject_list", subject_list);
router.get("/s/student_list_classid/:id", student_list_with_classid);
router.get("/s/student_list_teacherid/:id", student_list_with_teacherid);
router.get("/s/student_list_subid/:id", student_list_with_subid);
router.get("/s/highest_marks", highest_mark_class_sub);


app.use(koaBody())

app.use(router.routes());

app.use(async ctx => {
    ctx.status = 404;
    ctx.body = 'Page not found';

});

console.log('started');
app.listen(3000);