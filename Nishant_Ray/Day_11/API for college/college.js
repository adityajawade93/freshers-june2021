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
var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'postgres',
    password: 'welcome@123',
    host: 'localhost',
    database: 'postgres',
    port: '5432'
});
var app = new koa();
var router = new koarouter();
// get student data with pagination
router.get('/student', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.query("SELECT * FROM Student")];
                    case 3:
                        rows_1 = _a.sent();
                        return [4 /*yield*/, client.query("SELECT Count(*) FROM Student")];
                    case 4:
                        length_1 = _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var rows_1, length_1, page, size, totalPages, startid, endid, req_data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows_1 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                page = parseInt(ctx.request.query.page);
                size = parseInt(ctx.request.query.size);
                totalPages = Math.ceil(length_1.rows[0].count / size);
                if (page === undefined || size === undefined || typeof page !== 'number' || typeof size !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (page < 0 || size < 0 || page > totalPages) {
                    ctx.response.status = 404;
                    ctx.response.type = 'text/html';
                    ctx.body = "Not Found";
                    return [2 /*return*/];
                }
                startid = page * size;
                endid = Math.min((page + 1) * size, length_1.rows[0].count);
                req_data = rows_1.rows;
                req_data = (req_data).slice(startid, endid);
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = req_data;
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get teacher data
router.get('/teacher', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.query("SELECT * FROM Teacher")];
                    case 3:
                        rows_2 = _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var rows_2, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows_2 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_2.rows;
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get subject data
router.get('/subject', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.query("SELECT * FROM subject")];
                    case 3:
                        rows_3 = _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var rows_3, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows_3 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_3.rows;
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
//get class_stduent data
router.get('/class', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.query("SELECT * FROM Class_schedule")];
                    case 3:
                        rows_4 = _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var rows_4, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows_4 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_4.rows;
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
//get student in class data
router.get('/class/:id', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.query("SELECT S.student_id,S.fname FROM Student,class_student WHERE class_id=" + id + " AND studid=student_id")];
                    case 3:
                        rows_5 = _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var id, rows_5, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = ctx.url.substring(7);
                if (id === undefined || typeof id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows_5 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_5.rows;
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get student under teacher data
router.get('/teacher/:id', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.query("SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE t_id=" + id + " AND class_id=classid AND studid=student_id")];
                    case 3:
                        rows_6 = _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var id, rows_6, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = ctx.url.substring(9);
                if (id === undefined || typeof id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows_6 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_6.rows;
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get student in subject data
router.get('/subject/:id', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.query("SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE subj_id=" + id + " AND class_id=classid AND studid=student_id")];
                    case 3:
                        rows_7 = _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var id, rows_7, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = ctx.url.substring(9);
                if (id === undefined || typeof id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows_7 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_7.rows;
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get  marks in the subject data
router.get('/marks/:id', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.query("SELECT subject_id,subject_name,marks FROM result,subject WHERE studentid=" + id + " AND subjectid=subject_id")];
                    case 3:
                        rows_8 = _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var id, rows_8, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = ctx.url.substring(7);
                if (id === undefined || typeof id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows_8 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_8.rows;
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get topper in class and subject data
router.get('/topclass/:c_id/topsubject/:s_id', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, client.query("SELECT student_id,fname,S.marks FROM (SELECT * FROM result WHERE clas_id=" + c_id + " AND subjectid=" + s_id + " ORDER BY marks DESC) AS S,Student WHERE S.studentid=student_id LIMIT 1")];
                    case 3:
                        rows_9 = _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var c_id, s_id, rows_9, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                c_id = ctx.params.c_id;
                s_id = ctx.params.s_id;
                if (c_id === undefined || typeof c_id !== 'number' || s_id === undefined || typeof s_id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows_9 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_9.rows;
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create student data
router.post('/createstudent', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        data = [req_1.student_id, req_1.fname, req_1.mname, req_1.lname, req_1.dob, req_1.gender, req_1.address];
                        return [4 /*yield*/, client.query("INSERT INTO Student values($1,$2,$3,$4,$5,$6,$7)", data)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var req_1, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req_1 = ctx.request.body;
                if (req_1.student_id === undefined || req_1.fname === undefined || req_1.mname === undefined || req_1.lname === undefined || req_1.dob === undefined || req_1.gender === undefined || req_1.address === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req_1.fname.trim() === '' || req_1.mname.trim() === '' || req_1.lname.trim() === '' || req_1.address.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req_1.student_id !== 'number' || typeof req_1.fname !== 'string' || typeof req_1.mname !== 'string' || typeof req_1.lname !== 'string' || typeof req_1.dob !== 'string' || typeof req_1.gender !== 'string' || typeof req_1.address !== 'string') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data is inserted in student table";
                return [3 /*break*/, 3];
            case 2:
                err_10 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create teacher data
router.post('/createteacher', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        data = [req_2.teacher_id, req_2.fname, req_2.mname, req_2.lname, req_2.dob, req_2.gender, req_2.address];
                        return [4 /*yield*/, client.query("INSERT INTO Teacher values($1,$2,$3,$4,$5,$6,$7)", data)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var req_2, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req_2 = ctx.request.body;
                if (req_2.teacher_id === undefined || req_2.fname === undefined || req_2.mname === undefined || req_2.lname === undefined || req_2.dob === undefined || req_2.gender === undefined || req_2.address === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req_2.fname.trim() === '' || req_2.mname.trim() === '' || req_2.lname.trim() === '' || req_2.address.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req_2.teacher_id !== 'number' || typeof req_2.fname !== 'string' || typeof req_2.mname !== 'string' || typeof req_2.lname !== 'string' || typeof req_2.dob !== 'string' || typeof req_2.gender !== 'string' || typeof req_2.address !== 'string') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data is inserted in teacher table";
                return [3 /*break*/, 3];
            case 2:
                err_11 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create class_student data
router.post('/createclass_student', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        data = [req_3.class_id, req_3.studid];
                        return [4 /*yield*/, client.query("INSERT INTO class_student values($1,$2)", data)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var req_3, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req_3 = ctx.request.body;
                if (req_3.class_id === undefined || req_3.studid === undefined || typeof req_3.class_id !== 'number' || typeof req_3.studid !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data is inserted in Class_student table";
                return [3 /*break*/, 3];
            case 2:
                err_12 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create subject data
router.post('/createsubject', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        data = [req_4.subject_id, req_4.subject_name];
                        return [4 /*yield*/, client.query("INSERT INTO Subject values($1,$2)", data)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var req_4, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req_4 = ctx.request.body;
                if (req_4.subject_id === undefined || req_4.subject_name === undefined || typeof req_4.subject_id !== 'number' || typeof req_4.subject_name !== 'string' || req_4.subject_name.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data is inserted in Subject table";
                return [3 /*break*/, 3];
            case 2:
                err_13 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create class_schedule data
router.post('/createclass_schedule', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        data = [req_5.classid, req_5.classno, req_5.subj_id, req_5.subj_name, req_5.t_id, req_5.t_fname];
                        return [4 /*yield*/, client.query("INSERT ITO Class_schedule values($1,$2,$3,$4,$5,$6)", data)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var req_5, err_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req_5 = ctx.request.body;
                if (req_5.classid === undefined || req_5.classno === undefined || req_5.subj_id === undefined || req_5.subj_name === undefined || req_5.t_id === undefined || req_5.t_fname === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req_5.classid !== 'number' || typeof req_5.classno !== 'number' || typeof req_5.subj_id !== 'number' || typeof req_5.subj_name !== 'string' || typeof req_5.t_id !== 'number' || typeof req_5.t_fname !== 'string') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req_5.subj_name.trim() === '' || req_5.t_fname.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data is inserted in Class_schedule table";
                return [3 /*break*/, 3];
            case 2:
                err_14 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create result data
router.post('/createresult', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            var client, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.query("SET search_path TO College")];
                    case 2:
                        _a.sent();
                        data = [req_6.result_id, req_6.studentid, req_6.clas_id, req_6.subjectid, req_6.marks];
                        return [4 /*yield*/, client.query("INSERT INTO result values($1,$2,$3,$4,$5)", data)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, client.release()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var req_6, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                req_6 = ctx.request.body;
                if (req_6.result_id === undefined || req_6.studentid === undefined || req_6.clas_id === undefined || req_6.subjectid === undefined || req_6.marks === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req_6.result_id !== 'number' || typeof req_6.studentid !== 'number' || typeof req_6.clas_id !== 'number' || typeof req_6.subjectid !== 'number' || typeof req_6.marks !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, execute()];
            case 1:
                _b.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "data is inserted in result table";
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
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
app.listen(3000, function () {
    console.log("server is running on port 3000");
});
