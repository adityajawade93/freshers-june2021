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
var _a = require('@jest/globals'), test = _a.test, expect = _a.expect, describe = _a.describe;
var request = require('supertest');
var app = require('./passenger_koa');
describe('Test for POST', function () {
    test('test of valid inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var task, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    task = {
                        name: "Sagar Doe",
                        trips: 259,
                        airline: [
                            {
                                id: 5,
                                name: "Eva Air",
                                country: "Taiwan",
                                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
                                slogan: "Sharing the World, Flying Together",
                                head_quarters: "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
                                website: "www.evaair.com",
                                established: "1989"
                            }
                        ],
                        __v: 0
                    };
                    return [4 /*yield*/, request(app.callback()).post('/v1/passengers').send(task)];
                case 1:
                    res = _a.sent();
                    expect(res.text).toBe('passenger named Sagar Doe inserted in database');
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    test('test of invalid inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var task, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    task = {
                        name: 79,
                        trips: 259,
                        airline: [
                            {
                                id: 5,
                                name: "Eva Air",
                                country: "Taiwan",
                                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
                                slogan: "Sharing the World, Flying Together",
                                head_quarters: "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
                                website: "www.evaair.com",
                                established: "1989"
                            }
                        ],
                        __v: 0
                    };
                    return [4 /*yield*/, request(app.callback()).post('/v1/passengers').send(task)];
                case 1:
                    res = _a.sent();
                    expect(res.text).toBe('The Request is not valid');
                    expect(res.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test for GET', function () {
    test('test of valid inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var page, size, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = 1;
                    size = 2;
                    return [4 /*yield*/, request(app.callback()).get("/v1/passengers?page=" + page + "&size=" + size)];
                case 1:
                    res = _a.sent();
                    expect(res.text).toBe("[{\n      \"_id\": \"5ef4a412aab3841847750ce8\",\n      \"name\": \"John Doe\",\n      \"trips\": 250,\n      \"airline\": [\n          {\n              \"id\": 5,\n              \"name\": \"Eva Air\",\n              \"country\": \"Taiwan\",\n              \"logo\": \"https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png\",\n              \"slogan\": \"Sharing the World, Flying Together\",\n              \"head_quaters\": \"376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan\",\n              \"website\": \"www.evaair.com\",\n              \"established\": \"1989\"\n          }\n      ],\n      \"__v\": 0\n  },\n  {\n      \"_id\": \"5ef4a412aab3841847750ce8\",\n      \"name\": \"John Doe\",\n      \"trips\": 250,\n      \"airline\": [\n          {\n              \"id\": 5,\n              \"name\": \"Eva Air\",\n              \"country\": \"Taiwan\",\n              \"logo\": \"https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png\",\n              \"slogan\": \"Sharing the World, Flying Together\",\n              \"head_quaters\": \"376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan\",\n              \"website\": \"www.evaair.com\",\n              \"established\": \"1989\"\n          }\n      ],\n      \"__v\": 0\n  },");
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    test('test of invalid inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var page, size, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = 19;
                    size = 2;
                    return [4 /*yield*/, request(app.callback()).get("/v1/passengers?page=" + page + "&size=" + size)];
                case 1:
                    res = _a.sent();
                    expect(res.text).toBe('data not fetched');
                    expect(res.status).toBe(500);
                    return [2 /*return*/];
            }
        });
    }); });
});
