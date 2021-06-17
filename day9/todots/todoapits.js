var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var koa = require('koa');
var koarouter = require('@koa/router');
var fs = require('fs');
var uniqid = require('uniqid');
var bodyparser = require('koa-bodyparser');
var app = new koa();
var router = new koarouter();
var todomap = new Map();
var todo = /** @class */ (function () {
    function todo(todotask, completed) {
        this.id = uniqid();
        this.date = new Date();
        this.todotask = todotask;
        this.completed = completed;
    }
    return todo;
}());
var task1 = new todo('read a book', false);
var task2 = new todo('watch movie', false);
todomap.set(task1.id, task1);
todomap.set(task2.id, task2);
router.get('/todo', function (ctx, next) {
    console.log('got here');
    //changed this obj in index.js file
    //var obj = Object.fromEntries(todomap)
    ctx.body = JSON.stringify(todomap, null, 2);
});
router.get('/todo/:id', function (ctx, next) {
    var id = ctx.params.id;
    if (id.trim().length == 0) {
        ctx.body = 'id is not given properly please give a proper id ';
        return;
    }
    if (todomap.has(id)) {
        var obj = todomap.get(id);
        ctx.body = JSON.stringify(obj, null, 2);
    }
    else {
        ctx.body = 'error,id not found';
    }
});
router.post('/todo', function (ctx, next) {
    var reqtask = ctx.request.body.todotask;
    var reqcomplete = ctx.request.body.completed;
    if (reqtask === null || typeof reqtask != 'string' || typeof reqcomplete != 'boolean') {
        ctx.body = 'please give a proper task';
        return;
    }
    else {
        var task = new todo(reqtask, reqcomplete);
        todomap.set(task.id, task);
        ctx.body = task;
    }
});
router.put('/todo/:id', function (ctx, next) {
    var id = ctx.params.id;
    console.log(typeof id + "  " + id.length);
    if (id.trim().length == 0) {
        ctx.body = 'id is not given properly please give a proper id ';
        return;
    }
    if (todomap.has(id)) {
        var reqtask = ctx.request.body.todotask;
        var reqcomplete = ctx.request.body.completed;
        if (reqtask === null || typeof reqtask != 'string' || typeof reqcomplete != 'boolean') {
            ctx.body = 'please give a proper task';
            return;
        }
        else if (reqtask.trim().length == 0) {
            ctx.body = 'please give a proper task';
            return;
        }
        else {
            var task = todomap.get(id);
            if (task != null) {
                task.todotask = reqtask;
                task.completed = reqcomplete;
                todomap.set(id, task);
                ctx.body = task;
            }
        }
    }
    else {
        ctx.body = '404,task not found';
    }
});
router["delete"]('/todo/:id', function (ctx, next) {
    var id = ctx.params.id;
    if (id.trim().length == 0) {
        ctx.body = 'id is not given properly please give a proper id ';
        return;
    }
    var maplength = todomap.size;
    if (todomap.has(id)) {
        todomap["delete"](id);
    }
    else {
        ctx.body = '404,task not found';
        return;
    }
    if (todomap.size == maplength) {
        ctx.body = '404,task not deleted';
    }
    else {
        ctx.body = 'task deleted successfully';
    }
});
app.use(bodyparser());
app.use(router.routes());
app.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = 'hi i am sujit';
        return [2 /*return*/];
    });
}); });
app.listen(3001);
module.exports = app;
