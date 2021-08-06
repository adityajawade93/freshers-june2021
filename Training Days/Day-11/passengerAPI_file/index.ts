const koa = require('koa');
const koarouter = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fs = require("fs");
const {v4 : uuidv4} = require('uuid')
const passengers = require('./passengers.json');
var totalPassengers = passengers.length;

import { Context } from "vm";

const app = new koa();
const router = new koarouter();

interface Airline{
        id: number,
        name: string,
        country: string,
        logo: string,
        slogan: string,
        head_quaters: string,
        website: string,
        established: string
}

interface Passanger {
    _id: string,
    name: string,
    trips: number,
    airline: Airline | Array<Airline>,
    __v: number
}

// function getPassenger(uuid){
//     return todo_list.find( ({ id }) => id === uuid );
// }

// function getPassengerList(){
//     return todo_list;
// }

function createPassenger(passenger: Passanger): string{
    const id = uuidv4();
    passenger._id = id;
    let newPassengers: Passanger = passenger;
    passengers.push(newPassengers);
    fs.writeFile("passengers.json", JSON.stringify(passengers), "utf8", (err: any) => {
        if (err) throw err;
    });
    return id;
}

function updatePassenger(id: string, passenger: Passanger){
    var index = passengers.findIndex( (ps: Passanger) => ps._id == id);
    if(index == -1){
        return index;
    }
    passengers[index].name = passenger.name;
    passengers[index].trips = passenger.trips;
    passengers[index].airline = passenger.airline;
    passengers[index].__v = passenger.__v;
    fs.writeFile("passengers.json", JSON.stringify(passengers), "utf8", (err: any) => {
        if (err) throw err;
    });
    return id;
}

// function deletePassengeruuid){
//     todo_list = todo_list.filter(function(obj){ 
//         return obj.id != uuid; 
//     });
// }

function validation(page: number, size: number): {status: number, message: string}{
    if (typeof page !== "number" || typeof size !== "number") {
        return {status: 400,  message: "Invalid parameters"};
    }
    if(page < 0 || size <= 0){
        return {status: 400, message: "Invalid parameters"};
    }
    var total_page = Math.ceil(passengers.length / size);
    if(size > passengers.length && page != total_page-1){
        return {status: 406, message: "Invalid size"};
    }
    if(page >= total_page){
        return {status: 406, message: "Invalid page number"};
    }
    return {status: 200, message: "true"};
}

app.use(bodyParser());

router.get('/v1/passenger', (ctx: Context,next: any) => {
    var page = parseInt(ctx.request.query.page);
    var size = parseInt(ctx.request.query.size);
    var isValid = validation(page,size);
    if(isValid.message === "true"){
        var total_page = Math.ceil(passengers.length / size);
        var data = passengers.slice(page * size, Math.min( (page + 1) * size, passengers.length) );
        totalPassengers = passengers.length;
        ctx.body = {
            totalPassengers : totalPassengers,
            totalPages : total_page,
            data : data,
        };
        ctx.response.status = 200;
        return;
    }
    else{
        ctx.response.status = isValid.status;
        ctx.body = isValid.message;
        return;
    }
});

router.post('/v1/passenger', (ctx: Context) => {
    // const data: any = ctx.request.body;
    // console.log(data);
    let newId = createPassenger(ctx.request.body);
    ctx.body = `passenger created successfully with id ${newId}`;
    ctx.response.status = 201;
    return;
});

router.put('/v1/passenger/:id', (ctx: Context) => {
    var id = ctx.params.id;
    // if(!id){
    //     ctx.type = 'text/plain; charset=utf-8';
    //     ctx.body = "Id is not Given";
    //     ctx.response.status = 400;
    //     return;
    // }
    let Id = updatePassenger(id, ctx.request.body);
    if(Id == -1){
        ctx.type = 'text/plain; charset=utf-8';
        ctx.body = "Given id is not present";
        ctx.response.status = 406;
        return;
    }
    ctx.response.status = 200;
    ctx.body = `passenger updated successfully with id ${Id}`;;
    return;
});

app.use(router.routes());

app.use(async (ctx: any) => {
    ctx.response.status = 404;
    ctx.body = "404 Page not found";
    return;
});

const server = app.listen(3001, () => console.log("port on ", 3001));

module.exports = { app, passengers };