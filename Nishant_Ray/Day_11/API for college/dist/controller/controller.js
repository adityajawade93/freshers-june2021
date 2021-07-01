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
Object.defineProperty(exports, "__esModule", { value: true });
var fn = require('../sql_functions/sqlfunctions');
exports.getStudent = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, length_1, page, size, totalPages, startid, endid, req_data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                rows = [][0];
                return [4 /*yield*/, fn.get_student()];
            case 1:
                rows = _a.sent();
                return [4 /*yield*/, fn.get_student_length()];
            case 2:
                length_1 = _a.sent();
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
                req_data = rows.rows;
                req_data = (req_data).slice(startid, endid);
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = req_data;
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTeacher = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows = [][0];
                return [4 /*yield*/, fn.get_teacher()];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows.rows;
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
}); };
exports.getSubject = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows = [][0];
                return [4 /*yield*/, fn.get_subject()];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows.rows;
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
}); };
exports.getClass = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows = [][0];
                return [4 /*yield*/, fn.get_class()];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows.rows;
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
}); };
exports.getStudentByClassId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(ctx.params.id);
                if (id === undefined || typeof id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_student_by_classid(id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows.rows;
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
}); };
exports.getStudentByTeacherId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(ctx.url.substring(9));
                if (id === undefined || typeof id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_student_by_teacherid(id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows.rows;
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
}); };
exports.getStudentBySubjectId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(ctx.url.substring(9));
                if (id === undefined || typeof id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_student_by_subjectid(id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows.rows;
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
}); };
exports.getSubjectMarksByStudentId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(ctx.url.substring(7));
                if (id === undefined || typeof id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_subjectmarks_by_subjectid(id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows.rows;
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
}); };
exports.gettopperByclassIdAndSubjectId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var c_id, s_id, rows, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                c_id = parseInt(ctx.params.c_id);
                s_id = parseInt(ctx.params.s_id);
                if (c_id === undefined || typeof c_id !== 'number' || s_id === undefined || typeof s_id !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_topper_by_classid_and_subjectid(c_id, s_id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows.rows;
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
}); };
exports.addStudent = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.student_id === undefined || req.fname === undefined || req.mname === undefined || req.lname === undefined || req.dob === undefined || req.gender === undefined || req.address === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.fname.trim() === '' || req.mname.trim() === '' || req.lname.trim() === '' || req.address.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.student_id !== 'number' || typeof req.fname !== 'string' || typeof req.mname !== 'string' || typeof req.lname !== 'string' || typeof req.dob !== 'string' || typeof req.gender !== 'string' || typeof req.address !== 'string') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_student(req.student_id, req.fname, req.mname, req.lname, req.dob, req.gender, req.address)];
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
}); };
exports.addTeacher = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.teacher_id === undefined || req.fname === undefined || req.mname === undefined || req.lname === undefined || req.dob === undefined || req.gender === undefined || req.address === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.fname.trim() === '' || req.mname.trim() === '' || req.lname.trim() === '' || req.address.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.teacher_id !== 'number' || typeof req.fname !== 'string' || typeof req.mname !== 'string' || typeof req.lname !== 'string' || typeof req.dob !== 'string' || typeof req.gender !== 'string' || typeof req.address !== 'string') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_teacher(req.teacher_id, req.fname, req.mname, req.lname, req.dob, req.gender, req.address)];
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
}); };
exports.addStudentInClass = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.class_id === undefined || req.studid === undefined || typeof req.class_id !== 'number' || typeof req.studid !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_student_in_class(req.class_id, req.studid)];
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
}); };
exports.addSubject = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.subject_id === undefined || req.subject_name === undefined || typeof req.subject_id !== 'number' || typeof req.subject_name !== 'string' || req.subject_name.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_subject(req.subject_id, req.subject_name)];
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
}); };
exports.addClassSchedule = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.classid === undefined || req.classno === undefined || req.subj_id === undefined || req.subj_name === undefined || req.t_id === undefined || req.t_fname === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.classid !== 'number' || typeof req.classno !== 'number' || typeof req.subj_id !== 'number' || typeof req.subj_name !== 'string' || typeof req.t_id !== 'number' || typeof req.t_fname !== 'string') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.subj_name.trim() === '' || req.t_fname.trim() === '') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_class_schedule(req.classid, req.classno, req.subj_id, req.subj_name, req.t_id, req.t_fname)];
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
}); };
exports.addResult = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.result_id === undefined || req.studentid === undefined || req.clas_id === undefined || req.subjectid === undefined || req.marks === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.result_id !== 'number' || typeof req.studentid !== 'number' || typeof req.clas_id !== 'number' || typeof req.subjectid !== 'number' || typeof req.marks !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_result(req.result_id, req.studentid, req.clas_id, req.subjectid, req.marks)];
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
}); };
