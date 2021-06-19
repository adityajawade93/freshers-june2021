"use strict";
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
exports.__esModule = true;
var Koa = require("koa");
var Router = require("koa-router");
var bodyParser = require("koa-bodyparser");
var uuid = require("uuid");
var entry = /** @class */ (function () {
    function entry() {
        this.id = '0';
        this.createdDate = new Date().toJSON().slice(0, 10);
        this.title = '0000';
        this.completed = true;
    }
    return entry;
}());
var toDoList;
var toDoApp = new Koa();
var myRouter = new Router({
    prefix: '/todo'
});
var response = function (ctx, status, type, body) {
    ctx.status = status;
    ctx.type = type;
    ctx.body = body;
};
myRouter.get('/', function (ctx) {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body
    });
    if (Object.keys(toDoList).length === 0) {
        response(ctx, 200, 'application/json', { message: 'No entries to display.' });
    }
    else {
        response(ctx, 200, 'application/json', { message: 'Request fulfiled.', content: toDoList });
    }
});
myRouter.get('/:id', function (ctx) {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body
    });
    var id = ctx.params.id;
    // if(id.length > 8) {
    //     ctx.status = 404;
    //     ctx.body = "Id must be less than 8 chracters."
    // }
    if (Object.prototype.hasOwnProperty.call(toDoList, id)) {
        response(ctx, 200, 'application/json', { message: 'Requested entry found.', content: toDoList[id] });
    }
    else {
        response(ctx, 404, 'application/json', { message: 'Entry with Id : ' + id + ' does not exist in database.' });
    }
});
myRouter.post('/', function (ctx) {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body
    });
    var Data = ctx.request.body;
    var data = Data;
    var title = data.title;
    var completed = data.completed;
    if (title === undefined || completed === undefined) {
        response(ctx, 406, 'application/json', { message: 'Not enough details provided.' });
        return;
    }
    else if (typeof title !== 'string' || typeof completed !== 'boolean') {
        response(ctx, 415, 'application/json', { message: 'Only Strings(title) and Boolean(completed) allowed.' });
        return;
    }
    var Id = uuid.v4();
    var date = new Date().toJSON().slice(0, 10);
    var newItem = {
        id: Id,
        createdDate: date,
        title: title,
        completed: completed
    };
    toDoList[Id] = newItem;
    response(ctx, 201, 'application/json', { message: 'Entry added Successfully.', content: newItem });
});
myRouter.put('/:id', function (ctx) {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body
    });
    var id = ctx.params.id;
    if (Object.prototype.hasOwnProperty.call(toDoList, id) === false) {
        response(ctx, 404, 'application/json', { message: 'Entry with Id : ' + id + ' does not exist in database.' });
        return;
    }
    var Data = ctx.request.body;
    var data = Data;
    var title = data.title;
    var completed = data.completed;
    if (title === undefined && completed === undefined) {
        response(ctx, 406, 'application/json', { message: 'Not enough details provided.' });
        return;
    }
    else if (typeof title !== 'string' || typeof completed !== 'boolean') {
        response(ctx, 415, 'application/json', { 'message': 'Only Strings(title) and Boolean(completed) allowed.' });
        return;
    }
    if (title !== undefined) {
        toDoList[id].title = title;
    }
    if (completed !== undefined) {
        toDoList[id].completed = completed;
    }
    response(ctx, 202, 'application/json', { message: 'Entry updated Successfully.', content: toDoList[id] });
});
myRouter["delete"]('/:id', function (ctx) {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body
    });
    var id = ctx.params.id;
    if (Object.prototype.hasOwnProperty.call(toDoList, id) === false) {
        response(ctx, 404, 'application/json', { message: 'Entry with Id : ' + id + ' does not exist in database.' });
        return;
    }
    delete toDoList[id.toString()];
    response(ctx, 202, 'application/json', { message: 'Entry deleted Successfully.' });
});
toDoApp.use(bodyParser());
toDoApp.use(myRouter.routes());
toDoApp.use(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.status = 400;
        ctx.type = 'application/json';
        ctx.body = { message: 'Page not found!' };
        return [2 /*return*/];
    });
}); });
var port = 3000;
toDoApp.listen(port);
console.info("Listening to http://localhost:" + port + " \uD83D\uDE80");
