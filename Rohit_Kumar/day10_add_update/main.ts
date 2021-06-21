import { Context } from "vm";

const fs = require("fs");

const uuid = require("uniqid");

var passenger_data = require("./data.json");

interface Airline {
  id?: string;
  name?: string;
  country?: string;
  logo?: string;
  slogan?: string;
  head_quaters?: string;
  website?: string;
  established?: string;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline | Airline[];
  __v: number;
}

class passengerClass {
  _id: string;
  name: string;
  trips: number;
  airline: Airline | Airline[];
  __v: number;
  constructor(name: string, trips: number, airline: Airline | Airline[]) {
    this._id = uuid();
    this.name = name;
    this.trips = trips;
    this.airline = airline;
    this.__v = 0;
  }
}

function getId(id) {
  let i: number = 0;
  for (i = 0; i < passenger_data.length; i++) {
    if (passenger_data[i]._id === id) break;
  }
  if (i == passenger_data.length) return -1;
  else return i;
}

exports.createPassenger = async (ctx: Context) => {
  try {
    const page: number = parseInt(ctx.request.query.page);
    const size: number = parseInt(ctx.request.query.size);
    const totalpages = Math.ceil(passenger_data.length / size);
    if (
      page === undefined ||
      size === undefined ||
      typeof page !== "number" ||
      typeof size !== "number"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (page < 0 || size < 0 || page > totalpages) {
      ctx.response.status = 404;
      ctx.response.type = "text/html";
      ctx.body = "Not Found";

      return;
    }

    const startindex: number = page * size;
    const endindex: number = Math.min((page + 1) * size, passenger_data.length);
    const req_data: Passenger = await passenger_data.slice(
      startindex,
      endindex
    );
    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = req_data;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
  }
};

exports.addPassenger = async (ctx: Context) => {
  try {
    const pass_data: Passenger = ctx.request.body;
    if (
      pass_data.name === undefined ||
      pass_data.trips === undefined ||
      pass_data.airline === undefined ||
      typeof pass_data.name !== "string" ||
      typeof pass_data.trips !== "number" ||
      pass_data.name.trim() === ""
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    const new_passenger: passengerClass = new passengerClass(
      pass_data.name,
      pass_data.trips,
      pass_data.airline
    );
    passenger_data = passenger_data.concat(new_passenger);
    await fs.writeFileSync(
      "data.json",
      JSON.stringify(passenger_data, null, 4)
    );
    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "passenger created successfully";
  } catch (err) {
    console.log(err);
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
};

exports.updatePassenger = async (ctx: Context) => {
  try {
    let id: string = ctx.params.id;
    if (id === undefined || typeof id !== "string") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    let data: Passenger = ctx.request.body;
    let i = getId(id);
    if (i === -1) {
      ctx.response.status = 404;
      ctx.response.type = "text/html";
      ctx.body = {
        messege: "Not Found",
        status: "fail",
      };
      return;
    }

    if (
      data.name === undefined &&
      data.trips === undefined &&
      data.airline === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      data.name !== undefined &&
      typeof data.name === "string" &&
      data.name.trim() !== ""
    ) {
      passenger_data[i].name = data.name;
    }
    if (
      data.trips !== undefined &&
      typeof data.trips === "number" &&
      data.trips >= 0
    ) {
      passenger_data[i].trips = data.trips;
    }
    if (data.airline !== undefined) {
      passenger_data[i].airline = data.airline;
    }

    await fs.writeFileSync(
      "data.json",
      JSON.stringify(passenger_data, null, 4)
    );
    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "passenger data updated successfully";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
  }
};
