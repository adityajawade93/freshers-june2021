const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const { v4: uuidv4 } = require('uuid');

const app = new Koa();

const router = new Router();

app
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes());

class ToDo {
  constructor(id, createdDate, title, completed) {
    this.id = id;
    this.createdDate = createdDate;
    this.title = title;
    this.completed = completed;
  }
}

const todos = [];

// helper funtions
function validUserInputTodoData(data) {
  if (!data || !data.title || !data.title.trim()) return false;
  return true;
}

function getTodoIndex(id) {
  for (let index = 0; index < todos.length; index += 1) {
    const todo = todos[index];
    if (todo.id === id) return index;
  }
  return -1;
}

function constructDate(date) {
  const dateParts = date.split('/');
  try {
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];

    const dateObject = new Date(year, month - 1, day);
    if (!Number.isNaN(dateObject.getTime())) return dateObject;
    return null;
  } catch (e) {
    return null;
  }
}

// route functions
async function addTodo(ctx) {
  const data = ctx.request.body;

  if (validUserInputTodoData(data)) {
    const id = uuidv4();
    const createdDate = new Date();
    const { title } = data;
    const completed = false;

    const todo = new ToDo(id, createdDate, title, completed);
    todos.push(todo);

    ctx.body = todo;
  } else {
    ctx.status = 404;
    ctx.body = 'Invalid data';
  }
}

async function updateTodo(ctx) {
  const data = ctx.request.body;
  const { id } = ctx.params;

  const todoIndex = getTodoIndex(id);

  if (todoIndex !== -1) {
    if (Object.prototype.hasOwnProperty.call(data, 'createdDate')) {
      const date = constructDate(data.createdDate);
      if (date) todos[todoIndex].createdDate = date;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'title')) {
      todos[todoIndex].title = data.title;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'completed') && typeof data.completed === 'boolean') {
      todos[todoIndex].completed = data.completed;
    }
    ctx.body = todos[todoIndex];
  } else {
    ctx.status = 404;
    ctx.body = `ToDo with id: ${id} not found`;
  }
}

async function getToDos(ctx) {
  ctx.body = todos;
}

async function getToDo(ctx) {
  const { id } = ctx.params;

  const todoIndex = getTodoIndex(id);

  if (todoIndex !== -1) ctx.body = todos[todoIndex];
  else {
    ctx.status = 404;
    ctx.body = `ToDo with id: ${id} not found`;
  }
}

async function deleteToDo(ctx) {
  const { id } = ctx.params;

  const todoIndex = getTodoIndex(id);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    ctx.body = `ToDo with id: ${id} is deleted`;
  } else {
    ctx.status = 404;
    ctx.body = `ToDo with id: ${id} not found`;
  }
}

// routes
router.post('/todo', addTodo);
router.put('/todo/:id', updateTodo);
router.get('/todo', getToDos);
router.get('/todo/:id', getToDo);
router.delete('/todo/:id', deleteToDo);

app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = 'Page not found';
});

module.exports = {
  app,
  validUserInputTodoData,
  constructDate,
};
