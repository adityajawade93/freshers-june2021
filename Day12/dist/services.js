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
var sql = require('./sqlserver');
function addStudent(sid, name, gender, phone, classId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query("begin")
                        .then(function () {
                        return sql.query("INSERT INTO school.student(SID,NAME,GENDER,PHONE) VALUES ($1,$2,$3,$4)", [sid, name, gender, phone]);
                    })
                        .then(function () {
                        return sql.query("INSERT INTO school.studies_in(SID,CLASSID) VALUES ($1,$2)", [sid, classId]);
                    })
                        .then(function () {
                        return sql.query("commit");
                    })
                        .then(function () {
                        resolve("student added");
                    })
                        .catch(function (err) {
                        reject(err);
                        return sql.query("rollback");
                    });
                })];
        });
    });
}
function addTeacher(tid, name, gender, phone, subjectId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query("begin")
                        .then(function () {
                        return sql.query("INSERT INTO school.teacher(TID,NAME,GENDER,PHONE) VALUES ($1,$2,$3,$4)", [tid, name, gender, phone]);
                    })
                        .then(function () {
                        return sql.query("INSERT INTO school.teacher_takes(TID,SUBJECTID) VALUES ($1,$2)", [tid, subjectId]);
                    })
                        .then(function () {
                        return sql.query("commit");
                    })
                        .then(function () {
                        resolve("Teacher added");
                    })
                        .catch(function (err) {
                        reject(err);
                        return sql.query("rollback");
                    });
                })];
        });
    });
}
function addSubject(subjectId, subjectName) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n     INSERT INTO school.subject(SUBJECTID,SUBJECTNAME) VALUES($1,$2);\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, [subjectId, subjectName], function (err, res) {
                        if (err)
                            reject(err);
                        else
                            resolve("Subject added");
                    });
                })];
        });
    });
}
function addSchedule(classId, subjectId) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n     INSERT INTO school.schedule(CLASSID,SUBJECTID) VALUES($1,$2);\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, [classId, subjectId], function (err, res) {
                        if (err)
                            reject(err);
                        else
                            resolve("Schedule added");
                    });
                })];
        });
    });
}
function getStudentcount() {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n       SELECT COUNT(*) AS count FROM school.student;\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, function (err, res) {
                        if (err)
                            reject(err);
                        else
                            resolve(res.rows[0].count);
                    });
                })];
        });
    });
}
function getStudents(size, page) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n        SELECT * FROM school.student OFFSET $1 LIMIT $2;\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, [page * size, size], function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            var data = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                data.push({
                                    "sid": res.rows[i].sid,
                                    "name": res.rows[i].name,
                                    "gender": res.rows[i].gender,
                                    "phone": res.rows[i].phone
                                });
                            }
                            resolve(data);
                        }
                    });
                })];
        });
    });
}
function getTeachers() {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n    SELECT t.tid,t.name,sb.subjectname,t.gender,t.phone\n    FROM school.teacher t\n    LEFT  JOIN school.teacher_takes tt ON t.tid = tt.tid \n    LEFT  JOIN school.subject sb ON tt.subjectid = sb.subjectid\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            var data = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                data.push({
                                    "tid": res.rows[i].tid,
                                    "name": res.rows[i].name,
                                    "gender": res.rows[i].gender,
                                    "phone": res.rows[i].phone,
                                    "subjectid": res.rows[i].subjectname
                                });
                            }
                            resolve(data);
                        }
                    });
                })];
        });
    });
}
function getSubjects() {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n        SELECT * FROM school.subject;\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            var data = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                data.push({
                                    "subjectId": res.rows[i].subjectid,
                                    "subjectName": res.rows[i].subjectname,
                                });
                            }
                            resolve(data);
                        }
                    });
                })];
        });
    });
}
function getClasses() {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n        SELECT * FROM school.class;\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            var data = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                data.push({
                                    "classId": res.rows[i].classid,
                                    "RoomNo": res.rows[i].roomno,
                                });
                            }
                            resolve(data);
                        }
                    });
                })];
        });
    });
}
function getStudentsByClassId(classId) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n      SET search_path TO school;\n      SELECT s.sid,s.name,s.gender,s.phone,studies_in.classid\n      FROM student s\n      LEFT JOIN studies_in ON s.sid = studies_in.sid\n      WHERE classid= $1;\n\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, [classId], function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            var data = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                data.push({
                                    "sid": res.rows[i].sid,
                                    "name": res.rows[i].name,
                                    "gender": res.rows[i].gender,
                                    "phone": res.rows[i].phone,
                                    "classId": res.rows[i].classid
                                });
                            }
                            resolve(data);
                        }
                    });
                })];
        });
    });
}
function getStudentsBySubjectId(subjectId) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n      SET search_path TO school;\n      SELECT s.sid,s.name,s.gender,s.phone,c.subjectname\n      FROM student s\n      INNER JOIN studies_in ON s.sid = studies_in.sid\n      INNER JOIN (\n\t     SELECT c.classid,sb.subjectname,sb.subjectid\n      FROM class c \n      INNER  JOIN schedule s ON c.classid = s.classid \n      INNER  JOIN subject sb ON s.subjectid = sb.subjectid\n      WHERE sb.subjectid = $1\n      ) c ON studies_in.classid = c.classid;\n\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, [subjectId], function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            var data = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                data.push({
                                    "sid": res.rows[i].sid,
                                    "name": res.rows[i].name,
                                    "gender": res.rows[i].gender,
                                    "phone": res.rows[i].phone,
                                    "subjectName": res.rows[i].subjectname
                                });
                            }
                            resolve(data);
                        }
                    });
                })];
        });
    });
}
function getStudentsByTeacherId(teacherId) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n      SET search_path TO school;\n      SELECT s.sid,s.name,s.gender,s.phone  , t.teachername , t.subjectname\n      FROM student s\n      INNER JOIN studies_in ON s.sid = studies_in.sid\n      INNER JOIN(\n\t  SELECT c.classid , t.tid , t.name , t.subjectname , t.subjectid\n      FROM class c\n      INNER JOIN schedule s ON c.classid = s.classid\n      INNER JOIN(\n\t  SELECT t.tid,t.name,sb.subjectname,sb.subjectid\n      FROM teacher t\n      LEFT  JOIN teacher_takes tt ON t.tid = tt.tid \n      LEFT  JOIN subject sb ON tt.subjectid = sb.subjectid\n      WHERE t.tid = $1\n      ) t ON s.subjectid = t.subjectid\n\t  ) t ON studies_in.classid = t.classid;\n\n\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sql.query(query, [teacherId], function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            var data = [];
                            for (var i = 0; i < res.rows.length; i++) {
                                data.push({
                                    "sid": res.rows[i].sid,
                                    "name": res.rows[i].name,
                                    "gender": res.rows[i].gender,
                                    "phone": res.rows[i].phone,
                                    "teacherName": res.rows[i].teachername,
                                    "subjectName": res.rows[i].subjectname
                                });
                            }
                            resolve(data);
                        }
                    });
                })];
        });
    });
}
module.exports = {
    addStudent: addStudent,
    addTeacher: addTeacher,
    addSubject: addSubject,
    addSchedule: addSchedule,
    getStudentcount: getStudentcount,
    getStudents: getStudents,
    getTeachers: getTeachers,
    getClasses: getClasses,
    getSubjects: getSubjects,
    getStudentsByClassId: getStudentsByClassId,
    getStudentsBySubjectId: getStudentsBySubjectId,
    getStudentsByTeacherId: getStudentsByTeacherId
};
