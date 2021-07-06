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
var koarouter = require("@koa/router");
var koa = require("koa");
var bodyParser = require("koa-bodyparser");
var json = require("koa-json");
var fn = require("./sql");
var port = 4000;
var app = new koa();
var router = new koarouter();
router.get("/student", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows = [][0];
                return [4 /*yield*/, fn.get_student()];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/teacher", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
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
}); });
router.get("/classes", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows = [][0];
                return [4 /*yield*/, fn.get_classes()];
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
}); });
router.get("/subject", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows = [][0];
                return [4 /*yield*/, fn.get_subject()];
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
}); });
router.get("/class_schedule", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows = [][0];
                return [4 /*yield*/, fn.get_class_schedule()];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/result", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows = [][0];
                return [4 /*yield*/, fn.get_result()];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/class/:id", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(ctx.params.id);
                if (id === undefined || typeof id !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_student_by_classid(id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/teacher/:id", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(ctx.url.substring(9));
                if (id === undefined || typeof id !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_student_by_teacherid(id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/subject/:id", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(ctx.url.substring(9));
                if (id === undefined || typeof id !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_student_by_subjectid(id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/marks/:id", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var id, rows, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(ctx.url.substring(7));
                if (id === undefined || typeof id !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_subjectmarks_by_studentid(id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_10 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/topperclass/:c_id/subject/:sub_id", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var c_id, sub_id, rows, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                c_id = parseInt(ctx.params.c_id);
                sub_id = parseInt(ctx.params.sub_id);
                if (c_id === undefined ||
                    typeof c_id !== "number" ||
                    sub_id === undefined ||
                    typeof sub_id !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_topper_by_classid_and_subjectid(c_id, sub_id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_11 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/topten/:c_id", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var c_id, rows, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                c_id = parseInt(ctx.params.c_id);
                if (c_id === undefined || typeof c_id !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                rows = [][0];
                return [4 /*yield*/, fn.get_topten_students(c_id)];
            case 1:
                rows = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = rows.rows;
                return [3 /*break*/, 3];
            case 2:
                err_12 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/createstudent", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.s_id === undefined ||
                    req.s_name === undefined ||
                    req.dob === undefined ||
                    req.gender === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.s_name.trim() === "") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.s_id !== "number" ||
                    typeof req.s_name !== "string" ||
                    typeof req.dob !== "string" ||
                    typeof req.gender !== "string") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_student(req.s_id, req.s_name, req.dob, req.gender)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "text/html";
                ctx.body = "data is inserted in students table";
                return [3 /*break*/, 3];
            case 2:
                err_13 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/createteacher", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.t_id === undefined ||
                    req.t_fname === undefined ||
                    req.t_lname === undefined ||
                    req.gender === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.t_fname.trim() === "" || req.t_lname.trim() === "") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.t_id !== "number" ||
                    typeof req.t_fname !== "string" ||
                    typeof req.t_lname !== "string" ||
                    typeof req.gender !== "string") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_teacher(req.t_id, req.t_fname, req.t_lname, req.gender)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "text/html";
                ctx.body = "data is inserted in teacher table";
                return [3 /*break*/, 3];
            case 2:
                err_14 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/createclasses", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.cls_id === undefined ||
                    req.st_id === undefined ||
                    typeof req.cls_id !== "number" ||
                    typeof req.st_id !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_student_in_class(req.cls_id, req.st_id)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "text/html";
                ctx.body = "data is inserted in classes table";
                return [3 /*break*/, 3];
            case 2:
                err_15 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/createsubject", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.sub_id === undefined ||
                    req.sub_name === undefined ||
                    typeof req.sub_id !== "number" ||
                    typeof req.sub_name !== "string" ||
                    req.sub_name.trim() === "") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_subject(req.sub_id, req.sub_name)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "text/html";
                ctx.body = "data is inserted in Subject table";
                return [3 /*break*/, 3];
            case 2:
                err_16 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/createclass_schedule", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.classid === undefined ||
                    req.classno === undefined ||
                    req.subj_id === undefined ||
                    req.subj_name === undefined ||
                    req.tch_id === undefined ||
                    req.tch_fname === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.classid !== "number" ||
                    typeof req.classno !== "number" ||
                    typeof req.subj_id !== "number" ||
                    typeof req.subj_name !== "string" ||
                    typeof req.tch_id !== "number" ||
                    typeof req.tch_fname !== "string") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.subj_name.trim() === "" || req.tch_fname.trim() === "") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_class_schedule(req.classid, req.classno, req.subj_id, req.subj_name, req.tch_id, req.tch_fname)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "text/html";
                ctx.body = "data is inserted in Class_schedule table";
                return [3 /*break*/, 3];
            case 2:
                err_17 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/createresult", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.result_id === undefined ||
                    req.studentid === undefined ||
                    req.clas_id === undefined ||
                    req.subjectid === undefined ||
                    req.marks === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.result_id !== "number" ||
                    typeof req.studentid !== "number" ||
                    typeof req.clas_id !== "number" ||
                    typeof req.subjectid !== "number" ||
                    typeof req.marks !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.add_result(req.result_id, req.studentid, req.clas_id, req.subjectid, req.marks)];
            case 1:
                _b.sent();
                ctx.response.status = 200;
                ctx.response.type = "text/html";
                ctx.body = "data is inserted in result table";
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put("/updateresult", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, rows, flag, length_1, i, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                req = ctx.request.body;
                rows = [][0];
                if (req.studentid === undefined || req.subjectid === undefined || req.marks === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.studentid !== 'number' || typeof req.subjectid !== 'number' || typeof req.marks !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                flag = 0;
                return [4 /*yield*/, fn.check_subject(req.studentid)];
            case 1:
                rows = _b.sent();
                return [4 /*yield*/, fn.subject_length(req.studentid)];
            case 2:
                length_1 = _b.sent();
                for (i = 0; i < length_1.rows[0].count; i++) {
                    if (req.subjectid === rows.rows[i].subj_id) {
                        flag = 1;
                        break;
                    }
                }
                if (flag === 0) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "This subject is not opted by the student";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fn.update_result(req.studentid, req.subjectid, req.marks)];
            case 3:
                _b.sent();
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "marks are updated in result table";
                return [3 /*break*/, 5];
            case 4:
                _a = _b.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.use(json());
app.use(bodyParser());
app.use(router.routes());
app.use(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.response.status = 404;
        ctx.response.type = "text/html";
        ctx.body = "Not Found";
        return [2 /*return*/];
    });
}); });
app.listen(port, function () {
    console.log("server is running at port " + port);
});
