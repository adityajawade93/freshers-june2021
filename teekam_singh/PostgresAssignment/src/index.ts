import Koa from 'koa';
import koaBody from 'koa-body';
const combineRouters = require('koa-combine-routers');

const app = new Koa();
const port = 3000;

const classs = require('./routes/class');
const result = require('./routes/result');
const schedule = require('./routes/schedule');
const student = require('./routes/student');
const subject = require('./routes/subject');
const teacher = require('./routes/teacher');

const router = combineRouters(classs, result, schedule, student, subject, teacher);

app.use(koaBody());
app.use(router());

const server = app.listen(port, () => {
    console.log('started');
});

module.exports = server;
