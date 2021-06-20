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
const fs = require('fs');
const uuid = require('uniqid');
class Passenger {
    constructor(name, trips, airline, __v) {
        this._id = uuid('A');
        this.name = name;
        this.trips = trips;
        this.airline = airline;
        this.__v = __v;
    }
}
exports.getPassengers = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var passengerData = require('../passenger.json');
    let page = ctx.request.query.page;
    let size = ctx.request.query.size;
    if (isNaN(page) || isNaN(size)) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid query"
        };
        return;
    }
    let passengerdataszie = passengerData.length;
    let totalpages = Math.ceil(passengerdataszie / 500);
    if (page < 0 || page >= totalpages) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "page number not found"
        };
        return;
    }
    if (size <= 0 || size > 500) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid size"
        };
        return;
    }
    try {
        let response_body = yield getPassengersList(page, size);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = response_body;
    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };
    }
});
exports.createPassengers = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let object = ctx.request.body;
    let newPassenger = new Passenger(object.name, object.trips, object.airline, object.__v);
    try {
        yield saveNewPassenger(newPassenger);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "passenger data saved"
        };
    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };
    }
});
exports.updatePassengers = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let id = ctx.request.params.passengerId;
    let updatedPassengerData = ctx.request.body;
    try {
        yield updatePassenger(id, updatedPassengerData);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "passenger data updated"
        };
    }
    catch (e) {
        console.log(e.stack);
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "something wrong happens"
        };
    }
});
function getPassengersList(page, size) {
    return new Promise((resolve, reject) => {
        try {
            const StreamArray = require('stream-json/streamers/StreamArray');
            const pipeline = fs.createReadStream('passenger.json').pipe(StreamArray.withParser());
            let response_body = [];
            pipeline.on('data', (arr) => {
                if (arr.key >= page * 500 && arr.key < page * 500 + size)
                    response_body.push(arr.value);
                if (arr.key >= page * 500 + size)
                    return;
            });
            pipeline.on('end', () => {
                resolve(response_body);
            });
        }
        catch (e) {
            reject(e);
        }
    });
}
function saveNewPassenger(newpassenger) {
    return new Promise((resolve, reject) => {
        let passengerList = require('../passenger.json');
        passengerList.push(newpassenger);
        fs.writeFile('passenger.json', JSON.stringify(passengerList), (err) => {
            if (err)
                reject(err);
            else
                resolve("File saved");
        });
    });
}
function updatePassenger(id, updatedPassengerData) {
    return new Promise((resolve, reject) => {
        let passengerList = require('../passenger.json');
        let passenger = passengerList.find((element) => element._id == id);
        if (updatedPassengerData.name)
            passenger.name = updatedPassengerData.name;
        if (updatedPassengerData.trips)
            passenger.trips = updatedPassengerData.trips;
        if (updatedPassengerData.airline)
            passenger.airline = updatedPassengerData.airline;
        fs.writeFile('passenger.json', JSON.stringify(passengerList), (err) => {
            if (err)
                reject(err);
            else
                resolve("File updated");
        });
    });
}
