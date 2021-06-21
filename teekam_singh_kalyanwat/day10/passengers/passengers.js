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
var fs = require('fs');
var koa = require('koa');
var koarouter = require('@koa/router');
var uuid = require('uniqid');
var app = new koa();
var router = new koarouter();
router.get('/v1/passengers', function (ctx) {
    var page = Number(ctx.query.page);
    var size = Number(ctx.query.size);
    var passengers = require("./pass.json");
    var n = passengers.length;
    if (page * size >= n) {
        ctx.status = 406;
        ctx.body = 'Given page no and size is not possible';
    }
    else {
        var start = size * page;
        var end = size * (page + 1);
        ctx.status = 200;
        ctx.body = passengers.slice(start, end);
    }
});
router.post('/v1/passengers', function (ctx) {
    var passengers = require("./pass.json");
    var file = ctx.request.body;
    if (file["name"] == undefined || file["trips"] == undefined || file["airline"] == undefined) {
        ctx.status = 415;
        ctx.body = 'Please give all necessary details';
    }
    else if (typeof (file["name"]) != 'string' || typeof (file["trips"]) != 'number' || typeof (file["airline"]) != 'object') {
        ctx.status = 415;
        ctx.body = 'Please give details in correct format';
    }
    else {
        var id = uuid();
        file["_id"] = id;
        passengers.push(file);
        fs.writeFile("pass.json", JSON.stringify(passengers), function (err) {
            if (err)
                throw err;
        });
        ctx.status = 200;
        ctx.body = 'passenger with id ' + id + ' created successfully';
    }
});
router.put('/v1/passengers/:id', function (ctx) {
    var id = ctx.params.id;
    var passengers = require("./pass.json");
    var file = ctx.request.body;
    var len = passengers.length;
    var i;
    for (i = 0; i < len; i++) {
        if (passengers[i]["_id"] == id)
            break;
    }
    if (file["name"] == undefined || file["trips"] == undefined || file["airline"] == undefined) {
        ctx.status = 415;
        ctx.body = 'Please give all necessary details';
    }
    else if (typeof (file["name"]) != 'string' || typeof (file["trips"]) != 'number' || typeof (file["airline"]) != 'object') {
        ctx.status = 415;
        ctx.body = 'Please give details in correct format';
    }
    else if (i === len) {
        ctx.status = 406;
        ctx.body = 'passenger not found with this id';
    }
    else {
        passengers.splice(i, 1);
        file["_id"] = id;
        passengers.push(file);
        fs.writeFile("pass.json", JSON.stringify(passengers), function (err) {
            if (err)
                throw err;
        });
        ctx.status = 200;
        ctx.body = 'passenger with id ' + id + ' updated successfully';
    }
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
console.log('started');
app.listen(3000);
module.exports = app;
