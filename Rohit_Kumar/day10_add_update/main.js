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
var fs = require("fs");
var uuid = require("uniqid");
var passenger_data = require("./data.json");
var passengerClass = /** @class */ (function () {
    function passengerClass(name, trips, airline) {
        this._id = uuid();
        this.name = name;
        this.trips = trips;
        this.airline = airline;
        this.__v = 0;
    }
    return passengerClass;
}());
function getId(id) {
    var i = 0;
    for (i = 0; i < passenger_data.length; i++) {
        if (passenger_data[i]._id === id)
            break;
    }
    if (i == passenger_data.length)
        return -1;
    else
        return i;
}
exports.createPassenger = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var page, size, totalpages, startindex, endindex, req_data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                page = parseInt(ctx.request.query.page);
                size = parseInt(ctx.request.query.size);
                totalpages = Math.ceil(passenger_data.length / size);
                if (page === undefined ||
                    size === undefined ||
                    typeof page !== "number" ||
                    typeof size !== "number") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (page < 0 || size < 0 || page > totalpages) {
                    ctx.response.status = 404;
                    ctx.response.type = "text/html";
                    ctx.body = "Not Found";
                    return [2 /*return*/];
                }
                startindex = page * size;
                endindex = Math.min((page + 1) * size, passenger_data.length);
                return [4 /*yield*/, passenger_data.slice(startindex, endindex)];
            case 1:
                req_data = _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "application/json";
                ctx.body = req_data;
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addPassenger = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var pass_data, new_passenger, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                pass_data = ctx.request.body;
                if (pass_data.name === undefined ||
                    pass_data.trips === undefined ||
                    pass_data.airline === undefined ||
                    typeof pass_data.name !== "string" ||
                    typeof pass_data.trips !== "number" ||
                    pass_data.name.trim() === "") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                new_passenger = new passengerClass(pass_data.name, pass_data.trips, pass_data.airline);
                passenger_data = passenger_data.concat(new_passenger);
                return [4 /*yield*/, fs.writeFileSync("data.json", JSON.stringify(passenger_data, null, 4))];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "text/html";
                ctx.body = "passenger created successfully";
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updatePassenger = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, i, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = ctx.params.id;
                if (id === undefined || typeof id !== "string") {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                data = ctx.request.body;
                i = getId(id);
                if (i === -1) {
                    ctx.response.status = 404;
                    ctx.response.type = "text/html";
                    ctx.body = {
                        messege: "Not Found",
                        status: "fail"
                    };
                    return [2 /*return*/];
                }
                if (data.name === undefined &&
                    data.trips === undefined &&
                    data.airline === undefined) {
                    ctx.response.status = 400;
                    ctx.response.type = "text/html";
                    ctx.body = "Bad Request";
                    return [2 /*return*/];
                }
                if (data.name !== undefined &&
                    typeof data.name === "string" &&
                    data.name.trim() !== "") {
                    passenger_data[i].name = data.name;
                }
                if (data.trips !== undefined &&
                    typeof data.trips === "number" &&
                    data.trips >= 0) {
                    passenger_data[i].trips = data.trips;
                }
                if (data.airline !== undefined) {
                    passenger_data[i].airline = data.airline;
                }
                return [4 /*yield*/, fs.writeFileSync("data.json", JSON.stringify(passenger_data, null, 4))];
            case 1:
                _a.sent();
                ctx.response.status = 200;
                ctx.response.type = "text/html";
                ctx.body = "passenger data updated successfully";
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                ctx.response.status = 500;
                ctx.response.type = "text/html";
                ctx.body = "internal server error";
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
