const Koa = require('koa');
const uuid = require('uniqid');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');

const port = 8000;

const app = new Koa();
const router = new KoaRouter();

app.use(json());
app.use(bodyParser());

class Todo {
  constructor(id, date, title, completed) {
    this.id = id;
    this.createdDate = date;
    this.title = title;
    this.completed = completed;
  }
}

const todoList = [];
let todo = new Todo(uuid(), Date.now(), 'chess', false);
todoList.push(todo);
todo = new Todo(uuid(), Date.now(), 'carrom', true);
todoList.push(todo);

router.get('/todo/:id', (ctx) => {
  const { id } = ctx.params;
  let obj;
  for (let i = 0; i < todoList.length; i += 1) {
    if (todoList[i].id === id) {
      obj = todoList[i];
      break;
    }
  }
  if (obj === undefined) {
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.body = 'id not found';
  } else {
    ctx.response.type = 'application/json';
    ctx.response.status = 200;
    ctx.body = JSON.stringify(obj);
  }
});

router.get('/todo', (ctx) => {
  ctx.response.type = 'application/json';
  ctx.response.status = 200;
  ctx.body = JSON.stringify(todoList);
});

router.post('/todo', (ctx) => {
  const { body } = ctx.request;

  if (typeof (body.title) !== 'string' || typeof (body.completed) !== 'boolean') {
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.body = 'invalid data in request';
  } else if (body.title === '') {
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.body = 'please give a valid non-empty title';
  } else {
    const newtodo = new Todo(uuid(), Date.now(), body.title, body.completed);
    todoList.push(newtodo);

    ctx.response.type = 'application/json';
    ctx.response.status = 200;
    ctx.body = JSON.stringify(newtodo);
    ctx.body.title = newtodo.title;
    ctx.body.completed = newtodo.completed;
  }
});

router.put('/todo/:id', (ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  if (typeof (id) !== 'string' || typeof (body.title) !== 'string' || typeof (body.completed) !== 'boolean' || body.title.trim() === '') {
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.body = 'invalid data in request';
  } else {
    let index = -1;

    for (let i = 0; i < todoList.length; i += 1) {
      if (todoList[i].id === id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      ctx.response.type = 'text/html';
      ctx.response.status = 500;
      ctx.body = 'id not found';
    } else {
      todoList[index].createdDate = Date.now();
      todoList[index].title = body.title;
      todoList[index].completed = body.completed;

      ctx.response.type = 'application/json';
      ctx.response.status = 200;
      ctx.body = JSON.stringify(todoList);
    }
  }
});

router.delete('/todo/:id', (ctx) => {
  const { id } = ctx.params;

  if (typeof (id) !== 'string') {
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.body = 'invalid data in request';
  } else {
    let index = -1;

    for (let i = 0; i < todoList.length; i += 1) {
      if (todoList[i].id === id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      ctx.response.type = 'text/html';
      ctx.response.status = 500;
      ctx.body = 'id not found';
    } else {
      todoList.splice(index, 1);
      ctx.response.type = 'application/json';
      ctx.response.status = 200;
      ctx.body = JSON.stringify(todoList);
    }
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is running at port ${port}`);
});

module.exports = app;
