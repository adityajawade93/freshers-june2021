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
var Koa = require("koa");
var koaRouter = require("koa-router");
var uniqid = require("uniqid");
var fs = require("fs");
var passengers = require('./passengers.json');
var bodyParser = require("koa-bodyparser");
var app = new Koa();
var router = new koaRouter();
var port = 3001;
function goodResponse(ctx, type, message) {
    ctx.response.status = 200;
    ctx.response.type = type;
    ctx.body = message;
}
function badResponse(ctx, type, message) {
    ctx.response.status = 400;
    ctx.response.type = type;
    ctx.body = message;
}
function checkIndividual(data) {
    if (data.id === undefined || data.name === undefined || data.country === undefined || data.logo === undefined
        || data.slogan === undefined || data.head_quaters === undefined || data.website === undefined
        || data.established === undefined) {
        return false;
    }
    if (typeof data.id !== 'number' || typeof data.name !== 'string' || data.name.trim() === "" || typeof data.country !== 'string'
        || typeof data.logo !== 'string' || typeof data.slogan !== 'string' || typeof data.head_quaters !== 'string'
        || typeof data.website !== 'string' || typeof data.established !== 'string') {
        return false;
    }
    return true;
}
function checkData(data) {
    if (!Array.isArray(data)) {
        return checkIndividual(data);
    }
    var len = data.length;
    for (var i = 0; i < len; i++) {
        if (!checkIndividual(data[i]))
            return false;
    }
    return true;
}
function validateData1(data) {
    if (data.name === undefined || data.trips === undefined || data.airline === undefined || data.__v === undefined)
        return false;
    if (typeof data.name !== 'string' || data.name.trim() === "" || typeof data.trips !== 'number' || typeof data.__v !== 'number' || !checkData(data.airline))
        return false;
    return true;
}
function validateData2(page, size) {
    if (typeof page === "number" && typeof size === "number" && page >= 0) {
        return true;
    }
    return false;
}
router.get("/v1/passengers", function (ctx) {
    // list all airline data
    console.log("Got request =>", {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body
    });
    var page = Number(ctx.request.query.page);
    var size = Number(ctx.request.query.size);
    //console.log(passengers.length);
    var totalPages = Math.round(passengers.length / size) + 1;
    // console.log(totalPages);
    // console.log(page);
    if (page > totalPages) {
        badResponse(ctx, "text/html", "unable to fetch, page out of range");
        return;
    }
    if (validateData2(page, size)) {
        var requiredData = passengers.slice(page * size, Math.min((page + 1) * size, passengers.length));
        var data = {
            totalPassengers: passengers.length,
            totalPages: totalPages,
            data: requiredData
        };
        goodResponse(ctx, "application/json", data);
    }
    else {
        badResponse(ctx, "text/html", "unable to fetch provide correct page and size");
    }
});
router.post("/v1/passengers", function (ctx) {
    //create and add new passenger to json
    console.log("Got request =>", {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body
    });
    var reqBody = ctx.request.body;
    if (validateData1(reqBody)) {
        var newData = reqBody;
        newData._id = uniqid();
        passengers.push(newData);
        fs.writeFile("passengers.json", JSON.stringify(passengers), "utf8", function (err) {
            if (err) {
                throw err;
            }
        });
        goodResponse(ctx, "application/json", { message: "Passenger with id : " + newData._id + " created successfully.", content: newData });
    }
    else {
        badResponse(ctx, "text/html", "Creation failed, Provide correct data");
    }
});
router.put("/v1/passengers/:id", function (ctx) {
    // update passenger by id
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body
    });
    var id = ctx.params.id;
    var reqBody = ctx.request.body;
    if (validateData1(reqBody)) {
        reqBody._id = id;
        var len = passengers.length;
        var update = false;
        for (var i = 0; i < len; i++) {
            if (passengers[i]._id === id) {
                passengers[i] = reqBody;
                update = true;
                break;
            }
        }
        if (update === false) {
            badResponse(ctx, "application/json", "Passenger id not found in data base");
            return;
        }
        else {
            fs.writeFile('passengers.json', JSON.stringify(passengers), 'utf8', function (err) {
                if (err) {
                    throw err;
                }
            });
            goodResponse(ctx, "application/json", { message: "Passenger with id : " + reqBody._id + " updated successfully." });
        }
    }
    else {
        badResponse(ctx, "text/html", "Update failed, Provide correct data");
    }
});
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = "Invalid URL";
        return [2 /*return*/];
    });
}); });
var server = app.listen(port, function () { return console.log("port on ", port); });
module.exports = server;
