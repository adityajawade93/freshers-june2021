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
var uuid = require('uniqid');
var services = require('../services/studentServices');
exports.addStudent = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var object, id, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                object = ctx.request.body;
                if (object.name == null || object.gender == null || object.phone == null || object.classId == null) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Data missing"
                    };
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = uuid('S');
                return [4 /*yield*/, services.addStudent(id, object.name, object.gender, object.phone, object.classId)];
            case 2:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "Student added"
                };
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log(e_1.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addTeacher = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var object, id, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                object = ctx.request.body;
                if (object.name == null || object.gender == null || object.phone == null || object.subjectId == null) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Data missing"
                    };
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = uuid('T');
                return [4 /*yield*/, services.addTeacher(id, object.name, object.gender, object.phone, object.subjectId)];
            case 2:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "Teacher added"
                };
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.log(e_2.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addSubject = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var object, id, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                object = ctx.request.body;
                if (object.subjectName == null) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Data missing"
                    };
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = uuid('S');
                return [4 /*yield*/, services.addSubject(id, object.subjectName)];
            case 2:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "Subject added"
                };
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.log(e_3.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addSchedule = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var object, id, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                object = ctx.request.body;
                if (object.classId == null || object.subjectId == null) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Data missing"
                    };
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = uuid('S');
                return [4 /*yield*/, services.addSchedule(object.classId, object.subjectId)];
            case 2:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "Schedule added"
                };
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                console.log(e_4.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTeachers = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var teachersData, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, services.getTeachers()];
            case 1:
                teachersData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = teachersData;
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                console.log(e_5.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSubjects = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var subjectData, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, services.getSubjects()];
            case 1:
                subjectData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = subjectData;
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                console.log(e_6.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getClasses = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var classData, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, services.getClasses()];
            case 1:
                classData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = classData;
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                console.log(e_7.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getStudents = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var page, size, totalstudents, totalPages, studentData, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = ctx.request.query.page;
                size = ctx.request.query.size;
                if (isNaN(page) || isNaN(size)) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Invalid query"
                    };
                    return [2 /*return*/];
                }
                return [4 /*yield*/, services.getStudentcount()];
            case 1:
                totalstudents = _a.sent();
                totalPages = Math.ceil(totalstudents / size);
                if (page < 0 || page >= totalPages) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "page number not found"
                    };
                    return [2 /*return*/];
                }
                if (size <= 0) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Invalid size"
                    };
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, services.getStudents(size, page)];
            case 3:
                studentData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = studentData;
                return [3 /*break*/, 5];
            case 4:
                e_8 = _a.sent();
                console.log(e_8.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getStudentsByClassId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var classId, studentData, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                classId = ctx.request.params.classId;
                if (classId == null || classId == undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Invalid classId"
                    };
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, services.getStudentsByClassId(classId)];
            case 2:
                studentData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = studentData;
                return [3 /*break*/, 4];
            case 3:
                e_9 = _a.sent();
                console.log(e_9.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getStudentsBySubjectId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var subjectId, studentData, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                subjectId = ctx.request.params.subjectId;
                if (subjectId == null || subjectId == undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Invalid classId"
                    };
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, services.getStudentsBySubjectId(subjectId)];
            case 2:
                studentData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = studentData;
                return [3 /*break*/, 4];
            case 3:
                e_10 = _a.sent();
                console.log(e_10.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getStudentsByTeacherId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var teacherId, studentData, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                teacherId = ctx.request.params.teacherId;
                if (teacherId == null || teacherId == undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Invalid classId"
                    };
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, services.getStudentsByTeacherId(teacherId)];
            case 2:
                studentData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = studentData;
                return [3 /*break*/, 4];
            case 3:
                e_11 = _a.sent();
                console.log(e_11.stack);
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "something wrong happens"
                };
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
