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
var koa = require("koa");
var koaroute = require("@koa/router");
//import * as bodyparser from 'koa-bodyparser';
var bodyparser = require('koa-bodyparser');
var pg_1 = require("pg");
var uuid = require("uuid");
var errorMessage = "Interal error occured. Try after some time";
var pageNotFoundMessage = 'Page Not Found';
var invalidPageMessage = "Page and (or) size invalid";
var invalidInputMessage = "Invalid Input";
// const client: Client = new Client({
//     user: "arnab",
//     password: "1234",
//     host: "127.0.0.1",
//     port: 5432,
//     database: "zopsmart"
// });
var client = new pg_1.Pool({
    user: "arnab",
    password: "1234",
    host: "127.0.0.1",
    port: 5432,
    database: "zopsmart"
});
var router = new koaroute();
var app = new koa();
var validationPageAndPageSize = function (pageSize, noOfrecords) {
    if (Number.isInteger(pageSize.page) && Number.isInteger(pageSize.size)) {
        var maxNumberOfPages = Math.ceil(noOfrecords / pageSize.size);
        var minIndex = 0;
        if (pageSize.page < maxNumberOfPages) {
            minIndex = pageSize.page * pageSize.size;
            var maxIndex = noOfrecords < pageSize.size ? noOfrecords : pageSize.size * (pageSize.page + 1);
            return [minIndex, maxIndex];
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};
var insertStudentInfoIntoDB = function (studentInfo) {
    var insertDBPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("INSERT INTO school.student VALUES ($1,$2,$3,$4);", studentInfo).then(function (result) {
                resolve("Successful");
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return insertDBPromise;
};
var getStudentInfoFromDB = function (resolve, reject) {
    client.connect().then(function () {
        client.query("SELECT * FROM school.student").then(function (result) {
            //client.end();
            resolve(result.rows);
        })["catch"](function () {
            //client.end();
            reject(false);
        })["finally"](function () {
            //client.end();
        });
    });
};
var getStudentInfobyStudentIdFromDB = function (studentId) {
    var getStudentPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("SELECT * FROM school.student where sid= $1", [studentId]).then(function (result) {
                resolve(result.rows);
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return getStudentPromise;
};
var getStudentInfobyClassIdFromDB = function (classId) {
    var getStudentPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("SELECT DISTINCT s.sid, s.sname,s.rollno,s.address FROM school.student s JOIN school.studentclass sc ON s.sid = sc.sid AND cid =$1;", [classId]).then(function (result) {
                resolve(result.rows);
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return getStudentPromise;
};
var getStudentInfobyTeacherIdFromDB = function (teacherId) {
    var getStudentPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("SELECT DISTINCT s.sid, s.sname,s.rollno,s.address FROM school.student s ,  school.studentclass sc, school.classschedule cs, school.subject su WHERE s.sid = sc.sid AND sc.cid = cs.cid AND cs.ssid = su.suid AND tid=$1", [teacherId]).then(function (result) {
                resolve(result.rows);
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return getStudentPromise;
};
var getTeacherInfoFromDB = function (resolve, reject) {
    client.connect().then(function () {
        client.query("SELECT * FROM school.teacher").then(function (result) {
            resolve(result.rows);
        })["catch"](function () {
            reject(false);
        })["finally"](function () {
            //client.end();
        });
    });
};
var insertTeacherInfoIntoDB = function (teacherInfo) {
    var insertDBPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("INSERT INTO school.teacher VALUES ($1,$2,$3,$4);", teacherInfo).then(function (result) {
                resolve(result.rows);
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return insertDBPromise;
};
var getSubjectInfoFromDB = function (resolve, reject) {
    client.connect().then(function () {
        client.query("SELECT * FROM school.subject").then(function (result) {
            resolve(result.rows);
        })["catch"](function () {
            reject(false);
        })["finally"](function () {
            //client.end();
        });
    });
};
var insertSubjectInfoIntoDB = function (subjectInfo) {
    var insertDBPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("INSERT INTO school.subject VALUES ($1,$2,$3,$4);", subjectInfo).then(function (result) {
                resolve(result.rows);
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return insertDBPromise;
};
var insertClassScheduleInfoIntoDB = function (classScheduleinfo) {
    var insertDBPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("INSERT INTO school.classschedule VALUES ($1,$2,$3,$4);", classScheduleinfo).then(function (result) {
                resolve(result.rows);
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return insertDBPromise;
};
var getStudentInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var promiseDB, studentinfo, pageSizeData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                promiseDB = new Promise(getStudentInfoFromDB);
                pageSizeData = {
                    page: Number(ctx.query.page),
                    size: Number(ctx.query.size)
                };
                return [4 /*yield*/, promiseDB.then(function (data) {
                        studentinfo = data;
                        console.log(studentinfo);
                        if (studentinfo.length === 0) {
                            ctx.status = 200;
                            ctx.body = "There is no student information.";
                        }
                        else {
                            var rangeOfInformation = validationPageAndPageSize(pageSizeData, studentinfo.length);
                            if (rangeOfInformation === false) {
                                ctx.status = 406;
                                ctx.body = invalidPageMessage;
                            }
                            else {
                                ctx.status = 200;
                                ctx.body = studentinfo.slice(rangeOfInformation[0], rangeOfInformation[1]);
                            }
                        }
                    })["catch"](function (data) {
                        ctx.status = 400;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getTeacherInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var promiseDB, teacherinfo, pageSizeData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                promiseDB = new Promise(getTeacherInfoFromDB);
                pageSizeData = {
                    page: Number(ctx.query.page),
                    size: Number(ctx.query.size)
                };
                return [4 /*yield*/, promiseDB.then(function (data) {
                        teacherinfo = data;
                        console.log(teacherinfo);
                        if (teacherinfo.length === 0) {
                            ctx.status = 200;
                            ctx.body = "There is no teacher information.";
                        }
                        else {
                            var rangeOfInformation = validationPageAndPageSize(pageSizeData, teacherinfo.length);
                            if (rangeOfInformation === false) {
                                ctx.status = 406;
                                ctx.body = invalidPageMessage;
                            }
                            else {
                                ctx.status = 200;
                                ctx.body = teacherinfo.slice(rangeOfInformation[0], rangeOfInformation[1]);
                            }
                        }
                    })["catch"](function (data) {
                        ctx.status = 400;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getSubjectInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var promiseDB, subjectinfo, pageSizeData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                promiseDB = new Promise(getSubjectInfoFromDB);
                pageSizeData = {
                    page: Number(ctx.query.page),
                    size: Number(ctx.query.size)
                };
                return [4 /*yield*/, promiseDB.then(function (data) {
                        subjectinfo = data;
                        console.log(subjectinfo);
                        if (subjectinfo.length === 0) {
                            ctx.status = 200;
                            ctx.body = "There is no subject information.";
                        }
                        else {
                            var rangeOfInformation = validationPageAndPageSize(pageSizeData, subjectinfo.length);
                            if (rangeOfInformation === false) {
                                ctx.status = 406;
                                ctx.body = invalidPageMessage;
                            }
                            else {
                                ctx.status = 200;
                                ctx.body = subjectinfo.slice(rangeOfInformation[0], rangeOfInformation[1]);
                            }
                        }
                    })["catch"](function (data) {
                        ctx.status = 400;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getStudentInfoByStudentid = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, studentInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                return [4 /*yield*/, getStudentInfobyStudentIdFromDB(id).then(function (data) {
                        studentInfo = data;
                        if (studentInfo.length === 0) {
                            ctx.status = 204;
                            ctx.body = "No data to send";
                        }
                        else {
                            ctx.status = 200;
                            ctx.body = studentInfo;
                        }
                    })["catch"](function (data) {
                        ctx.status = 400;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getStudentInfoByTeacherId = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, studentInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                return [4 /*yield*/, getStudentInfobyTeacherIdFromDB(id).then(function (data) {
                        studentInfo = data;
                        ctx.status = 200;
                        ctx.body = studentInfo;
                    })["catch"](function (data) {
                        ctx.status = 400;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getStudentInfoByClassId = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, studentInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                return [4 /*yield*/, getStudentInfobyClassIdFromDB(id).then(function (data) {
                        studentInfo = data;
                        ctx.status = 200;
                        ctx.body = studentInfo;
                    })["catch"](function (data) {
                        ctx.status = 400;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var insertStudentInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var studentInfo, address, studentEntity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                studentInfo = ctx.request.body;
                console.log(ctx);
                if (!(studentInfo !== undefined && studentInfo.name !== undefined && studentInfo.rollno !== undefined)) return [3 /*break*/, 2];
                address = null;
                if (studentInfo.address !== undefined) {
                    address = studentInfo.address;
                }
                studentEntity = {
                    sid: uuid.v4(),
                    sname: studentInfo.name,
                    rollno: studentInfo.rollno,
                    address: address
                };
                return [4 /*yield*/, insertStudentInfoIntoDB([studentEntity.sid, studentEntity.sname, studentEntity.rollno, studentEntity.address]).then(function (data) {
                        ctx.status = 200;
                        ctx.body = "Data inserted successfully";
                    })["catch"](function (data) {
                        ctx.status = 406;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                ctx.body = invalidInputMessage;
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var insertTeacherInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var teacherInfo, specialization, teacherEntity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                teacherInfo = ctx.request.body;
                if (!(teacherInfo !== undefined && teacherInfo.name !== undefined && teacherInfo.contactno !== undefined)) return [3 /*break*/, 2];
                specialization = null;
                if (teacherInfo.specialization !== undefined) {
                    specialization = teacherInfo.specialization;
                }
                teacherEntity = {
                    tid: uuid.v4(),
                    tname: teacherInfo.name,
                    contactno: teacherInfo.contactno,
                    specialization: specialization
                };
                return [4 /*yield*/, insertTeacherInfoIntoDB([teacherEntity.tid, teacherEntity.tname, teacherEntity.specialization, teacherEntity.contactno]).then(function (data) {
                        ctx.status = 200;
                        ctx.body = "Data inserted successfully";
                    })["catch"](function (data) {
                        ctx.status = 406;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                ctx.body = invalidInputMessage;
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var insertSubjectInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var subjectInfo, suid, alternatetid, tid, subjectEntity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                subjectInfo = ctx.request.body;
                if (!(subjectInfo.name !== undefined)) return [3 /*break*/, 2];
                suid = uuid.v4();
                alternatetid = null;
                tid = null;
                if (subjectInfo.tid !== undefined) {
                    tid = subjectInfo.tid;
                }
                if (subjectInfo.atid !== undefined) {
                    alternatetid = subjectInfo.atid;
                }
                subjectEntity = {
                    suid: uuid.v4(),
                    sname: subjectInfo.name,
                    tid: tid,
                    alternatetid: alternatetid
                };
                return [4 /*yield*/, insertSubjectInfoIntoDB([subjectEntity.suid, subjectEntity.sname, subjectEntity.tid, subjectEntity.alternatetid]).then(function () {
                        ctx.status = 200;
                        ctx.body = "Data inserted successfully";
                    })["catch"](function () {
                        ctx.status = 406;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                ctx.body = invalidInputMessage;
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var insertClassScheduleInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var classScheduleInfo, classScheduleEntity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                classScheduleInfo = ctx.request.body;
                if (!(classScheduleInfo !== undefined && classScheduleInfo.ssid !== undefined && classScheduleInfo.start !== undefined && classScheduleInfo.end !== undefined)) return [3 /*break*/, 2];
                classScheduleEntity = {
                    cid: uuid.v4(),
                    ssid: classScheduleInfo.ssid,
                    starttime: classScheduleInfo.start,
                    endtime: classScheduleInfo.end
                };
                return [4 /*yield*/, insertClassScheduleInfoIntoDB([classScheduleEntity.cid, classScheduleEntity.ssid, classScheduleEntity.starttime, classScheduleEntity.endtime]).then(function () {
                        ctx.status = 200;
                        ctx.body = "Data inserted successfully";
                    })["catch"](function () {
                        ctx.status = 406;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                ctx.body = invalidInputMessage;
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var insertResultInfoIntoDB = function (resultInfo) {
    var insertDBPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("INSERT INTO school.resulttable VALUES ($1,$2,$3);", resultInfo).then(function (result) {
                resolve(result.rows);
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return insertDBPromise;
};
var insertResultInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var resultInfo, resultEntity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resultInfo = ctx.request.body;
                if (!(resultInfo.student !== undefined && resultInfo.subject !== undefined && resultInfo.mark !== undefined)) return [3 /*break*/, 2];
                resultEntity = {
                    sid: resultInfo.student,
                    ssid: resultInfo.subject,
                    mark: resultInfo.mark
                };
                return [4 /*yield*/, insertResultInfoIntoDB([resultEntity.ssid, resultEntity.ssid, resultEntity.mark]).then(function () {
                        ctx.status = 200;
                        ctx.body = "Data inserted successfully";
                    })["catch"](function () {
                        ctx.status = 406;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                ctx.body = invalidInputMessage;
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var getToperBySubject = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, studentInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                return [4 /*yield*/, getTopperBySubjectIdFromDB(id).then(function (data) {
                        studentInfo = data;
                        ctx.status = 200;
                        ctx.body = studentInfo;
                    })["catch"](function (data) {
                        ctx.status = 400;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getTopperBySubjectIdFromDB = function (subjectId) {
    var getStudentPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("SELECT s.sname FROM school.student s WHERE s.sid IN (SELECT r.sid FROM school.resulttable r WHERE r.mark = (SELECT MAX(mark) FROM school.resulttable WHERE ssid=$1));", [subjectId]).then(function (result) {
                resolve(result.rows);
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return getStudentPromise;
};
var getTopperOftheClass = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, studentInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                return [4 /*yield*/, getToppersFromDB().then(function (data) {
                        studentInfo = data;
                        ctx.status = 200;
                        ctx.body = studentInfo;
                    })["catch"](function (data) {
                        ctx.status = 400;
                        ctx.body = errorMessage;
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getToppersFromDB = function () {
    var getStudentPromise = new Promise(function (resolve, reject) {
        client.connect().then(function () {
            client.query("SELECT SUM(r.mark) as total,r.sid,s.sname FROM school.resultTable r , school.student s WHERE s.sid = r.sid GROUP BY r.sid,s.sname ORDER BY  total desc LIMIT 10;").then(function (result) {
                resolve(result.rows);
            })["catch"](function () {
                reject(false);
            })["finally"](function () {
                //client.end();
            });
        });
    });
    return getStudentPromise;
};
router.get("/student", getStudentInfo);
router.get("/teacher", getTeacherInfo);
router.get('/subject', getSubjectInfo);
router.get("/getstudentbyid/:id", getStudentInfoByStudentid);
router.get("/getstudentbyteacher/:id", getStudentInfoByTeacherId);
router.get("/getstudentbyclass/:id", getStudentInfoByClassId);
router.post("/student", insertStudentInfo);
router.post("/teacher", insertTeacherInfo);
router.post('/subject', insertSubjectInfo);
router.post('/classschedule', insertClassScheduleInfo);
router.get('/result/:id', getToperBySubject);
router.get("/topper", getTopperOftheClass);
app.use(bodyparser());
app.use(router.routes());
app.use(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.status = 404;
        ctx.body = pageNotFoundMessage;
        return [2 /*return*/];
    });
}); });
module.exports = { app: app };
