"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassenger = exports.getPassengers = exports.createPassenger = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
class PassengerI {
    constructor(name, trips, airline) {
        this._id = uniqid_1.default();
        this.name = name;
        this.trips = trips;
        this.airline = airline;
        this.__v = 0;
    }
}
const createPassenger = async (ctx) => {
    try {
        const inputPassenger = ctx.request.body;
        // console.log(typeof name);
        if (inputPassenger.name === undefined ||
            inputPassenger.trips === undefined ||
            inputPassenger.airline === undefined ||
            Number.isNaN(inputPassenger.trips) ||
            typeof inputPassenger.name !== "string" ||
            typeof inputPassenger.trips !== "number") {
            ctx.status = 400;
            ctx.message = "Bad Request";
            ctx.type = "text/html";
            ctx.body = {
                msg: "Bad Request",
                status: "fail",
            };
            return;
        }
        const dats = fs.readFileSync(path_1.default.join(__dirname, "../passenger.json"), "utf8");
        const arrayOfObjects = JSON.parse(dats);
        const pass = new PassengerI(inputPassenger.name, inputPassenger.trips, inputPassenger.airline);
        arrayOfObjects.passengers_data.push(pass);
        await fs_1.promises.writeFile(path_1.default.join(__dirname, "../passenger.json"), JSON.stringify(arrayOfObjects, null, 4));
        ctx.status = 200;
        ctx.message = "Passenger creation successfully";
        ctx.type = "text/html";
        ctx.body = {
            msg: `passenger with id ${pass._id} created successfully `,
            status: "success",
        };
    }
    catch (err) {
        // console.log(err);
        ctx.status = 500;
        ctx.message = "Passenger creation failed";
        ctx.type = "text/html";
        ctx.body = {
            msg: "internal server error",
            status: "fail",
        };
    }
};
exports.createPassenger = createPassenger;
const getPassengers = async (ctx) => {
    try {
        console.log(typeof (ctx.query.page));
        if (ctx.query.page === undefined ||
            ctx.query.size === undefined ||
            isNaN(ctx.query.page) ||
            isNaN(ctx.query.size)) {
            ctx.status = 400;
            ctx.message = "Bad Request";
            ctx.type = "text/html";
            ctx.body = {
                msg: "Bad Request",
                status: "fail",
            };
            return;
        }
        const page = Number(ctx.query.page);
        const size = Number(ctx.query.size);
        const dats = fs.readFileSync(path_1.default.join(__dirname, "../passenger.json"), "utf8");
        const arrayOfObjects = JSON.parse(dats);
        const totalNoDetails = arrayOfObjects.passengers_data.length;
        const maxPageLimit = Math.ceil(totalNoDetails / size);
        // console.log(total_no_details, max_page_limit);
        const maxSizeLimit = 500;
        if (page <= 0 || page > maxPageLimit || size < 0 || size > maxSizeLimit) {
            ctx.status = 404;
            ctx.message = "NOT FOUND!!";
            ctx.type = "text/html";
            ctx.body = {
                msg: "NOT FOUND!!",
                status: "fail",
            };
            return;
        }
        const startIndex = (page - 1) * size;
        const endIndex = Math.min(page * size, totalNoDetails);
        const datas = arrayOfObjects.passengers_data;
        const filterDatas = datas.slice(startIndex, endIndex);
        ctx.status = 200;
        ctx.message = "passengers details";
        ctx.type = "text/html";
        ctx.body = {
            msg: "requested passengers details",
            status: "success",
            data: filterDatas,
        };
    }
    catch (err) {
        // console.log(err);
        ctx.status = 500;
        ctx.message = "failed";
        ctx.type = "text/html";
        ctx.body = {
            msg: "internal server error",
            status: "fail",
        };
    }
};
exports.getPassengers = getPassengers;
const updatePassenger = async (ctx) => {
    try {
        if (ctx.params.passengerId === undefined &&
            typeof ctx.params.passengerId !== "string") {
            ctx.status = 400;
            ctx.message = "Bad Request";
            ctx.type = "text/html";
            ctx.body = {
                msg: "Bad Request",
                status: "fail",
            };
            return;
        }
        const idd = ctx.params.passengerId;
        const dats = fs.readFileSync(path_1.default.join(__dirname, "../passenger.json"), "utf8");
        const arrayOfObjects = JSON.parse(dats);
        const passengerArray = arrayOfObjects.passengers_data;
        const i = passengerArray.findIndex((ele) => ele._id === idd);
        if (i === -1) {
            ctx.status = 404;
            ctx.message = "Data not found";
            ctx.type = "text/html";
            ctx.body = {
                msg: `Data not found`,
                status: "failure",
            };
            return;
        }
        const inputPassenger = ctx.request.body;
        if (inputPassenger.name !== undefined &&
            typeof inputPassenger.name === "string" &&
            inputPassenger.name.length) {
            passengerArray[i].name = inputPassenger.name;
        }
        if (inputPassenger.trips !== undefined &&
            !Number.isNaN(inputPassenger.trips) &&
            typeof inputPassenger.trips === "number" &&
            inputPassenger.trips >= 0) {
            passengerArray[i].trips = inputPassenger.trips;
        }
        if (inputPassenger.airline !== undefined) {
            passengerArray[i].airline = inputPassenger.airline;
        }
        arrayOfObjects.passengers_data = passengerArray;
        await fs_1.promises.writeFile(path_1.default.join(__dirname, "../passenger.json"), JSON.stringify(arrayOfObjects, null, 4));
        ctx.status = 200;
        ctx.message = "Passenger Updated successfully";
        ctx.type = "text/html";
        ctx.body = {
            msg: `passenger with id ${idd} updated successfully `,
            status: "success",
        };
    }
    catch (err) {
        // console.log(err);
        ctx.status = 500;
        ctx.message = "failed";
        ctx.type = "text/html";
        ctx.body = {
            msg: "internal server error",
            status: "fail",
        };
    }
};
exports.updatePassenger = updatePassenger;
