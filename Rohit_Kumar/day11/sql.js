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
var _this = this;
var sqlclient = require("./index");
exports.get_teacher = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select * from teachers")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_student = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select * from students")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_subject = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select * from subject")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.check_subject = function (studentid) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select subj_id from class_schedule,classes where st_id=" + studentid + " and classid=cls_id")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.subject_length = function (studentid) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select count(*) from (select subj_id from class_schedule,classes where st_id=" + studentid + " and classid=cls_id) as S")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_class_schedule = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select * from class_schedule")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_classes = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select * from classes")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_result = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select * from result")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_student_by_classid = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select S.s_id,S.s_name from students as S,classes where cls_id=" + id + " and st_id=s_id")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_student_by_teacherid = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select S.s_id,S.s_name from students as S,classes,class_schedule where tch_id=" + id + " and cls_id=classid and st_id=s_id")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_student_by_subjectid = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select S.s_id,S.s_name from students AS S,classes,class_schedule where subj_id=" + id + " and cls_id=classid and st_id=s_id")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_subjectmarks_by_studentid = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select sub_id,sub_name,marks from result,subject where studentid=" + id + " and subjectid=sub_id")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_topper_by_classid_and_subjectid = function (c_id, sub_id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select s_id,s_name,S.marks from (select * from result where clas_id=" + c_id + " and subjectid=" + sub_id + " order by marks desc) as S,students where S.studentid=s_id limit 1")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.get_topten_students = function (c_id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sqlclient.query("select s.s_id , s.s_name , a.total_marks\n          from myschool.students s\n          inner join(\n          select sum(r.marks) AS total_marks , s.s_id\n          from myschool.students s\n          join myschool.classes ON classes.st_id = s.s_id\n          join myschool.class_schedule c ON classes.cls_id = c.classid\n          join myschool.result r ON r.studentid = s.s_id\n          where c.classid =" + c_id + "\n          group by s.s_id\n          ) a\n          on s.s_id = a.s_id\n          order BY total_marks desc\n          limit 10")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.add_student = function (s_id, s_name, dob, gender) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                data = [s_id, s_name, dob, gender];
                return [4 /*yield*/, sqlclient.query("insert into students values($1,$2,$3,$4)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.add_teacher = function (t_id, t_fname, t_lname, gender) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                data = [t_id, t_fname, t_lname, gender];
                return [4 /*yield*/, sqlclient.query("insert into teachers values($1,$2,$3,$4)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.add_student_in_class = function (cls_id, st_id) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                data = [cls_id, st_id];
                return [4 /*yield*/, sqlclient.query("insert into classes values($1,$2)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.add_subject = function (sub_id, sub_name) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                data = [sub_id, sub_name];
                return [4 /*yield*/, sqlclient.query("insert into subject values($1,$2)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.add_class_schedule = function (classid, classno, subj_id, subj_name, tch_id, tch_fname) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                data = [classid, classno, subj_id, subj_name, tch_id, tch_fname];
                return [4 /*yield*/, sqlclient.query("insert into class_schedule values($1,$2,$3,$4,$5,$6)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.add_result = function (result_id, studentid, clas_id, subjectid, marks) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                data = [result_id, studentid, clas_id, subjectid, marks];
                return [4 /*yield*/, sqlclient.query("insert into result values($1,$2,$3,$4,$5)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.update_result = function (studentid, subjectid, marks) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("set search_path to myschool")];
            case 1:
                _a.sent();
                data = [studentid, subjectid, marks];
                return [4 /*yield*/, sqlclient.query("update result set marks=" + marks + " where studentid=" + studentid + " and subjectid=" + subjectid)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
