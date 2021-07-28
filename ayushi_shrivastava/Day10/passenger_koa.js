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
var Koa = require('koa');
var KoaRouter = require('koa-router');
var json = require('koa-json');
var bodyParser = require('koa-bodyparser');
var fs = require('fs');
var passengers = require('./passengers.json');
var uniq = require('uniqid');
var port = 8000;
var app = new Koa();
var router = new KoaRouter();
app.use(json());
app.use(bodyParser());
var passengerBody = /** @class */ (function () {
    function passengerBody(name, trips, airline, __v) {
        this._id = uniq();
        this.name = name;
        this.trips = trips;
        this.airline = airline;
        this.__v = __v;
    }
    return passengerBody;
}());
router.get('/v1/passengers', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var page, limit, startIndex, endIndex, results, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = parseInt(ctx.request.query.page);
                limit = parseInt(ctx.request.query.size);
                startIndex = (page - 1) * limit;
                endIndex = page * limit;
                results = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, passengers.slice(startIndex, endIndex)];
            case 2:
                results = _a.sent();
                ctx.response.type = 'application/json';
                ctx.response.status = 200;
                ctx.response.body = JSON.stringify(results);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                ctx.response.type = 'text/html';
                ctx.response.status = 500;
                ctx.response.body = 'data not fetched';
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/v1/passengers', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var body, passengerRequest;
    return __generator(this, function (_a) {
        try {
            body = ctx.request.body;
            if (typeof body.name !== 'string' || typeof body.trips !== 'number' || body.name.trim() === "") {
                ctx.response.status = 400;
                ctx.response.type = 'text/html';
                ctx.body = "The Request is not valid";
                return [2 /*return*/];
            }
            passengerRequest = new passengerBody(body.name, body.trips, body.airline, body.__v);
            passengers = passengers.concat(passengerRequest);
            fs.writeFileSync('passengers.json', JSON.stringify(passengers));
            ctx.response.status = 200;
            ctx.response.type = 'text/html';
            ctx.body = "passenger named " + passengerRequest.name + " inserted in the database.";
        }
        catch (err) {
            ctx.response.status = 400;
            ctx.response.type = 'text/html';
            ctx.body = "could not write to the file";
            return [2 /*return*/];
        }
        return [2 /*return*/];
    });
}); });
router.put('/v1/passengers', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var flag, body, i, j;
    return __generator(this, function (_a) {
        flag = 0;
        try {
            body = ctx.request.body;
            if (typeof body.id !== 'string' || typeof body.name !== 'string' || typeof body.trips !== 'number' || body.name.trim() === "" || body.id.trim() === "") {
                ctx.response.status = 400;
                ctx.response.type = 'text/html';
                ctx.body = "The Request is not valid";
                return [2 /*return*/];
            }
            i = void 0;
            j = void 0;
            //console.log(passengers["data"][0]._id);
            for (i = 0; i < 18; i++) {
                for (j = 0; j < 500; j++) {
                    // console.log(passengers[i]["data"][j]._id);
                    //console.log(passengers["data"][i]._id);
                    if (passengers[i]["data"][j]._id === body.id) {
                        //console.log(passengers["data"][i]._id);
                        console.log(body.id);
                        flag = 1;
                        break;
                    }
                }
                if (flag == 1) {
                    break;
                }
            }
            console.log(i);
            if (i === passengers.length) {
                ctx.response.status = 404;
                ctx.response.type = 'text/html';
                ctx.body = "The record not found";
                return [2 /*return*/];
            }
            else {
                console.log(i);
                console.log(j);
                passengers[i]["data"][j].name = body.name;
                passengers[i]["data"][j].trips = body.trips;
                passengers[i]["data"][j].airline = body.airline;
                passengers[i]["data"][j].__v = body.__v;
                console.log("hii");
                console.log(passengers[i]["data"][j].name);
                console.log(passengers[i]["data"][j].trips);
                console.log(passengers[i]["data"][j].airline);
                console.log(passengers[i]["data"][j].__v);
            }
            if (flag == 1) {
                fs.writeFile("passenger.json", JSON.stringify(passengers), function (err) {
                    // Checking for errors
                    if (err)
                        throw err;
                    console.log("Done writing"); // Success
                });
                ctx.response.status = 200;
                ctx.response.type = 'text/html';
                ctx.body = "passenger having " + body.id + "updated in the database.";
            }
        }
        catch (err) {
            ctx.response.status = 400;
            ctx.response.type = 'text/html';
            ctx.body = "could not update to the file";
            return [2 /*return*/];
        }
        return [2 /*return*/];
    });
}); });
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log("The server is running at port " + port);
});
module.exports = app;
