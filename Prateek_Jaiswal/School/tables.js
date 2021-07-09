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
exports.execute1 = function (roll_num, fname, lname, standard, subcode) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO school")];
            case 1:
                _a.sent();
                data = [roll_num, fname, lname, standard, subcode];
                console.log(data);
                return [4 /*yield*/, sqlclient.query("INSERT INTO Students values($1,$2,$3,$4,$5)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.execute2 = function (subcode, subject, staffid) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO school")];
            case 1:
                _a.sent();
                data = [subcode, subject, staffid];
                return [4 /*yield*/, sqlclient.query("INSERT INTO Subjects values($1,$2,$3)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.execute3 = function (staffid, fname, lname, subcode) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO school")];
            case 1:
                _a.sent();
                data = [staffid, fname, lname, subcode];
                return [4 /*yield*/, sqlclient.query("INSERT INTO Teachers values($1,$2,$3,$4)", data)];
            case 2: 
            //console.log(data);
            return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.execute4 = function (uniclassid, Standard, classno, subcode, subject, staffid, T_fname) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO College")];
            case 1:
                _a.sent();
                data = [uniclassid, Standard, classno, subcode, subject, staffid, T_fname];
                return [4 /*yield*/, sqlclient.query("INSERT INTO Class_schedule values($1,$2,$3,$4,$5,$6,$7)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.execute5 = function (resultsid, roll_num, subcode, staffid, standard, marks) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sqlclient.query("SET search_path TO school")];
            case 1:
                _a.sent();
                data = [resultsid, roll_num, subcode, staffid, standard, marks];
                return [4 /*yield*/, sqlclient.query("INSERT INTO result values($1,$2,$3,$4,$5,$6)", data)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
