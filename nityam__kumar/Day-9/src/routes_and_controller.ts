import uuid from "uniqid";

import Koa from "koa";

import validator from "validator";

// import { Context } from 'koa';

// import { RouterContext } from "koa-router";

// import { DefaultState, Context } from "koa";

class Task {
  id: string;
  date: Date;
  title: string;
  content: string;
  completed: boolean;

  constructor(date: Date, title: string, content: string) {
    this.id = uuid();
    this.date = date;
    this.title = title;
    this.content = content;
    this.completed = false;
  }
}

interface user_data {
  id?: string;
  date?: Date;
  title: string;
  content: string;
  completed?: boolean;
}

const taskList: Task[] = [];
const t1: Task = new Task(new Date(), "sop", "soc");
const t2: Task = new Task(new Date(), "book", "play");
taskList.push(t1);
taskList.push(t2);

export const createTask = async (ctx: any) => {
  try {
    // let { title } = ctx.request.body;
    // let { content } = ctx.request.body;

    let data: user_data = ctx.request.body;

    let title = data.title;
    let content = data.content;

    let flag: boolean = false;
    if (typeof title !== "string" || typeof content !== "string") {
      flag = true;
    }
    if (!flag) {
      title = title.trim();
      content = content.trim();
    }
    if (
      flag ||
      !validator.isAlpha(title) ||
      title.length > 15 ||
      content.length > 45 ||
      title.length === 0 ||
      content.length === 0
    ) {
      ctx.status = 401;
      ctx.message = "Task creation failed";
      ctx.type = "text/html";
      ctx.body = {
        msg: "Enter valid title and content! empty values are not allowed!",
        status: "fail",
      };
    } else {
      const task: Task = new Task(new Date(), title, content);
      taskList.push(task);
      // console.log(task);
      ctx.status = 201;
      ctx.message = "Task created successfully";
      ctx.type = "text/html";
      ctx.body = {
        msg: "Task created successfully!",
        status: "success",
      };
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.message = "task creation failed";
    ctx.type = "text/html";
    ctx.body = {
      msg: "internal server error",
      status: "fail",
    };
  }
};

export const getTask = async (ctx: any) => {
  try {
    if (taskList.length === 0) {
      ctx.status = 200;
      ctx.message = "Get all Task";
      ctx.type = "text/html";
      ctx.body = {
        status: "success",
        msg: "No Task Available",
      };
    } else {
      ctx.status = 200;
      ctx.message = "All Task List";
      ctx.type = "text/html";
      ctx.body = {
        status: "success",
        task: taskList,
        msg: "received all tasks",
      };
      // JSON.stringify(taskList)
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.message = "failed";
    ctx.type = "text/html";
    ctx.body = {
      msg: "internal server error",
      status: "fail",
    };
  }
};

export const getTaskById = async (ctx: any) => {
  try {
    const idd: string = ctx.params.id;
    let flag: boolean = false;
    let id: string = idd;
    if (typeof idd === "string") {
      flag = true;
      validator.blacklist(idd, "\\[\\]");
      validator.escape(idd);
      id = idd.trim();
    }

    if (
      !flag ||
      !validator.isAlphanumeric(id) ||
      id.length === 0 ||
      id === ""
    ) {
      ctx.status = 200;
      ctx.message = "NO Task available with this ID";
      ctx.type = "text/html";
      ctx.body = {
        msg: "not valid id",
        status: "fail",
      };
    } else {
      let i: number = 0;
      for (; i < taskList.length; i += 1) {
        if (id === taskList[i].id) {
          break;
        }
      }
      if (i === taskList.length) {
        ctx.status = 200;
        ctx.message = "Task NOT Found";
        ctx.type = "text/html";
        ctx.body = {
          msg: "Task NOT Found",
          status: "fail",
        };
      } else {
        // console.log(taskList[i]);
        ctx.status = 200;
        ctx.message = "Task Found";
        ctx.type = "text/html";
        ctx.body = {
          status: "success",
          task: taskList[i],
          msg: "received task",
        };
      }
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.message = "failed";
    ctx.type = "text/html";
    ctx.body = {
      msg: "internal server error",
      status: "fail",
    };
  }
};

export const updateTask = async (ctx: any) => {
  try {
    const idd: string = ctx.params.id;
    let flag: boolean = false;
    let id: string = idd;
    if (typeof idd === "string") {
      flag = true;
      validator.blacklist(idd, "\\[\\]");
      validator.escape(idd);
      id = idd.trim();
    }

    if (
      !flag ||
      !validator.isAlphanumeric(id) ||
      id.length === 0 ||
      id === ""
    ) {
      ctx.status = 200;
      ctx.message = "NO Task available with this ID";
      ctx.type = "text/html";
      ctx.body = {
        status: "fail",
        msg: "ID field is invalid",
      };
    } else {
      let i: number = 0;
      for (; i < taskList.length; i += 1) {
        if (taskList[i].id === id) break;
      }
      if (i === taskList.length) {
        ctx.status = 200;
        ctx.message = "Task NOT FOUND";
        ctx.type = "text/html";
        ctx.body = {
          status: "fail",
          msg: "Task NOT FOUND",
        };
      } else {
        let data: user_data = ctx.request.body;
        let title = data.title;
        let content = data.content;

        let flags: boolean = false;
        if (typeof title !== "string" || typeof content !== "string") {
          flags = true;
        }
        if (!flags) {
          title = title.trim();
          content = content.trim();
        }
        if (
          flags ||
          !validator.isAlpha(title) ||
          title.length > 15 ||
          content.length > 45 ||
          title.length === 0 ||
          content.length === 0
        ) {
          ctx.status = 401;
          ctx.message = "Task Updation failed";
          ctx.type = "text/html";
          ctx.body = {
            msg: "Enter valid title and content! empty values are not allowed",
            status: "success",
          };
        } else {
          taskList[i].title = title;
          taskList[i].content = content;
          //   console.log(taskList[i]);
          ctx.status = 200;
          ctx.message = "Task Updated Successfully";
          ctx.type = "text/html";
          ctx.body = {
            msg: "Task Updated Successfully",
            status: "success",
          };
        }
      }
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.message = "failed";
    ctx.type = "text/html";
    ctx.body = {
      msg: "internal server error",
      status: "fail",
    };
  }
};

export const deleteTask = async (ctx: any) => {
  try {
    const idd: string = ctx.params.id;
    let flag: boolean = false;
    let id: string = idd;
    if (typeof idd === "string") {
      flag = true;
      validator.blacklist(idd, "\\[\\]");
      validator.escape(idd);
      id = idd.trim();
    }

    if (
      !flag ||
      !validator.isAlphanumeric(id) ||
      id.length === 0 ||
      id === ""
    ) {
      ctx.status = 200;
      ctx.message = "NO Task available with this ID";
      ctx.type = "text/html";
      ctx.body = {
        status: "fail",
        msg: "ID field is invalid",
      };
    } else {
      let i: number = 0;
      for (; i < taskList.length; i += 1) {
        if (taskList[i].id === id) break;
      }
      if (i === taskList.length) {
        ctx.status = 200;
        ctx.message = "Task NOT Found";
        ctx.type = "text/html";
        ctx.body = {
          status: "fail",
          msg: "Task NOT FOUND",
        };
      } else {
        // const temp = taskList[i];
        taskList.splice(i, 1);
        ctx.status = 200;
        ctx.message = "Task Deleted Successfully";
        ctx.type = "text/html";
        ctx.body = {
          status: "success",
          msg: "Task Deleted Successfully",
        };
      }
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.message = "failed";
    ctx.type = "text/html";
    ctx.body = {
      msg: "internal server error",
      status: "fail",
    };
  }
};
