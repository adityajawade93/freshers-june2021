const koa = require('koa')
const koarouter = require('@koa/router')

const uuid = require('uniqid')
const bodyParser = require('koa-bodyparser')

let app = new koa()
let router = new koarouter()
const port = 4001


const emptyArr = []


class Task {
  constructor(title, content, completed) {
    this.id = uuid();
    this.date = new Date();
    this.title = title;
    this.content = content;
    this.completed = completed;

  }
}

let task1 = new Task('maths', 'algebra', false);
emptyArr.push(task1);

let task2 = new Task('Physics', 'Mechanics', true);
emptyArr.push(task2);

function getId(id) {
  var i = 0;
  for (i = 0; i < emptyArr.length; i++) {
    if (emptyArr[i].id === id)
      break;
  }
  if (i === emptyArr.length)
    return -1;
  else
    return i;
}

router.get('/todo', (ctx) => {
  ctx.response.status = 200;
  ctx.response.type = 'application/json';
  ctx.body = JSON.stringify(emptyArr, null, 2);
});

router.get('/todo/:id', (ctx) => {
  var id = ctx.url.substring(6);
  let i = getId(id);
  if (i === -1) {
    ctx.response.status = 404;
    ctx.response.type = 'text/html';
    ctx.body = { message: "Not Found" };
  }
  else {
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = JSON.stringify(emptyArr[i]);
  }
});


router.post('/todo', (ctx) => {
  const res = ctx.request
  if (typeof res.body.title === 'string' && typeof res.body.content === 'string' && typeof res.body.completed === 'boolean' && res.body.title.trim() !== '') {
    const task = new Task(res.body.title, res.body.content, res.body.completed);
    emptyArr.push(task);

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = task;
  }
  else {
    ctx.response.status = 404;
    ctx.response.type = 'text/html';
    ctx.body = 'invalid data';
  }
});

router.put('/todo/:id', (ctx) => {
  const res = ctx.request
  var id = ctx.url.substring(6);
  let i = getId(id)
  if (i === -1) {
    ctx.response.status = 404;
    ctx.response.type = 'text/html';
    ctx.body = 'invalid data';
  }
  else {
    if (typeof res.body.title === 'string' && typeof res.body.content === 'string' && typeof res.body.completed === 'boolean' && res.body.title.trim() !== '') {
      emptyArr[i].title = res.body.title;
      emptyArr[i].content = res.body.content;
      emptyArr[i].completed = res.body.completed;

      ctx.response.status = 200;
      ctx.response.type = 'text/html';
      ctx.body = 'data updated';
    }
    else {
      ctx.response.status = 404;
      ctx.response.type = 'text/html';
      ctx.body = 'invalid data';
    }
  }
})
router.delete('/todo/:id', (ctx) => {
  var id = ctx.url.substring(6);
  let i = getId(id)
  if (i === -1) {
    ctx.response.status = 404;
    ctx.response.type = 'text/html';
    ctx.body = 'invalid data';
  }
  else {
    emptyArr.splice(i, 1);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data deleted';
  }
})

app.use(bodyParser());
app.use(router.routes())
app.use(async (ctx) => {
  ctx.body = 'Invalid URL';
});
app.listen(port, () => {
  console.log('server is running at port'+port)
});

module.exports = app;