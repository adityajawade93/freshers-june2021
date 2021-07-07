import Koa = require("koa");
import koaRouter = require("koa-router");
import uniqid = require("uniqid");
import bodyParser = require("koa-bodyparser");
import client = require("../db/db");



const app = new Koa();
const router = new koaRouter();
const port = 3001;

router.post("/teachers", async (ctx) => {

    const query = 'insert into classes values(0003,0014,0113)';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.post("/subject", async (ctx) => {

    const query = 'insert into classes values(0003,0014,0113)';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.post("/student", async (ctx) => {

    const query = 'insert into classes values(0003,0014,0113)';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.post("/mark", async (ctx) => {

    const query = 'insert into classes values(0003,0014,0113)';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.post("/classes", async (ctx) => {

    const query = 'insert into classes values(0003,0014,0113)';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});


router.get("/teachers", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.get("/subject", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.get("/student", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.get("/mark", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.get("/classes", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});


router.get("/teachers/:teacher_id", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.get("/subject/:sub_id", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});


router.get("/student/:st_id", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

//st_id, sub_id wala kaise karenge
router.get("/mark/:st_id", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});

router.get("/classes/:cl_no", async (ctx) => {

    const query = 'select * from classes';

    const { rows } = await client.dbQuery(query);
    console.log(rows);

});


app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>) => {
    ctx.body = "Invalid URL";
});

const server = app.listen(port, () => console.log("port on ", port));

module.exports = server;

