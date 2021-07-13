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
var Joi = require("joi");
var studentSchema = Joi.object().keys({
    studentId: Joi.number().required(),
    name: Joi.string().trim().required(),
    dob: Joi.date().required(),
    gender: Joi.string().required()
});
var studentController = require("../services/student");
exports.getStudentData = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, length_1, page, size, totalPages, startid, endid, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                rows = [][0];
                return [4 /*yield*/, studentController.get_student()];
            case 1:
                rows = _a.sent();
                return [4 /*yield*/, studentController.get_student_length()];
            case 2:
                length_1 = _a.sent();
                page = parseInt(ctx.request.query.page);
                size = parseInt(ctx.request.query.size);
                totalPages = Math.ceil(length_1.rows[0].count / size);
                if (page === undefined ||
                    size === undefined ||
                    typeof page !== "number" ||
                    typeof size !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (page < 0 || size < 0 || page > totalPages) {
                    ctx.response.status = 404;
                    ctx.response.type = "text/html";
                    ctx.body = "Not Found";
                    return [2 /*return*/];
                }
                startid = page * size;
                endid = Math.min((page + 1) * size, length_1.rows[0].count);
                data = rows.rows;
                data = data.slice(startid, endid);
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.studentData_by_classId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var classId, rows, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                classId = parseInt(ctx.params.classId);
                if (classId === undefined || typeof classId !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, studentController.get_student_by_classid(classId)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.studentData_teacherId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var teacherId, rows, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                teacherId = parseInt(ctx.params.teacherId);
                if (teacherId === undefined || typeof teacherId !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, studentController.get_student_by_teacherid(teacherId)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.studentData_subjectId = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var subjectId, rows, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                subjectId = parseInt(ctx.params.subjectId);
                if (subjectId === undefined || typeof subjectId !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, studentController.get_student_by_subjectid(subjectId)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.add_student_in_table = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                req = ctx.request.body;
                return [4 /*yield*/, studentSchema.validateAsync(req)];
            case 1:
                _a.sent();
                // if (
                //   req.studentId === undefined ||
                //   req.name === undefined ||
                //   req.dob === undefined ||
                //   req.gender === undefined
                // ) {
                //   ctx.response.status = 400;
                //   ctx.response.type = "text/html";
                //   ctx.body = "Bad Request";
                //   return;
                // }
                // if (req.name.trim() === "") {
                //   ctx.response.status = 400;
                //   ctx.response.type = "text/html";
                //   ctx.body = "Bad Request";
                //   return;
                // }
                // if (
                //   typeof req.studentId !== "number" ||
                //   typeof req.name !== "string" ||
                //   typeof req.dob !== "string" ||
                //   typeof req.gender !== "string"
                // ) {
                //   ctx.response.status = 400;
                //   ctx.response.type = "text/html";
                //   ctx.body = "Bad Request";
                //   return;
                // }
                return [4 /*yield*/, studentController.add_student(req.studentId, req.name, req.dob, req.gender)];
            case 2:
                // if (
                //   req.studentId === undefined ||
                //   req.name === undefined ||
                //   req.dob === undefined ||
                //   req.gender === undefined
                // ) {
                //   ctx.response.status = 400;
                //   ctx.response.type = "text/html";
                //   ctx.body = "Bad Request";
                //   return;
                // }
                // if (req.name.trim() === "") {
                //   ctx.response.status = 400;
                //   ctx.response.type = "text/html";
                //   ctx.body = "Bad Request";
                //   return;
                // }
                // if (
                //   typeof req.studentId !== "number" ||
                //   typeof req.name !== "string" ||
                //   typeof req.dob !== "string" ||
                //   typeof req.gender !== "string"
                // ) {
                //   ctx.response.status = 400;
                //   ctx.response.type = "text/html";
                //   ctx.body = "Bad Request";
                //   return;
                // }
                _a.sent();
                ctx.response.status = 201;
                ctx.response.type = "text/html";
                ctx.body = "data is inserted in students table";
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
