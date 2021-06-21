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
Object.defineProperty(exports, "__esModule", { value: true });
var koa = require("koa");
var koarouter = require("@koa/router");
var bodyParser = require("koa-bodyparser");
var fs = require("fs");
var uuid = require("uuid");
var app = new koa();
var router = new koarouter();
var Airline = /** @class */ (function () {
    function Airline(id, name, country, logo, slogan, head_quater, website, established) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.logo = logo;
        this.slogan = slogan;
        this.head_quaters = head_quater;
        this.website = website;
        this.established = established;
    }
    return Airline;
}());
var Passenger = /** @class */ (function () {
    function Passenger(id, name, trips, v, airlines) {
        this._id = id;
        this.name = name;
        this.trips = trips;
        this.__v = v;
        this.airline = airlines;
    }
    Object.defineProperty(Passenger.prototype, "gid", {
        /**
         * Getter id
         * @return {string}
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Passenger.prototype, "gname", {
        /**
         * Getter name
         * @return {string}
         */
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Passenger.prototype, "gtrips", {
        /**
         * Getter trips
         * @return {number}
         */
        get: function () {
            return this.trips;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Passenger.prototype, "v", {
        /**
         * Getter v
         * @return {number}
         */
        get: function () {
            return this.__v;
        },
        /**
         * Setter v
         * @param {number} value
         */
        set: function (value) {
            this.__v = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Passenger.prototype, "gairlines", {
        /**
         * Getter Airlines
         * @return {Array<Airline>}
         */
        get: function () {
            return this.airline;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Passenger.prototype, "sid", {
        /**
         * Setter id
         * @param {string} value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Passenger.prototype, "sname", {
        /**
         * Setter name
         * @param {string} value
         */
        set: function (value) {
            this.name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Passenger.prototype, "strips", {
        /**
         * Setter trips
         * @param {number} value
         */
        set: function (value) {
            this.trips = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Passenger.prototype, "sairlines", {
        /**
         * Setter airlines
         * @param {Array<Airline>} value
         */
        set: function (value) {
            this.airline = value;
        },
        enumerable: false,
        configurable: true
    });
    return Passenger;
}());
var passengerInfoList;
passengerInfoList = [];
var fetchPassengerInfoFromFile = function (filePath) {
    var prmiseRead = function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject("File Not Read");
            }
            else {
                resolve(data);
            }
        });
    };
    return new Promise(prmiseRead);
};
var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetchPassengerInfoFromFile("./passengerInfo.json").then(function (data) {
                        //console.log("Get Data Inside");
                        //passengerInfoList = JSON.parse(data);
                        var dataList = JSON.parse(data);
                        var noOfData = dataList.length;
                        var count = 0;
                        for (var i = 0; i < noOfData; i++) {
                            var airlines = new Array();
                            var numberofAirlines = dataList[i].airline.length;
                            for (var j = 0; j < numberofAirlines; j++) {
                                //console.log(dataList[i].airline[j].name);
                                var airline = new Airline(dataList[i].airline[j].id, dataList[i].airline[j].name, dataList[i].airline[j].country, dataList[i].airline[j].logo, dataList[i].airline[j].slogan, dataList[i].airline[j].head_quaters, dataList[i].airline[j].website, dataList[i].airline[j].established);
                                airlines.push(airline);
                            }
                            if (airlines.length === 0) {
                                count++;
                            }
                            var passenger = new Passenger(dataList[i]._id, dataList[i].name, dataList[i].trips, dataList[i].__v, airlines);
                            passengerInfoList.push(passenger);
                        }
                        //console.log(passengerInfoList.length, count);
                        //console.log(passengerInfoList[0].airlines);
                    })];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
getData();
var validateQueryURL = function (query) {
    try {
        //.log(typeof query);
        var page = Number(query.page);
        var size = Number(query.size);
        //console.log(typeof page);
        var query = { page: 0, size: 500 };
        if (page !== undefined && size !== undefined && !isNaN(page) && !isNaN(size) && page >= 0 && size > 0) {
            query.page = page;
            query.size = size;
            return query;
        }
        else {
            return query;
        }
    }
    catch (_a) {
        return query;
    }
};
var findRangeofRequestedData = function (page, size) {
    var numberOfentry = passengerInfoList.length;
    var maxNumberOfPages = Math.ceil(numberOfentry / size);
    var minIndex = 0;
    if (page < maxNumberOfPages) {
        minIndex = page * size;
        var maxIndex = numberOfentry < size ? numberOfentry : size * (page + 1);
        return [minIndex, maxIndex];
    }
    else {
        return false;
    }
};
var updatePassengerInfoFile = function () {
    var contenTowrite = JSON.stringify(passengerInfoList, null, 4);
    fs.writeFile("./passengerInfo.json", contenTowrite, function (err) {
        if (err) {
            //console.log(err);
            return;
        }
        else {
            //console.log("File is saved successfully");
        }
    });
};
var fetchpassenerInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, inputData, range, minIndex, maxIndex;
    return __generator(this, function (_a) {
        query = {
            page: Number(ctx.query.page),
            size: Number(ctx.query.size)
        };
        inputData = validateQueryURL(query);
        range = findRangeofRequestedData(inputData.page, inputData.size);
        if (range === false) {
            ctx.status = 406;
            ctx.body = "Page Number overflow";
        }
        else {
            minIndex = range[0];
            maxIndex = range[1];
            ctx.status = 200;
            ctx.body = passengerInfoList.slice(minIndex, maxIndex);
            //updatePassengerInfoFile();
        }
        return [2 /*return*/];
    });
}); };
var createAPassenger = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, name, trips, id, airlineId, airlineName, airlineCountry, airlineLogo, airlineSlogan, airlineHeadQuater, airlineWebsite, airlineestablished, airlines, airline, newPassenger, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                requestBody = ctx.request.body;
                name = requestBody.name;
                trips = requestBody.trips;
                id = uuid.v4();
                airlineId = Number(requestBody.airline[0].id);
                airlineName = requestBody.airline[0].name;
                airlineCountry = requestBody.airline[0].country;
                airlineLogo = requestBody.airline[0].logo;
                airlineSlogan = requestBody.airline[0].slogan;
                airlineHeadQuater = requestBody.airline[0].head_quaters;
                airlineWebsite = requestBody.airline[0].website;
                airlineestablished = requestBody.airline[0].established;
                airlines = new Array();
                airline = new Airline(airlineId, airlineName, airlineCountry, airlineLogo, airlineSlogan, airlineHeadQuater, airlineWebsite, airlineestablished);
                airlines.push(airline);
                newPassenger = new Passenger(id, name, trips, 0, airlines);
                passengerInfoList.push(newPassenger);
                return [4 /*yield*/, updatePassengerInfoFile()];
            case 1:
                _a.sent();
                ctx.status = 200;
                ctx.body = " New Passenger Info Created Successfully with id :" + id;
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                //console.log(e);
                ctx.status = 400;
                ctx.body = "Invalid Input";
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updatePassengerInfo = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var requestBody, id, positionOfPassenger, index, flag, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                requestBody = ctx.request.body;
                id = ctx.params.id;
                positionOfPassenger = -1;
                for (index = 0; index < passengerInfoList.length; index++) {
                    if (passengerInfoList[index].gid === id) {
                        positionOfPassenger = index;
                        break;
                    }
                }
                if (!(positionOfPassenger === -1)) return [3 /*break*/, 1];
                ctx.status = 204;
                ctx.body = "Passenger Info Not Found";
                return [3 /*break*/, 7];
            case 1:
                flag = false;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 7]);
                if (requestBody.name !== undefined) {
                    passengerInfoList[positionOfPassenger].sname = requestBody.name;
                    flag = true;
                }
                if (requestBody.trips !== undefined) {
                    passengerInfoList[positionOfPassenger].strips = requestBody.trips;
                    flag = true;
                }
                if (!flag) return [3 /*break*/, 4];
                return [4 /*yield*/, updatePassengerInfoFile()];
            case 3:
                _b.sent();
                ctx.status = 200;
                ctx.body = "Update Successfully";
                return [3 /*break*/, 5];
            case 4:
                ctx.status = 200;
                ctx.body = "Nothing Updated";
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                _a = _b.sent();
                ctx.status = 400;
                ctx.body = "Invalid Input";
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
router.get("/v1/passengers", fetchpassenerInfo);
router.post("/v1/passengers", createAPassenger);
router.put("/v1/passengers/:id", updatePassengerInfo);
app.use(bodyParser());
app.use(router.routes());
app.use(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.status = 404;
        ctx.body = 'Page Not Found';
        return [2 /*return*/];
    });
}); });
module.exports = { app: app };
