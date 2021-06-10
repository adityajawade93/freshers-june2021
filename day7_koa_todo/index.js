/* eslint-disable */
const Koa = require('koa');
const koaRouter = require('@koa/router');
const uniqid = require('uniqid');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new koaRouter();

const port = 3001;

const taskList = [];

class Task {
  constructor(title, completed) {
    this.id = uniqid();
    this.date = new Date();
    this.title = title;
    this.completed = completed;
  }
}

const task1 = new Task('maths', false);
taskList.push(task1);

function validateData(data) {
  if (typeof data.title === 'string' && typeof data.completed === 'boolean' && data.title.trim() !== '') { return true; }
  return false;
}

function findTask(id) {
  let i = 0;
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) { break; }
  }
  if (i === taskList.length) return -1;
  return i;
}

function goodResponse(ctx, type, message) {
  ctx.response.status = 200;
  ctx.response.type = type;
  ctx.body = message;
}

function badResponse(ctx, type, message) {
  ctx.response.status = 400;
  ctx.response.type = type;
  ctx.body = message;
}

router.get('/todo/welcome', (ctx) => { // welcome message
  goodResponse(ctx, 'text/html', 'WELCOME TO TODO_API');
});

router.post('/todo', (ctx) => { // create new task
  const req = ctx.request;
  if (validateData(req.body)) {
    const task = new Task(req.body.title, req.body.completed);
    taskList.push(task);

    goodResponse(ctx, 'application/json', task);
  } else {
    badResponse(ctx, 'text/html', 'Task Creation Failed, Provide Correct data');
  }
});

router.get('/todo/:id', (ctx) => { // list by id
  const { id } = ctx.params;
  const i = findTask(id);
  if (i === -1) {
    badResponse(ctx, 'text/html', 'ID Not Found');
  } else {
    goodResponse(ctx, 'application/json', JSON.stringify(taskList[i]));
  }
});

router.get('/todo', (ctx) => { // get alltasks
  goodResponse(ctx, 'application/json', JSON.stringify(taskList, null, 2));
});

router.put('/todo/:id', (ctx) => { // update by id
  const { id } = ctx.params;
  const i = findTask(id);
  if (i === -1) {
    badResponse(ctx, 'text/html', 'ID Not Found');
  } else {
    const req = ctx.request;
    if (validateData(req.body)) {
      taskList[i].title = req.body.title;
      taskList[i].completed = req.body.completed;

      goodResponse(ctx, 'text/html', 'Update Successful');
    } else {
      badResponse(ctx, 'text/html', 'Task Update Failed, Provide Correct data');
    }
  }
});

router.delete('/todo/:id', (ctx) => { // delete task
  const { id } = ctx.params;
  const i = findTask(id);
  if (i === -1) {
    ctx.response.status = 404;
    ctx.response.type = 'text/html';
    ctx.body = 'Task Not Found';
  } else {
    taskList.splice(i, 1);
    goodResponse(ctx, 'text/html', 'Delete Successful');
  }
});

app.use(bodyParser());
app.use(router.routes());
app.use(async (ctx) => {
  ctx.body = 'Invalid URL';
});

app.listen(port, console.log('port on ', port));

module.exports = app;
