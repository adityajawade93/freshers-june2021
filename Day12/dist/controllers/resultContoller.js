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
var resultServices = require('../services/resultServices');
exports.addMarks = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var object, checkSubject_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                object = ctx.request.body;
                if (object.studentId == null || object.subjectId == null || object.marks == null) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Data missing"
                    };
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, resultServices.checkSubject(object.studentId, object.subjectId)];
            case 2:
                checkSubject_1 = _a.sent();
                if (checkSubject_1 == false) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Subject not found related to student"
                    };
                    return [2 /*return*/];
                }
                return [4 /*yield*/, resultServices.addMarks(object.studentId, object.subjectId, object.marks)];
            case 3:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "Marks added"
                };
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1.stack);
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
exports.updateMarks = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var object, checkSubject_2, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                object = ctx.request.body;
                if (object.studentId == null || object.subjectId == null || object.marks == null) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Data missing"
                    };
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, resultServices.checkSubject(object.studentId, object.subjectId)];
            case 2:
                checkSubject_2 = _a.sent();
                if (checkSubject_2 == false) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.body = {
                        "msg": "Subject not found related to student"
                    };
                    return [2 /*return*/];
                }
                return [4 /*yield*/, resultServices.updateMarks(object.studentId, object.subjectId, object.marks)];
            case 3:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = {
                    "msg": "Marks Updated"
                };
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.log(e_2.stack);
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
exports.getMarksByStudentId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var studentId, marksData, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                studentId = ctx.request.params.studentId;
                if (studentId == null || studentId == undefined) {
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
                return [4 /*yield*/, resultServices.getMarks(studentId)];
            case 2:
                marksData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = marksData;
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
exports.getHighestMarksPerSubject = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var classId, marksData, e_4;
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
                return [4 /*yield*/, resultServices.getHighestMarksPerSubject(classId)];
            case 2:
                marksData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = marksData;
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
exports.getTop10Marks = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var classId, marksData, e_5;
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
                return [4 /*yield*/, resultServices.getTop10Marks(classId)];
            case 2:
                marksData = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = marksData;
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                console.log(e_5.stack);
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
