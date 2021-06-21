const koa = require("koa");
const koarouter = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const json = require('koa-json');

const main = require('./main');

const app = new koa()
let router = new koarouter()
const port = 4001

router.get('/v1/passengers', main.createPassenger);
router.post('/v1/passengers', main.addPassenger);
router.put('/v1/passengers/:id', main.updatePassenger);

app.use(json())
app.use(bodyParser());
app.use(router.routes())
app.use(async (ctx) => {
    ctx.body = 'Invalid URL';
});
const server = app.listen(port, () => {
    console.log('server is running at port' + port)
});

module.exports = server;