/* eslint-disable */
const Koa = require("koa");
const koaRouter = require("@koa/router");
const uniqid = require("uniqid");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new koaRouter();

const port = 3001;

const taskList = {};

class Task {
  constructor(title, completed) {
    this.id = uniqid();
    this.date = new Date().toJSON().slice(0, 10);
    this.title = title;
    this.completed = completed;
  }
}

// const task1 = new Task('maths', false);
// taskList[task1.id]=task1;                       //commenting to test get all tasks

function validateData(data) {
  if (
    typeof data.title === "string" &&
    typeof data.completed === "boolean" &&
    data.title.trim() !== ""
  ) {
    return true;
  }
  return false;
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

router.get("/todo/welcome", (ctx) => {
  // welcome message
  console.log("Got request =>", {
    method: ctx.request.method,
    path: ctx.request.url,
    body: ctx.request.body,
  });
  goodResponse(ctx, "text/html", "WELCOME TO TODO_API");
});

router.post("/todo", (ctx) => {
  // create new task
  console.log("Got request =>", {
    method: ctx.request.method,
    path: ctx.request.url,
    body: ctx.request.body,
  });

  const req = ctx.request;

  if (validateData(req.body)) {
    const task = new Task(req.body.title, req.body.completed);
    id = task.id;
    taskList[id] = task;

    goodResponse(ctx, "application/json", task);
  } else {
    badResponse(ctx, "text/html", "Task Creation Failed, Provide Correct data");
  }
});

router.get("/todo/:id", (ctx) => {
  // list by id
  console.log("Got request =>", {
    method: ctx.request.method,
    path: ctx.request.url,
    body: ctx.request.body,
  });
  const id = ctx.params.id;

  if (Object.prototype.hasOwnProperty.call(taskList, id)) {
    goodResponse(ctx, "application/json", taskList[id]);
  } else {
    badResponse(ctx, "text/html", "task dosent exists");
  }
});

router.get("/todo", (ctx) => {
  // get alltasks
  console.log("Got request =>", {
    method: ctx.request.method,
    path: ctx.request.url,
    body: ctx.request.body,
  });
  if (Object.keys(taskList).length === 0) {
    goodResponse(ctx, "text/html", "No entries to display.");
  } else {
    goodResponse(ctx, "application/json", taskList);
  }
});

router.put("/todo/:id", (ctx) => {
  // update by id
  const id = ctx.params.id;

  if (Object.prototype.hasOwnProperty.call(taskList, id) === false) {
    badResponse(ctx, "text/html", "Entry dosent exists");
    return;
  }

  const req = ctx.request;
  if (validateData(req.body)) {
    taskList[id].title = req.body.title;
    taskList[id].completed = req.body.completed;

    goodResponse(ctx, "application/json", taskList[id]);
  } else {
    badResponse(ctx, "text/html", "Task Update Failed, Provide Correct data");
  }
});

router.delete("/todo/:id", (ctx) => {
  // delete task
  console.log("Got request =>", {
    method: ctx.request.method,
    path: ctx.request.url,
    body: ctx.request.body,
  });

  const id = ctx.params.id;

  if (Object.prototype.hasOwnProperty.call(taskList, id) === false) {
    badResponse(ctx, "text/html", "Entry dosent exists, Deletion not possible");
    return;
  }

  delete taskList[id];
  goodResponse(ctx, "text/html", "Delete Successful");
});

app.use(bodyParser());
app.use(router.routes());
app.use(async (ctx) => {
  ctx.body = "Invalid URL";
});

const server = app.listen(port, console.log("port on ", port));

module.exports = server;
