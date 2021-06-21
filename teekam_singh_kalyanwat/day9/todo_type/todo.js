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
var app = new koa();
var router = new koarouter();
var task_list = [];
var map = new Map();
function task(id, title, status) {
    this.id = id;
    this.date = new Date();
    this.title = title;
    this.status = status;
}
var first_task = new task(26, 'send docs', false);
task_list.push(first_task);
map.set(26, true);
function getindex(idd) {
    var len = task_list.length;
    var i = 0;
    for (i = 0; i < len; i++) {
        if (task_list[i]['id'] == idd)
            break;
    }
    return i;
}
router.get('/todo', function (ctx) {
    ctx.status = 200;
    ctx.body = task_list;
});
router.get('/todo/:id', function (ctx) {
    var id = Number(ctx.params.id);
    if (isNaN(id) || id < 1 || id > 100000) {
        ctx.status = 415;
        ctx.body = 'Please check your id';
        return;
    }
    if (!map.has(id)) {
        ctx.status = 415;
        ctx.body = 'No task is present with given id';
        return;
    }
    var ind = getindex(id);
    ctx.status = 200;
    ctx.body = task_list[ind];
});
router.post('/todo/', function (ctx) {
    var file = ctx.request.body;
    if (file['title'].length === 0 || file['status'] === null || file['id'] === null) {
        ctx.status = 415;
        ctx.body = 'please give all required values';
        return;
    }
    if (typeof (file['id']) != 'number' || typeof (file['title']) != 'string' || typeof (file['status']) != 'boolean') {
        ctx.status = 415;
        ctx.body = 'Please enter values in correct format';
        return;
    }
    var id = file['id'];
    if (map.has(id)) {
        ctx.status = 415;
        ctx.body = 'This id already exists, Please enter another';
        return;
    }
    if (id < 1 || id > 10000) {
        ctx.status = 415;
        ctx.body = 'id should be between 1 and 99999';
        return;
    }
    var newtask = new task(file['id'], file['title'], file['status']);
    task_list.push(newtask);
    map.set(id, true);
    ctx.status = 200;
    ctx.body = 'task added';
});
router.put('/todo/:id', function (ctx) {
    var id = Number(ctx.params.id);
    if (isNaN(id) || id < 1 || id > 100000) {
        ctx.status = 415;
        ctx.body = 'Please check your id';
        return;
    }
    var ind = getindex(id);
    if (!map.has(id)) {
        ctx.status = 415;
        ctx.body = 'No task is present with given id';
        return;
    }
    var file = ctx.request.body;
    if (file['title'].length === 0 || file['status'] === null) {
        ctx.status = 415;
        ctx.body = 'please give all required values';
        return;
    }
    if (typeof (file['title']) != 'string' || typeof (file['status']) != 'boolean') {
        ctx.status = 415;
        ctx.body = 'Please enter values in correct format';
        return;
    }
    Object.assign(task_list[ind], ctx.request.body);
    ctx.status = 200;
    ctx.body = 'task updated';
});
router["delete"]('/todo/:id', function (ctx) {
    var id = Number(ctx.params.id);
    if (isNaN(id) || id < 1 || id > 100000) {
        ctx.status = 415;
        ctx.body = 'Please check your id';
        return;
    }
    var ind = getindex(id);
    if (!map.has(id)) {
        ctx.status = 415;
        ctx.body = 'No task is present with given id';
        return;
    }
    task_list.splice(ind, 1);
    map["delete"](id);
    ctx.status = 200;
    ctx.body = 'task deleted';
});
app
    .use(require('koa-body')())
    .use(router.allowedMethods())
    .use(router.routes());
app.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.status = 404;
        ctx.body = 'Page not found';
        return [2 /*return*/];
    });
}); });
app.listen(3000);
module.exports = app;
