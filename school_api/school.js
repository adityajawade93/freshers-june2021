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
//import koa from "koa";
var koaBody = require("koa-body");
var koa = require("koa");
var Router = require("@koa/router");
var pg_1 = require("pg");
//import Clienttt from "pg/lib/client";
//const {Clientt} = require('pg');
//const koaa = require('koa');
//const koarouter = require('@koa/router');
var app = new koa();
var router = new Router();
var connectionString = 'postgressql://postgres:postgres@localhost:5432/practice';
var create_student = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, req, id, name_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                req = ctx.request.body;
                id = req["id"];
                name_1 = req["name"];
                if (!id || !name_1) {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details";
                    return [2 /*return*/];
                }
                if (typeof (id) != 'string' || typeof (name_1) != 'string') {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details in correct format";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("insert into students values ($1,$2)", [id, name_1])];
            case 4:
                _a.sent();
                ctx.status = 200;
                ctx.body = "student created.";
                return [3 /*break*/, 8];
            case 5:
                error_1 = _a.sent();
                console.log("something went wrong  " + error_1);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var student_class = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, req, student_id, class_id, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                req = ctx.request.body;
                student_id = req["student_id"];
                class_id = req["class_id"];
                if (!student_id || !class_id) {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details";
                    return [2 /*return*/];
                }
                if (typeof (student_id) != 'string' || typeof (class_id) != 'string') {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details in correct format";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("insert into student_class values ($1,$2)", [req["student_id"], req["class_id"]])];
            case 4:
                _a.sent();
                ctx.status = 200;
                ctx.body = "student has been added to class.";
                return [3 /*break*/, 8];
            case 5:
                error_2 = _a.sent();
                console.log("something went wrong  " + error_2);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log("disconnected.");
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var create_teacher = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, req, id, name_2, sub_id, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                req = ctx.request.body;
                id = req["id"];
                name_2 = req["name"];
                sub_id = req["sub_id"];
                if (!id || !name_2 || !sub_id) {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details";
                    return [2 /*return*/];
                }
                if (typeof (id) != 'string' || typeof (name_2) != 'string' || typeof (sub_id) != 'string') {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details in correct format";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("insert into teachers values ($1,$2,$3)", [req["id"], req["name"], req["sub_id"]])];
            case 4:
                _a.sent();
                ctx.status = 200;
                ctx.body = "teacher created.";
                return [3 /*break*/, 8];
            case 5:
                error_3 = _a.sent();
                console.log("something went wrong  " + error_3);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var create_subject = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, req, id, name_3, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                req = ctx.request.body;
                id = req["id"];
                name_3 = req["name"];
                if (!id || !name_3) {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details";
                    return [2 /*return*/];
                }
                if (typeof (id) != 'string' || typeof (name_3) != 'string') {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details in correct format";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("insert into subjects values ($1,$2)", [req["id"], req["name"]])];
            case 4:
                _a.sent();
                ctx.status = 200;
                ctx.body = "subject created.";
                return [3 /*break*/, 8];
            case 5:
                error_4 = _a.sent();
                console.log("something went wrong  " + error_4);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var create_schedule = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, req, sub_id, class_id, teacher_id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                req = ctx.request.body;
                sub_id = req["sub_id"];
                class_id = req["class_id"];
                teacher_id = req["teacher_id"];
                if (!sub_id || !class_id || !teacher_id) {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details";
                    return [2 /*return*/];
                }
                if (typeof (sub_id) != 'string' || typeof (class_id) != 'string' || typeof (teacher_id) != 'string') {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details in correct format";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("insert into schedule values ($1,$2,$3)", [req["sub_id"], req["class_id"], req["teacher_id"]])];
            case 4:
                _a.sent();
                ctx.status = 200;
                ctx.body = "schedule created.";
                return [3 /*break*/, 8];
            case 5:
                error_5 = _a.sent();
                console.log("something went wrong  " + error_5);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var create_result = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, req, student_id, class_id, sub_id, marks, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                req = ctx.request.body;
                student_id = req["student_id"];
                class_id = req["class_id"];
                sub_id = req["sub_id"];
                marks = req["marks"];
                if (!student_id || !class_id || !sub_id || !marks) {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details";
                    return [2 /*return*/];
                }
                if (typeof (student_id) != 'string' || typeof (class_id) != 'string' || typeof (sub_id) != 'string' || typeof (marks) != 'number') {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details in correct format";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("insert into results values ($1,$2,$3,$4)", [req["student_id"], req["class_id"], req["sub_id"], req["marks"]])];
            case 4:
                _a.sent();
                ctx.status = 200;
                ctx.body = "result created.";
                return [3 /*break*/, 8];
            case 5:
                error_6 = _a.sent();
                console.log("something went wrong  " + error_6);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var update_result = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, req, st_id, sub_id, marks, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                req = ctx.request.body;
                st_id = req["student_id"].trim();
                sub_id = req["sub_id"].trim();
                marks = req["marks"];
                if (!st_id || !sub_id || !marks) {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details";
                    return [2 /*return*/];
                }
                if (typeof (st_id) != 'string' || typeof (sub_id) != 'string' || typeof (marks) != 'number') {
                    ctx.status = 400;
                    ctx.body = "Please enter all the details in correct format";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("update results set marks = " + marks + " where student_id = '" + st_id + "' and subject_id = '" + sub_id + "'")];
            case 4:
                _a.sent();
                ctx.status = 200;
                ctx.body = "result updated.";
                return [3 /*break*/, 8];
            case 5:
                error_7 = _a.sent();
                console.log("something went wrong  " + error_7);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var student_list = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, page, size, res, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                page = Number(ctx.query.page);
                size = Number(ctx.query.size);
                if (!page || !size) {
                    ctx.status = 400;
                    ctx.body = "Please enter page and size";
                    return [2 /*return*/];
                }
                if (page < 0 || size <= 0) {
                    ctx.status = 400;
                    ctx.body = "Please page and size in appropriate range";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("select * from students offset " + page * size + " fetch next " + size + " rows only;")];
            case 4:
                res = _a.sent();
                ctx.status = 200;
                ctx.body = res.rows;
                return [3 /*break*/, 8];
            case 5:
                error_8 = _a.sent();
                console.log("something went wrong  " + error_8);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var teacher_list = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, res, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("select * from teachers")];
            case 4:
                res = _a.sent();
                ctx.status = 200;
                ctx.body = res.rows;
                return [3 /*break*/, 8];
            case 5:
                error_9 = _a.sent();
                console.log("something went wrong  " + error_9);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var class_list = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, res, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("select * from classes")];
            case 4:
                res = _a.sent();
                ctx.status = 200;
                ctx.body = res.rows;
                return [3 /*break*/, 8];
            case 5:
                error_10 = _a.sent();
                console.log("something went wrong  " + error_10);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var subject_list = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, res, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.query("select * from subjects")];
            case 4:
                res = _a.sent();
                ctx.status = 200;
                ctx.body = res.rows;
                return [3 /*break*/, 8];
            case 5:
                error_11 = _a.sent();
                console.log("something went wrong  " + error_11);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var student_list_with_classid = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, class_id, sql, res, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                class_id = ctx.params.id.trim();
                if (!class_id || class_id == null) {
                    ctx.status = 400;
                    ctx.body = "Please enter class id.";
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                sql = "select students.student_id,student_name from students,student_class where student_class.class_id = '" + class_id + "' and students.student_id = student_class.student_id;";
                return [4 /*yield*/, client.query(sql)];
            case 4:
                res = _a.sent();
                ctx.status = 200;
                ctx.body = res.rows;
                return [3 /*break*/, 8];
            case 5:
                error_12 = _a.sent();
                console.log("something went wrong  " + error_12);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var student_list_with_teacherid = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, teacher_id, sql, res, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                teacher_id = ctx.params.id.trim();
                if (!teacher_id) {
                    ctx.status = 400;
                    ctx.body = "Please enter teacher id.";
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                sql = "select students.student_id,student_name from students,student_subjects,teachers where teacher_id ='" + teacher_id + "' and students.student_id = student_subjects.student_id and (student_subjects.first_lang = teachers.subject_id or student_subjects.second_lang = teachers.subject_id or student_subjects.opt1 = teachers.subject_id or student_subjects.opt2 = teachers.subject_id or student_subjects.opt3 = teachers.subject_id);";
                return [4 /*yield*/, client.query(sql)];
            case 4:
                res = _a.sent();
                ctx.status = 200;
                ctx.body = res.rows;
                return [3 /*break*/, 8];
            case 5:
                error_13 = _a.sent();
                console.log("something went wrong  " + error_13);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var student_list_with_subid = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, sub_id, sql, res, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                sub_id = ctx.params.id.trim();
                if (!sub_id) {
                    ctx.status = 400;
                    ctx.body = "Please enter subject id.";
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                sql = "select students.student_id,student_name from students,student_subjects where students.student_id = student_subjects.student_id and (student_subjects.first_lang = '" + sub_id + "' or student_subjects.second_lang = '" + sub_id + "' or student_subjects.opt1 = '" + sub_id + "' or student_subjects.opt2 = '" + sub_id + "' or student_subjects.opt3 = '" + sub_id + "');";
                return [4 /*yield*/, client.query(sql)];
            case 4:
                res = _a.sent();
                ctx.status = 200;
                ctx.body = res.rows;
                return [3 /*break*/, 8];
            case 5:
                error_14 = _a.sent();
                console.log("something went wrong  " + error_14);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var highest_mark_class_sub = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, class_id, sub_id, sql, res, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new pg_1.Client({ connectionString: connectionString });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, 6, 8]);
                class_id = ctx.query.classid;
                sub_id = ctx.query.subid;
                if (!class_id || !sub_id) {
                    ctx.status = 400;
                    ctx.body = "Please enter class id and subject id.";
                }
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('connected...');
                return [4 /*yield*/, client.query("set search_path to school")];
            case 3:
                _a.sent();
                sql = "select results.student_id,student_name,marks from students,results where students.student_id = results.student_id and class_id = '" + class_id + "' and subject_id = '" + sub_id + "' and marks = (select max(marks) from results where class_id = '" + class_id + "' and subject_id = '" + sub_id + "');";
                return [4 /*yield*/, client.query(sql)];
            case 4:
                res = _a.sent();
                ctx.status = 200;
                ctx.body = res.rows;
                return [3 /*break*/, 8];
            case 5:
                error_15 = _a.sent();
                console.log("something went wrong  " + error_15);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log('Client disconnected.');
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
router.post("/s/student", create_student);
router.post("/s/student_class", student_class);
router.post("/s/teacher", create_teacher);
router.post("/s/subject", create_subject);
router.post("/s/schedule", create_schedule);
router.post("/s/result", create_result);
router.put("/s/update_result", update_result);
router.get("/s/student_list", student_list);
router.get("/s/teacher_list", teacher_list);
router.get("/s/class_list", class_list);
router.get("/s/subject_list", subject_list);
router.get("/s/student_list_classid/:id", student_list_with_classid);
router.get("/s/student_list_teacherid/:id", student_list_with_teacherid);
router.get("/s/student_list_subid/:id", student_list_with_subid);
router.get("/s/highest_marks", highest_mark_class_sub);
app.use(koaBody());
app.use(router.routes());
app.use(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.status = 404;
        ctx.body = 'Page not found';
        return [2 /*return*/];
    });
}); });
console.log('started');
app.listen(3000);
