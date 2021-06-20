const fs = require('fs');
const uuid = require('uniqid');

interface Airline {
    id: string;
    name: string,
    country: string,
    logo: string,
    slogan: string,
    head_quaters: string;
    website: string,
    established: string;
}

class Passenger {

    _id: string;
    name: string;
    trips: string;
    airline: Airline;
    __v: number;
    constructor(name: string, trips: string, airline: Airline, __v: number) {
        this._id = uuid('A');
        this.name = name;
        this.trips = trips;
        this.airline = airline;
        this.__v = __v;
    }
}



exports.getPassengers = async (ctx: any) => {

    var passengerData = require('../passenger.json');
    let page: number = ctx.request.query.page;
    let size: number = ctx.request.query.size;
    if (isNaN(page) || isNaN(size)) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid query"
        }
        return;
    }

    let passengerdataszie: number = passengerData.length;
    let totalpages: number = Math.ceil(passengerdataszie / 500);

    if (page < 0 || page >= totalpages) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "page number not found"
        }
        return;
    }
    if (size <= 0 || size > 500) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.body = {
            "msg": "Invalid size"
        }
        return;
    }
    try {

        let response_body = await getPassengersList(page, size);
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


};

exports.createPassengers = async (ctx: any) => {

    let object = ctx.request.body;
    let newPassenger = new Passenger(object.name, object.trips, object.airline, object.__v);
    try {

        await saveNewPassenger(newPassenger);
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


}

exports.updatePassengers = async (ctx: any) => {

    let id: string = ctx.request.params.passengerId;
    let updatedPassengerData: any = ctx.request.body;
    try {

        await updatePassenger(id, updatedPassengerData);
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


}

function getPassengersList(page: number, size: number) {

    return new Promise((resolve, reject) => {
        try {
            const StreamArray = require('stream-json/streamers/StreamArray');
            const pipeline = fs.createReadStream('passenger.json').pipe(StreamArray.withParser());
            let response_body: Passenger[] = [];
            pipeline.on('data', (arr: any) => {
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
    })

}

function saveNewPassenger(newpassenger: Passenger) {

    return new Promise((resolve, reject) => {
        
        
        let passengerList = require('../passenger.json');
        passengerList.push(newpassenger);
        fs.writeFile('passenger.json', JSON.stringify(passengerList), (err: any) => {

            if (err)
                reject(err);
            else
                resolve("File saved");
        })
    })
}

function updatePassenger(id: string, updatedPassengerData: any) {

    return new Promise((resolve, reject) => {

        let passengerList = require('../passenger.json');
        let passenger = passengerList.find((element: Passenger) => element._id == id);
        if (updatedPassengerData.name)
            passenger.name = updatedPassengerData.name;
        if (updatedPassengerData.trips)
            passenger.trips = updatedPassengerData.trips;
        if (updatedPassengerData.airline)
            passenger.airline = updatedPassengerData.airline;
        fs.writeFile('passenger.json', JSON.stringify(passengerList), (err: any) => {

            if (err)
                reject(err);
            else
                resolve("File updated");
        })


    })


}