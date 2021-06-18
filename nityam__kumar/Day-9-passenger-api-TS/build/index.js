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
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const json2csv_1 = require("json2csv");
class Person {
    constructor(_id, name, trips, __v) {
        this.id = _id;
        this.name = name;
        this.trips = trips;
        this.v = __v;
    }
}
function isAccessible(path) {
    return fs_1.promises
        .access(path)
        .then(() => true)
        .catch(() => false);
}
const getPassengerDetail = async () => {
    try {
        const r = await axios_1.default.get(`https://api.instantwebtools.net/v1/passenger?page=0&size=500`);
        const page = r.data.totalPages;
        for (let i = 0; i < page; i += 1) {
            const response = await axios_1.default.get(`https://api.instantwebtools.net/v1/passenger?page=${i}&size=500`);
            const jsonObj = response.data;
            let dats = fs.readFileSync(path_1.default.join(__dirname, "../passenger.json"), "utf8");
            let obj = JSON.parse(dats);
            console.log(obj);
            let Api_data = jsonObj.data;
            obj.passengers_data.push(...Api_data);
            await fs_1.promises.writeFile(path_1.default.join(__dirname, "../passenger.json"), JSON.stringify(obj, null, 4));
            let passengers = [];
            let flights = [];
            for (let j = 0; j < Api_data.length; j++) {
                const obj = Api_data[j];
                const p = new Person(obj._id, obj.name, obj.trips, obj.__v);
                passengers.push(p);
                let f = obj.airline;
                if (f instanceof Array) {
                    f = f[0];
                }
                f["passenger_id"] = obj._id;
                flights.push(f);
            }
            let csv_passenger;
            let csv_flight;
            if (await isAccessible(path_1.default.join(__dirname, "../passenger.csv"))) {
                csv_passenger = await json2csv_1.parseAsync(passengers, { header: false });
                csv_flight = await json2csv_1.parseAsync(flights, { header: false });
            }
            else {
                csv_passenger = await json2csv_1.parseAsync(passengers, { header: true });
                csv_flight = await json2csv_1.parseAsync(flights, { header: true });
            }
            await fs_1.promises.appendFile("passenger.csv", csv_passenger);
            await fs_1.promises.appendFile("passenger.csv", "\r\n");
            await fs_1.promises.appendFile("flight.csv", csv_flight);
            await fs_1.promises.appendFile("flight.csv", "\r\n");
        }
    }
    catch (err) {
        console.log(err);
    }
};
getPassengerDetail();
