"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTask = exports.createTask = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const validator_1 = __importDefault(require("validator"));
// import { Context } from 'koa';
// import { RouterContext } from "koa-router";
// import { DefaultState, Context } from "koa";
class Task {
    constructor(date, title, content) {
        this.id = uniqid_1.default();
        this.date = date;
        this.title = title;
        this.content = content;
        this.completed = false;
    }
}
const taskList = [];
const t1 = new Task(new Date(), "sop", "soc");
const t2 = new Task(new Date(), "book", "play");
taskList.push(t1);
taskList.push(t2);
const createTask = async (ctx) => {
    try {
        // let { title } = ctx.request.body;
        // let { content } = ctx.request.body;
        let data = ctx.request.body;
        let title = data.title;
        let content = data.content;
        let flag = false;
        if (typeof title !== "string" || typeof content !== "string") {
            flag = true;
        }
        if (!flag) {
            title = title.trim();
            content = content.trim();
        }
        if (flag ||
            !validator_1.default.isAlpha(title) ||
            title.length > 15 ||
            content.length > 45 ||
            title.length === 0 ||
            content.length === 0) {
            ctx.status = 401;
            ctx.message = "Task creation failed";
            ctx.type = "text/html";
            ctx.body = {
                msg: "Enter valid title and content! empty values are not allowed!",
                status: "fail",
            };
        }
        else {
            const task = new Task(new Date(), title, content);
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
    }
    catch (err) {
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
exports.createTask = createTask;
const getTask = async (ctx) => {
    try {
        if (taskList.length === 0) {
            ctx.status = 200;
            ctx.message = "Get all Task";
            ctx.type = "text/html";
            ctx.body = {
                status: "success",
                msg: "No Task Available",
            };
        }
        else {
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
    }
    catch (err) {
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
exports.getTask = getTask;
const getTaskById = async (ctx) => {
    try {
        const idd = ctx.params.id;
        let flag = false;
        let id = idd;
        if (typeof idd === "string") {
            flag = true;
            validator_1.default.blacklist(idd, "\\[\\]");
            validator_1.default.escape(idd);
            id = idd.trim();
        }
        if (!flag ||
            !validator_1.default.isAlphanumeric(id) ||
            id.length === 0 ||
            id === "") {
            ctx.status = 200;
            ctx.message = "NO Task available with this ID";
            ctx.type = "text/html";
            ctx.body = {
                msg: "not valid id",
                status: "fail",
            };
        }
        else {
            let i = 0;
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
            }
            else {
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
    }
    catch (err) {
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
exports.getTaskById = getTaskById;
const updateTask = async (ctx) => {
    try {
        const idd = ctx.params.id;
        let flag = false;
        let id = idd;
        if (typeof idd === "string") {
            flag = true;
            validator_1.default.blacklist(idd, "\\[\\]");
            validator_1.default.escape(idd);
            id = idd.trim();
        }
        if (!flag ||
            !validator_1.default.isAlphanumeric(id) ||
            id.length === 0 ||
            id === "") {
            ctx.status = 200;
            ctx.message = "NO Task available with this ID";
            ctx.type = "text/html";
            ctx.body = {
                status: "fail",
                msg: "ID field is invalid",
            };
        }
        else {
            let i = 0;
            for (; i < taskList.length; i += 1) {
                if (taskList[i].id === id)
                    break;
            }
            if (i === taskList.length) {
                ctx.status = 200;
                ctx.message = "Task NOT FOUND";
                ctx.type = "text/html";
                ctx.body = {
                    status: "fail",
                    msg: "Task NOT FOUND",
                };
            }
            else {
                let data = ctx.request.body;
                let title = data.title;
                let content = data.content;
                let flags = false;
                if (typeof title !== "string" || typeof content !== "string") {
                    flags = true;
                }
                if (!flags) {
                    title = title.trim();
                    content = content.trim();
                }
                if (flags ||
                    !validator_1.default.isAlpha(title) ||
                    title.length > 15 ||
                    content.length > 45 ||
                    title.length === 0 ||
                    content.length === 0) {
                    ctx.status = 401;
                    ctx.message = "Task Updation failed";
                    ctx.type = "text/html";
                    ctx.body = {
                        msg: "Enter valid title and content! empty values are not allowed",
                        status: "success",
                    };
                }
                else {
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
    }
    catch (err) {
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
exports.updateTask = updateTask;
const deleteTask = async (ctx) => {
    try {
        const idd = ctx.params.id;
        let flag = false;
        let id = idd;
        if (typeof idd === "string") {
            flag = true;
            validator_1.default.blacklist(idd, "\\[\\]");
            validator_1.default.escape(idd);
            id = idd.trim();
        }
        if (!flag ||
            !validator_1.default.isAlphanumeric(id) ||
            id.length === 0 ||
            id === "") {
            ctx.status = 200;
            ctx.message = "NO Task available with this ID";
            ctx.type = "text/html";
            ctx.body = {
                status: "fail",
                msg: "ID field is invalid",
            };
        }
        else {
            let i = 0;
            for (; i < taskList.length; i += 1) {
                if (taskList[i].id === id)
                    break;
            }
            if (i === taskList.length) {
                ctx.status = 200;
                ctx.message = "Task NOT Found";
                ctx.type = "text/html";
                ctx.body = {
                    status: "fail",
                    msg: "Task NOT FOUND",
                };
            }
            else {
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
    }
    catch (err) {
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
exports.deleteTask = deleteTask;
