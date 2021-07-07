const koa = require('koa');
const koaroute = require('@koa/router');
const bodyparser = require('koa-bodyparser');
const { Client } = require('pg');

const client = new Client({
    user: "arnab",
    password: "1234",
    host: "127.0.0.1",
    port: 5432,
    database: "zopsmart"
});

const router = new koaroute();
const app = new koa();

const getStudentInfoFromDB = (resolve, reject) => {
    client.connect().then(() => {
        client.query("SELECT * FROM company.project").then((result) => {
            resolve(result.rows);
        }).catch(() => {
            
            reject(false);
        }).finally(() => {
            client.end();
            
        });
    });
}

const getStudentInfo = async(ctx, next)=>{
    const promiseDB = new Promise(getStudentInfoFromDB);
    var studentinfo;
    
    await promiseDB.then((data) => {
        studentinfo=data;
        console.log(studentinfo);
        ctx.body=studentinfo;
    }).catch((data) => {
        ctx.status=400;
        
        ctx.body= "Error in fetching Data";
    });
}

router.get("/student",getStudentInfo);
//router.get('/teacher',)

app.use(router.routes());
app.use(bodyparser());
app.use(async ctx => {
    ctx.body = 'Page Not Found';
});
app.listen(3000, () => {
    console.log("sever starts running");
});


