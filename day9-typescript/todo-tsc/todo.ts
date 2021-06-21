import Koa from "koa";
import koaRouter from "@koa/router";
import uniqid from "uniqid";
import bodyParser from "koa-bodyparser";
import DefaultContext from "koa";
const app = new Koa();
const router = new koaRouter();

const port: number = 3001;
type ToDoSchema = {
  id: string;
  date: Date;
  title: string;
  completed: boolean;
};
interface newReq {
  title: string;
  completed: boolean;
}

class Task {
  id: string;
  date: Date;
  title: string;
  completed: boolean;
  constructor(title: string, completed: boolean) {
    this.id = uniqid();
    this.date = new Date();
    this.title = title;
    this.completed = completed;
  }
}

const taskList = {} as Record<string, Task>;
// const task1 = new Task('maths', false);
// taskList[task1.id]=task1;                       //commenting to test get all tasks

function validateData(data: newReq| Record<string, unknown>): boolean {
  if (
    typeof data.title === "string" &&
    typeof data.completed === "boolean" &&
    data.title.trim() !== ""
  ) {
    return true;
  }
  return false;
}

function goodResponse(
  ctx: Koa.ParameterizedContext<
    any,
    koaRouter.RouterParamContext<any, {}>, any>,
  type: string,
  message: Task | string | Record<string, Task>
) {
  //console.log(typeof ctx === typeof DefaultContext);
  ctx.response.status = 200;
  ctx.response.type = type;
  ctx.body = message;
}

function badResponse(
  ctx: Koa.ParameterizedContext<
    any,
    koaRouter.RouterParamContext<any, {}>,
    any
  >,
  type: string,
  message: string
) {
  ctx.response.status = 400;
  ctx.response.type = type;
  ctx.body = message;
}

router.get("/todo/welcome", (ctx: any) => {
  // welcome message
  console.log("Got request =>", {
    method: ctx.request.method,
    path: ctx.request.url,
    body: ctx.request.body,
  });
  goodResponse(ctx, "text/html", "WELCOME TO TODO_API");
});

router.post(
  "/todo",
  (
    ctx: Koa.ParameterizedContext<
      any,
      koaRouter.RouterParamContext<any, {}>,
      any
    >
  ) => {
    // create new task
    console.log("Got request =>", {
      method: ctx.request.method,
      path: ctx.request.url,
      body: ctx.request.body,
    });

   
    const reqData = <unknown>ctx.request.body;
	   const data = <newReq>reqData;
      
    if (validateData(data)) {
      const task = new Task(data.title,data.completed);
      const id = task.id;
      taskList[id] = task;

      goodResponse(ctx, "application/json", task);
    } else {
      badResponse(
        ctx,
        "text/html",
        "Task Creation Failed, Provide Correct data"
      );
    }
  }
);

router.get(
  "/todo/:id",
  (
    ctx: Koa.ParameterizedContext<
      any,
      koaRouter.RouterParamContext<any, {}>,
      any
    >
  ) => {
    // list by id
    console.log("Got request =>", {
      method: ctx.request.method,
      path: ctx.request.url,
      body: ctx.request.body,
    });
    const id: string = ctx.params.id;

    if (Object.prototype.hasOwnProperty.call(taskList, id)) {
      goodResponse(ctx, "application/json", taskList[id]);
    } else {
      badResponse(ctx, "text/html", "task dosent exists");
    }
  }
);

router.get(
  "/todo",
  (
    ctx: Koa.ParameterizedContext<
      any,
      koaRouter.RouterParamContext<any, {}>,
      any
    >
  ) => {
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
  }
);

router.put(
  "/todo/:id",
  (
    ctx: Koa.ParameterizedContext<
      any,
      koaRouter.RouterParamContext<any, {}>,
      any
    >
  ) => {
    // update by id
    const id: string = ctx.params.id;

    if (Object.prototype.hasOwnProperty.call(taskList, id) === false) {
      badResponse(ctx, "text/html", "Entry dosent exists");
      return;
    }

    
    const reqData = <unknown>ctx.request.body;
	   const data = <newReq>reqData;
    if (validateData(data)) {
      taskList[id].title = data.title;
      taskList[id].completed = data.completed;

      goodResponse(ctx, "application/json", taskList[id]);
    } else {
      badResponse(ctx, "text/html", "Task Update Failed, Provide Correct data");
    }
  }
);

router.delete("/todo/:id", (ctx: any) => {
  // delete task
  console.log("Got request =>", {
    method: ctx.request.method,
    path: ctx.request.url,
    body: ctx.request.body,
  });

  const id: string = ctx.params.id;

  if (Object.prototype.hasOwnProperty.call(taskList, id) === false) {
    badResponse(ctx, "text/html", "Entry dosent exists, Deletion not possible");
    return;
  }

  delete taskList[id];
  goodResponse(ctx, "text/html", "Delete Successful");
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(
  async (
    ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>
  ) => {
    ctx.body = "Invalid URL";
  }
);

const server = app.listen(port, () => console.log("port on ", port));

module.exports = server;
