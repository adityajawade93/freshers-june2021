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
var koa = require('koa');
var koarouter = require("@koa/router");
var bodyParser = require('koa-bodyparser');
var sclient = require("./database");
var app = new koa();
var router = new koarouter();
router.get('/Teachers', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sclient.query("SET search_path TO school")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sclient.query("SELECT * FROM Teachers")];
                    case 2:
                        rows_1 = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var rows_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows_1 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_1.rows;
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/Subjects', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sclient.query("SET search_path TO school")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sclient.query("SELECT * FROM Subjects")];
                    case 2:
                        rows_2 = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var rows_2, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows_2 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_2.rows;
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/Students', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sclient.query("SET search_path TO school");
                        return [4 /*yield*/, sclient.query("SELECT * FROM Students")];
                    case 1:
                        rows_3 = _a.sent();
                        return [4 /*yield*/, sclient.query("SELECT Count(*) FROM Students")];
                    case 2:
                        len_1 = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var rows_3, len_1, page, size, totalPages, start, end, req_data, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows_3 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                page = parseInt(ctx.request.query.page);
                size = parseInt(ctx.request.query.size);
                totalPages = Math.ceil((len_1.rows[0].count) / size);
                if (page === undefined || size === undefined || typeof page !== 'number' || typeof size !== 'number') {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (page < 0 || size < 0 || page > totalPages) {
                    ctx.response.status = 404;
                    ctx.response.type = 'text/html';
                    ctx.body = "Not Found";
                    return [2 /*return*/];
                }
                start = page * size;
                end = Math.min((page + 1) * size, len_1.rows[0].count);
                req_data = rows_3.rows;
                req_data = (req_data).slice(start, end);
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = req_data;
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/class', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sclient.query("SET search_path TO school")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sclient.query("SELECT * FROM Class_schedule")];
                    case 2:
                        rows_4 = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var rows_4, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                rows_4 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_4.rows;
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get student using teacherid
router.get('/Teachers/:id', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sclient.query("SET search_path TO school")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sclient.query("SELECT ST.roll_num ,ST.fname,ST.lname,ST.standard \n          FROM Students AS ST INNER JOIN Teachers AS T ON T.subcode=ST.subcode AND T.staffid=" + id_1)];
                    case 2:
                        rows_5 = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var id_1, rows_5, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_1 = ctx.params.id;
                if (id_1 === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows_5 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_5.rows;
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get student using subjectid
router.get('/Subjects/:id', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sclient.query("SET search_path TO school")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sclient.query("SELECT ST.roll_num,ST.fname,ST.lname,ST.standard\n              FROM Students AS ST,Subjects AS sub WHERE sub.subcode=" + id_2 + " AND sub.subcode=ST.subcode")];
                    case 2:
                        rows_6 = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var id_2, rows_6, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_2 = ctx.params.id;
                if (id_2 === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows_6 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_6.rows;
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/marks/:id', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sclient.query("SET search_path TO school")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sclient.query("SELECT M.subcode,S.subject,M.marks FROM Marks AS M,Subjects AS S WHERE M.roll_num=" + id_3 + " AND M.subcode=S.subcode")];
                    case 2:
                        rows_7 = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var id_3, rows_7, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id_3 = ctx.params.id;
                if (id_3 === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows_7 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_7.rows;
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get topper 
router.get('/topclass/:c_id/topsubject/:s_id', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    function execute() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sclient.query("SET search_path TO school")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sclient.query("SELECT ST.roll_num,ST.fname,S.marks FROM (SELECT * FROM Marks WHERE standard=" + c_id + " AND subcode=" + s_id + " ORDER BY marks DESC) \n                            AS S,Students AS ST WHERE S.roll_num=ST.roll_num LIMIT 1")];
                    case 2:
                        rows_8 = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var c_id, s_id, rows_8, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                c_id = ctx.params.c_id;
                s_id = ctx.params.s_id;
                if (c_id === undefined || s_id === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = 'text/html';
                    ctx.body = 'Bad Request';
                    return [2 /*return*/];
                }
                rows_8 = [][0];
                return [4 /*yield*/, execute()];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
                ctx.body = rows_8.rows;
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = 'text/html';
                ctx.body = "server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.use(bodyParser());
app.use(router.routes());
app.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
        ctx.body = 'Not Found';
        return [2 /*return*/];
    });
}); });
app.listen(5000, function () {
    console.log("server is up at 5000");
});
