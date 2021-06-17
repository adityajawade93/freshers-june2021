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
var koarouter = require("@koa/router");
var bodyParser = require('koa-bodyparser');
var uniq = require('uniqid');
var app = new koa();
var router = new koarouter();
var port = 3001;
var todo = /** @class */ (function () {
    function todo(title, completed) {
        this.id = uniq();
        this.date = new Date();
        this.title = title;
        this.completed = completed;
    }
    return todo;
}());
var task_array = [];
var todo_1 = new todo('content', false);
task_array.push(todo_1);
var todo_2 = new todo('cont', false);
task_array.push(todo_2);
function findTask(id) {
    var i = 0;
    for (i = 0; i < task_array.length; i++) {
        if (task_array[i].id == id)
            break;
    }
    if (i == task_array.length)
        return -1;
    else
        return i;
}
router.get('/todo', function (ctx, next) {
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = JSON.stringify(task_array, null, 2);
});
router.get('/todo/:id', function (ctx, next) {
    var id = ctx.url.substring(6);
    var i = findTask(id);
    if (i === -1) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
        ctx.body = { message: "Not Found" };
    }
    else {
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = JSON.stringify(task_array[i]);
    }
});
router.post('/todo', function (ctx, next) {
    var data = ctx.request.body;
    if (data.title === undefined || data.completed === undefined) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
        ctx.body = 'not enough details';
    }
    else if (typeof data.title !== 'string' || typeof data.completed !== 'boolean' || data.title.trim() === '') {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
        ctx.body = 'invalid data';
    }
    else {
        var task = new todo(data.title, data.completed);
        task_array.push(task);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = task;
    }
});
router.put('/todo/:id', function (ctx, next) {
    var id = ctx.url.substring(6);
    var i = findTask(id);
    if (i === -1) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
        ctx.body = 'something wrong with id';
    }
    else {
        var data = ctx.request.body;
        if (data.title === undefined || data.completed === undefined) {
            ctx.response.status = 404;
            ctx.response.type = 'text/html';
            ctx.body = 'not enough details';
        }
        else if (typeof data.title !== 'string' || typeof data.completed !== 'boolean' || data.title.trim() === '') {
            ctx.response.status = 404;
            ctx.response.type = 'text/html';
            ctx.body = 'invalid data';
        }
        else {
            task_array[i].title = data.title;
            task_array[i].completed = data.completed;
            ctx.response.status = 200;
            ctx.response.type = 'application/json';
            ctx.body = task_array[i];
        }
    }
});
router["delete"]('/todo/:id', function (ctx, next) {
    var id = ctx.url.substring(6);
    var i = findTask(id);
    if (i === -1) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
        ctx.body = 'Not Found';
    }
    else {
        task_array.splice(i, 1);
        ctx.response.status = 200;
        ctx.response.type = 'text/html';
        ctx.body = 'task deleted';
    }
});
app.use(bodyParser());
app.use(router.routes());
app.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
        ctx.body = 'Not Found';
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log("server is running on port " + port);
});
