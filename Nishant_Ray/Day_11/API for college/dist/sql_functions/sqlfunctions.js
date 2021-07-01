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
var sqlclient = require('../connect_database/db');
exports.get_teacher = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT * FROM Teacher")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.get_student = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT * FROM Student")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.get_student_length = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT Count(*) FROM Student")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.get_subject = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT * FROM subject")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.get_class = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT * FROM Class_schedule")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.get_student_by_classid = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT S.student_id,S.fname FROM Student AS S,class_student WHERE class_id=" + id + " AND studid=student_id")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.get_student_by_teacherid = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE t_id=" + id + " AND class_id=classid AND studid=student_id")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.get_student_by_subjectid = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE subj_id=" + id + " AND class_id=classid AND studid=student_id")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.get_subjectmarks_by_subjectid = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT subject_id,subject_name,marks FROM result,subject WHERE studentid=" + id + " AND subjectid=subject_id")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.get_topper_by_classid_and_subjectid = function (c_id, s_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("SELECT student_id,fname,S.marks FROM (SELECT * FROM result WHERE clas_id=" + c_id + " AND subjectid=" + s_id + " ORDER BY marks DESC) AS S,Student WHERE S.studentid=student_id LIMIT 1")];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.add_student = function (student_id, fname, mname, lname, dob, gender, address) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                data = [student_id, fname, mname, lname, dob, gender, address];
                return [4 /*yield*/, sqlclient.query("INSERT INTO Student values($1,$2,$3,$4,$5,$6,$7)", data)];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.add_teacher = function (teacher_id, fname, mname, lname, dob, gender, address) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                data = [teacher_id, fname, mname, lname, dob, gender, address];
                return [4 /*yield*/, sqlclient.query("INSERT INTO Teacher values($1,$2,$3,$4,$5,$6,$7)", data)];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.add_student_in_class = function (class_id, studid) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                data = [class_id, studid];
                return [4 /*yield*/, sqlclient.query("INSERT INTO class_student values($1,$2)", data)];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.add_subject = function (subject_id, subject_name) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                data = [subject_id, subject_name];
                return [4 /*yield*/, sqlclient.query("INSERT INTO Subject values($1,$2)", data)];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.add_class_schedule = function (classid, classno, subj_id, subj_name, t_id, t_fname) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                data = [classid, classno, subj_id, subj_name, t_id, t_fname];
                return [4 /*yield*/, sqlclient.query("INSERT ITO Class_schedule values($1,$2,$3,$4,$5,$6)", data)];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
exports.add_result = function (result_id, studentid, clas_id, subjectid, marks) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                data = [result_id, studentid, clas_id, subjectid, marks];
                return [4 /*yield*/, sqlclient.query("INSERT INTO result values($1,$2,$3,$4,$5)", data)];
            case 2: return [2 /*return*/, (_a.sent())];
        }
    });
}); };
