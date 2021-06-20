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
var koarouter = require('@koa/router');
var bodyparser = require('koa-bodyparser');
var fs = require('fs');
var uniqid = require('uniqid');
var app = new koa();
var router = new koarouter();
var passengersdata = JSON.parse(fs.readFileSync("passengers.json", "utf8"));
var passenger = /** @class */ (function () {
    function passenger(name, trips, airline) {
        this._id = uniqid();
        this.name = name;
        this.trips = trips;
        this.airline = airline;
        this.__v = 0;
    }
    return passenger;
}());
var passengerdataarray = [];
passengerdataarray = passengerdataarray.concat(passengersdata);
router.get('/v1/passengers', function (ctx, next) {
    var pageno = parseInt(ctx.query.page);
    var size = parseInt(ctx.query.size);
    console.log(pageno);
    if (pageno >= passengersdata.length || size < 0 || isNaN(pageno) || isNaN(size)) {
        ctx.response.status = 400;
        ctx.body = "please give a proper pageno and size";
        return;
    }
    var startindex = pageno;
    var endindex = Math.min(startindex + size, passengersdata.length);
    console.log(startindex, endindex);
    ctx.body = JSON.stringify(passengersdata.slice(startindex, endindex), null, 2);
});
router.post('/v1/passengers', function (ctx, next) {
    var reqdata = ctx.request.body;
    console.log(reqdata.airline);
    if (reqdata.name != null && reqdata.trips != null && reqdata.airline != null) {
        var passenger1 = new passenger(reqdata.name, reqdata.trips, reqdata.airline);
        console.log(JSON.stringify(passenger1, null, 2));
        passengerdataarray = passengerdataarray.concat(passenger1);
        writefile(passengerdataarray);
        ctx.response.status = 200;
        ctx.body = "passenger successfully created";
    }
    else {
        ctx.response.status = 404;
        ctx.body = "passenger not created";
    }
});
router.put('/v1/passengers/:id', function (ctx, next) {
    var id = ctx.params.id;
    console.log(id);
    if (id === "null" || typeof id != 'string' || id.trim().length == 0) {
        ctx.response.status = 400;
        ctx.body = "please give a proper id";
        return;
    }
    var reqdata = ctx.request.body;
    console.log(reqdata);
    var i;
    for (i = 0; i < passengerdataarray.length; i++) {
        if (passengerdataarray[i]._id == id) {
            console.log(i);
            var data = passengerdataarray[i];
            if (reqdata.name) {
                data.name = reqdata.name;
            }
            if (reqdata.trips) {
                data.trips = reqdata.trips;
            }
            if (reqdata.airline) {
                data.airline = reqdata.airline;
            }
            if (reqdata._v) {
                data.__v = reqdata._v;
            }
            passengerdataarray[i] = data;
            writefile(passengerdataarray);
            ctx.response.status = 200;
            ctx.body = data;
            return;
        }
        else {
            ctx.response.status = 404;
            ctx.body = "id not found";
        }
    }
});
var writefile = function (passengerarray) {
    fs.writeFileSync('passengers.json', JSON.stringify(passengerarray, null, 2), 'utf8');
    return;
};
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = '404,error not found';
        ctx.response.status = 404;
        return [2 /*return*/];
    });
}); });
app.listen(3001);
module.exports = { app: app, passengerdataarray: passengerdataarray, passengersdata: passengersdata };
