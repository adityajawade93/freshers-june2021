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
var koa = require('koa');
var koarouter = require("@koa/router");
var bodyParser = require('koa-bodyparser');
var fn = require("./tables");
var app = new koa();
var router = new koarouter();
router.post('/createstudent', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.roll_num === undefined || req.fname === undefined || req.lname === undefined || req.standard === undefined || req.subcode === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.fname.trim() === '' || req.lname.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.roll_num !== 'number' || typeof req.fname !== 'string' || typeof req.lname !== 'string' || typeof req.standard !== 'number' || typeof req.subcode !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.execute1(req.roll_num, req.fname, req.lname, req.standard, req.subcode)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data inserted in Students";
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/createsubject', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.subcode === undefined || req.subject === undefined || typeof req.staffid === undefined || typeof req.staffid !== 'number' || typeof req.subcode !== 'number' || req.subject.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.execute2(req.subcode, req.subject, req.staffid)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data inserted in Subjects";
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/createteacher', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.staffid === undefined || req.fname === undefined || req.lname === undefined || req.subcode === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.fname.trim() === '' || req.lname.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.staffid !== 'number' || typeof req.fname !== 'string' || typeof req.lname !== 'string' || typeof req.subcode !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.execute3(req.staffid, req.fname, req.lname, req.subcode)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data inserted in Teachers";
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = " server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/class_schedule', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.uniclassid === undefined || req.Standard === undefined || req.classno === undefined || req.subcode === undefined || req.subject === undefined || req.staffid === undefined || req.T_fname === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.Standard !== 'number' || typeof req.classno !== 'number' || typeof req.subcode !== 'number' || typeof req.subject !== 'string' || typeof req.staffid !== 'number' || typeof req.T_fname !== 'string') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.subject.trim() === '' || req.T_fname.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.execute4(req.uniclassid, req.Standard, req.classno, req.subcode, req.subject, req.staffid, req.T_fname)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data inserted in Class_schedule";
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/addmarks', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var req, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.resultsid === undefined || req.roll_num === undefined || req.subcode === undefined || req.staffid === undefined || req.standard === undefined || req.marks === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.resultsid !== 'number' || typeof req.roll_num !== 'number' || typeof req.subcode !== 'number' || typeof req.staffid !== 'number' || typeof req.standard !== 'number' || typeof req.marks !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.execute5(req.resultsid, req.roll_num, req.subcode, req.staffid, req.standard, req.marks)];
            case 1:
                _b.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data inserted in marks";
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.use(bodyParser());
app.use(router.routes());
app.use(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
        ctx.body = 'Not Found';
        return [2 /*return*/];
    });
}); });
app.listen(5000, function () {
    console.log("server is up at 5000");
});
