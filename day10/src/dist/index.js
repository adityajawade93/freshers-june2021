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
var koa = require('koa');
var app = new koa();
var koarouter = require('@koa/router');
var router = new koarouter();
var bodyparser = require('koa-bodyparser');
var fs = require('fs');
var uuid = require('uniqid');
app.use(bodyparser());
app.use(router.routes());
var Passanger = /** @class */ (function () {
    function Passanger(_id, name, trips, airline, __v) {
        this._id = _id;
        this.name = name;
        this.trips = trips;
        this.airline = airline;
        this.__v = __v;
    }
    return Passanger;
}());
;
var passangerData = require('../passangers.json');
function isValidPassangerData(page, size) {
    var totalData = passangerData.length;
    if (size === 0 || totalData === 0)
        return false;
    var totalPages = Math.ceil(totalData / size);
    return (page >= 0 || page < totalPages);
}
function fetchpassangerData(page, size) {
    if (!isValidPassangerData(page, size))
        return [];
    var totalData = passangerData.length;
    var startindex = page * size;
    var endIndex = Math.min(page * size + size - 1, totalData - 1);
    return passangerData.slice(startindex, endIndex + 1);
}
;
function getPassangerById(id) {
    if (id == null || typeof id !== 'string') {
        return -1;
    }
    for (var i = 0; i < passangerData.length; i++) {
        if (passangerData[i]._id === id) {
            return i;
        }
    }
    return -1;
}
function storeData(data, path) {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
    }
    catch (err) {
        console.log(err);
    }
}
// get route 
function fetchPassanger(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var page, size, passangerlist;
        return __generator(this, function (_a) {
            page = ctx.request.query.page;
            size = ctx.request.query.size;
            if (isNaN(page) || isNaN(size) || page < 0 || size < 0) {
                ctx.response.status = 400;
                ctx.body = {
                    "msg": "query incorrect"
                };
                return [2 /*return*/];
            }
            passangerlist = fetchpassangerData(page, size);
            ctx.response.status = 200;
            ctx.body = {
                total: passangerData.length,
                this_page_length: passangerlist.length,
                data: passangerlist
            };
            return [2 /*return*/];
        });
    });
}
// post route
function addPassanger(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var newPassangerData, id, AddingPassangerData;
        return __generator(this, function (_a) {
            newPassangerData = ctx.request.body;
            // name property mandatory
            if (newPassangerData.name == null || typeof newPassangerData.name !== 'string'
                || typeof newPassangerData.trips !== 'number' || typeof newPassangerData.__v !== 'number'
                || !Array.isArray(newPassangerData.airline)) {
                ctx.response.status = 404;
                ctx.body = {
                    Error: "Invalid Passanger data"
                };
                return [2 /*return*/];
            }
            try {
                id = uuid();
                AddingPassangerData = new Passanger(id, newPassangerData.name.trim(), newPassangerData.trips, newPassangerData.airline, newPassangerData.__v);
                passangerData.push(AddingPassangerData);
                storeData(passangerData, './passangers.json');
                ctx.response.status = 200;
                ctx.body = {
                    status: "data added successfully",
                    newlength: passangerData.length,
                    newdata: AddingPassangerData
                };
            }
            catch (err) {
                ctx.response.status = 404;
                ctx.body = {
                    error: 'something went wrong'
                };
            }
            return [2 /*return*/];
        });
    });
}
// Put Route
function updatePassanger(ctx) {
    var id = getPassangerById(ctx.params.id);
    if (id == -1) {
        ctx.request.status = 400;
        ctx.body = {
            error: 'passanger id not found'
        };
        return;
    }
    try {
        var updatedPassanger = ctx.request.body;
        if (updatedPassanger.name)
            passangerData[id].name = updatedPassanger.name;
        if (updatedPassanger.trips)
            passangerData[id].trips = updatedPassanger.trips;
        if (updatedPassanger.airline)
            passangerData[id].airline = updatedPassanger.airline;
        if (updatedPassanger.__v)
            passangerData[id].__v = updatedPassanger.__v;
        storeData(passangerData, './passangers.json');
        ctx.response.status = 200;
        ctx.body = {
            message: "passanger details updated on " + id + " index",
            data: passangerData
        };
    }
    catch (err) {
        console.log(err);
    }
}
router.get('/v1/passangers', fetchPassanger);
router.post('/v1/passangers', addPassanger);
router.put('/v1/passangers/:id', updatePassanger);
var server = app.listen(3000, function () {
    console.log('server is listening at port 3000');
});
module.exports = {
    server: server,
    passangerData: passangerData,
    fetchpassangerData: fetchpassangerData
};
