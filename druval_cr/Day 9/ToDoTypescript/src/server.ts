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

interface ToDoReqI {
  id?: string;
  createdDate?: string;
  title?: string;
  completed?: boolean;
}

class ToDo{
  id: string;
  createdDate: Date;
  title: string;
  completed: boolean;

  constructor(id: string, createdDate: Date, title: string, completed: boolean) {
    this.id = id;
    this.createdDate = createdDate;
    this.title = title;
    this.completed = completed;
  }
}

let todos: ToDo[] = [];

// helper funtions
function validUserInputTodoData(data: ToDoReqI): data is {title: string} {
  if (!data || !data.title || !data.title.trim()) return false;
  return true;
}

function getTodoIndex(id: string) {
  for (let index: number = 0; index < todos.length; index += 1) {
    const todo: ToDo = todos[index];
    if (todo.id === id) return index;
  }
  return -1;
}

function constructDate(date: string | undefined) {
  if (!date) return null;
  const dateParts: string[] = date.split('/');
  try {
    const day: number = parseInt(dateParts[0]);
    const month: number = parseInt(dateParts[1]);
    const year: number = parseInt(dateParts[2]);

    const dateObject: Date = new Date(year, month - 1, day);
    if (!Number.isNaN(dateObject.getTime())) return dateObject;
    return null;
  } catch (e) {
    return null;
  }
}

// route functions
async function addTodo(ctx: any) {
  const data: ToDoReqI = ctx.request.body;

  if (validUserInputTodoData(data)) {
    const id: string = uuidv4();
    const createdDate: Date = new Date();
    const title: string = data.title;
    const completed: boolean = false;

    const todo: ToDo = new ToDo(id, createdDate, title, completed);
    todos.push(todo);

    ctx.body = todo;
  } else {
    ctx.status = 400;
    ctx.body = 'Invalid data';
  }
}

async function updateTodo(ctx: any) {
  const data: ToDoReqI = ctx.request.body;
  const id: string = ctx.params.id;

  const todoIndex: number = getTodoIndex(id);

  if (todoIndex !== -1) {
    if (Object.prototype.hasOwnProperty.call(data, 'createdDate')) {
      const date: Date | null = constructDate(data.createdDate);
      if (date) todos[todoIndex].createdDate = date;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'title') && data.title) {
      todos[todoIndex].title = data.title;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'completed') && typeof data.completed === 'boolean') {
      todos[todoIndex].completed = data.completed;
    }
    ctx.body = todos[todoIndex];
  } else {
    ctx.status = 400;
    ctx.body = `ToDo with id: ${id} not found`;
  }
}

async function getToDos(ctx: any) {
  ctx.body = todos;
}

async function getToDo(ctx: any) {
  const id: string = ctx.params.id;

  const todoIndex: number = getTodoIndex(id);

  if (todoIndex !== -1) ctx.body = todos[todoIndex];
  else {
    ctx.status = 400;
    ctx.body = `ToDo with id: ${id} not found`;
  }
}

async function deleteToDo(ctx: any) {
  const id: string = ctx.params.id;

  const todoIndex: number = getTodoIndex(id);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    ctx.body = `ToDo with id: ${id} is deleted`;
  } else {
    ctx.status = 400;
    ctx.body = `ToDo with id: ${id} not found`;
  }
}

// routes
router.post('/todo', addTodo);
router.put('/todo/:id', updateTodo);
router.get('/todo', getToDos);
router.get('/todo/:id', getToDo);
router.delete('/todo/:id', deleteToDo);

app.use(async (ctx: any) => {
  ctx.status = 404;
  ctx.body = 'Page not found';
});

const port: number = 3000;

app.listen(port, () => {
  console.log('server is active on port', port);
});