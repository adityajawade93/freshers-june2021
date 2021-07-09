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
var scheduleController = require('../services/classSchedule');
exports.getClass_scheduleData = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows = [][0];
                return [4 /*yield*/, scheduleController.get_class_schedule()];
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
}); };
exports.add_class_schedule_in_table = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req = ctx.request.body;
                if (req.cls_Id === undefined ||
                    req.classno === undefined ||
                    req.subjId === undefined ||
                    req.subject_name === undefined ||
                    req.teach_Id === undefined ||
                    req.teacher_fname === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (typeof req.cls_Id !== "number" ||
                    typeof req.classno !== "number" ||
                    typeof req.subjId !== "number" ||
                    typeof req.subject_name !== "string" ||
                    typeof req.teach_Id !== "number" ||
                    typeof req.teacher_fname !== "string") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (req.subject_name.trim() === "" || req.teacher_fname.trim() === "") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, scheduleController.add_class_schedule(req.cls_Id, req.classno, req.subjId, req.subject_name, req.teach_Id, req.teacher_fname)];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "text/html";
                ctx.body = "data is inserted in Class_schedule table";
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
