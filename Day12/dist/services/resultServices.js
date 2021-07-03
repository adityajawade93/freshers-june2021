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
var sqlserver = require('../sqlserver');
function checkSubject(studentId, subjectId) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n    SELECT s.sid\n    FROM school.student s\n    INNER JOIN school.studies_in ON s.sid = studies_in.sid\n    INNER JOIN (\n\tSELECT c.classid,sb.subjectname,sb.subjectid\n    FROM school.class c \n    INNER  JOIN school.schedule s ON c.classid = s.classid \n    INNER  JOIN school.subject sb ON s.subjectid = sb.subjectid\n    WHERE sb.subjectid = $1\n    ) c ON studies_in.classid = c.classid\n    WHERE s.sid = $2\n   ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sqlserver.query(query, [subjectId, studentId], function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            if (res.rows.length == 0)
                                resolve(false);
                            else
                                resolve(true);
                        }
                    });
                })];
        });
    });
}
function addMarks(studentId, subjectId, marks) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n     INSERT INTO school.result(SUBJECTID,SID,marks) VALUES($1,$2,$3);\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sqlserver.query(query, [subjectId, studentId, marks], function (err, res) {
                        if (err)
                            reject(err);
                        else
                            resolve("marks added");
                    });
                })];
        });
    });
}
function updateMarks(studentId, subjectId, marks) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n      UPDATE school.result\n      SET marks = $1\n      WHERE SUBJECTID = $2 AND SID = $3\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sqlserver.query(query, [marks, subjectId, studentId], function (err, res) {
                        if (err)
                            reject(err);
                        else
                            resolve("marks added");
                    });
                })];
        });
    });
}
function getMarks(studentId) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n   SELECT s.subjectname , r.marks\nFROM school.result r\nLEFT JOIN school.subject s\nON r.subjectid = s.subjectid\nWHERE r.sid = $1;\n   ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sqlserver.query(query, [studentId], function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            resolve(res.rows);
                        }
                    });
                })];
        });
    });
}
function getHighestMarksPerSubject(classId) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n    SELECT s.sid,s.name , a.subjectname , a.max_marks\n    FROM(\n    SELECT sb.subjectname,MAX(r.marks) AS max_marks\n    FROM school.student s\n    LEFT JOIN school.studies_in ON studies_in.sid = s.sid\n    LEFT JOIN school.class c ON studies_in.classid = c.classid\n    LEFT JOIN school.result r ON r.sid = s.sid\n    LEFT JOIN school.subject sb ON r.subjectid = sb.subjectid\n    WHERE c.classid = $1\n    GROUP BY subjectname\n    ) a\n    JOIN (\n\tSELECT s.SID ,s.name , sb.subjectname , r.marks\n    FROM school.student s\n    LEFT JOIN school.result r ON r.sid = s.sid\n    LEFT JOIN school.subject sb ON r.subjectid = sb.subjectid\n   ) s\n\n    ON a.max_marks = s.marks AND a.subjectname = s.subjectname;\n\n   ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sqlserver.query(query, [classId], function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            resolve(res.rows);
                        }
                    });
                })];
        });
    });
}
function getTop10Marks(classId) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = "\n    SELECT s.sid , s.name , a.total_marks\n    FROM school.student s\n    INNER JOIN(\n    SELECT SUM(r.marks) AS total_marks , s.sid\n    FROM school.student s\n    JOIN school.studies_in ON studies_in.sid = s.sid\n    JOIN school.class c ON studies_in.classid = c.classid\n    JOIN school.result r ON r.sid = s.sid\n    WHERE c.classid =  $1\n    GROUP BY s.sid\n    ) a\n    ON s.sid = a.sid\n    ORDER BY total_marks DESC\n    LIMIT 10\n    ";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sqlserver.query(query, [classId], function (err, res) {
                        if (err)
                            reject(err);
                        else {
                            resolve(res.rows);
                        }
                    });
                })];
        });
    });
}
module.exports = {
    checkSubject: checkSubject,
    addMarks: addMarks,
    updateMarks: updateMarks,
    getMarks: getMarks,
    getHighestMarksPerSubject: getHighestMarksPerSubject,
    getTop10Marks: getTop10Marks
};
