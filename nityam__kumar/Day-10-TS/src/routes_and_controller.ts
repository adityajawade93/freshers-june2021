import uuid from "uniqid";

import { Context } from "vm";
// eslint-disable-next-line node/no-unsupported-features/node-builtins
import { promises as fss } from "fs";

import path from "path";

import * as fs from "fs";

interface Airline {
  id?: number | string;
  name?: string;
  country?: string;
  logo?: string;
  slogan?: string;
  head_quater?: string;
  website?: string;
  established?: string | number;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline | Airline[];
  __v: number;
}

interface Data {
  passengers_data: Passenger[];
}

class PassengerI {
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

export const createPassenger = async (ctx: Context) => {
  try {
    const inputPassenger: Passenger = ctx.request.body;
    // console.log(typeof name);
    if (
      inputPassenger.name === undefined ||
      inputPassenger.trips === undefined ||
      inputPassenger.airline === undefined ||
      Number.isNaN(inputPassenger.trips) ||
      typeof inputPassenger.name !== "string" ||
      typeof inputPassenger.trips !== "number"
    ) {
      ctx.status = 400;
      ctx.message = "Bad Request";
      ctx.type = "text/html";
      ctx.body = {
        msg: "Bad Request",
        status: "fail",
      };
      return;
    }

    const dats = fs.readFileSync(
      path.join(__dirname, "../passenger.json"),
      "utf8"
    );
    const arrayOfObjects: Data = JSON.parse(dats);
    const pass = new PassengerI(
      inputPassenger.name,
      inputPassenger.trips,
      inputPassenger.airline
    );
    arrayOfObjects.passengers_data.push(pass);

    await fss.writeFile(
      path.join(__dirname, "../passenger.json"),
      JSON.stringify(arrayOfObjects, null, 4)
    );
    ctx.status = 200;
    ctx.message = "Passenger creation successfully";
    ctx.type = "text/html";
    ctx.body = {
      msg: `passenger with id ${pass._id} created successfully `,
      status: "success",
    };
  } catch (err) {
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

export const getPassengers = async (ctx: Context) => {
  try {
    console.log(typeof(ctx.query.page));
    if (
      ctx.query.page === undefined ||
      ctx.query.size === undefined ||
      isNaN(ctx.query.page) ||
      isNaN(ctx.query.size)
    ) {
      ctx.status = 400;
      ctx.message = "Bad Request";
      ctx.type = "text/html";
      ctx.body = {
        msg: "Bad Request",
        status: "fail",
      };
      return;
    }

    const page: number = Number(ctx.query.page);
    const size: number = Number(ctx.query.size);

    const dats = fs.readFileSync(
      path.join(__dirname, "../passenger.json"),
      "utf8"
    );
    const arrayOfObjects: Data = JSON.parse(dats);
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
  } catch (err) {
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

export const updatePassenger = async (ctx: Context) => {
  try {
    if (
      ctx.params.passengerId === undefined &&
      typeof ctx.params.passengerId !== "string"
    ) {
      ctx.status = 400;
      ctx.message = "Bad Request";
      ctx.type = "text/html";
      ctx.body = {
        msg: "Bad Request",
        status: "fail",
      };
      return;
    }

    const idd: string = ctx.params.passengerId;

    const dats = fs.readFileSync(
      path.join(__dirname, "../passenger.json"),
      "utf8"
    );
    const arrayOfObjects: Data = JSON.parse(dats);
    const passengerArray: Passenger[] = arrayOfObjects.passengers_data;

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

    const inputPassenger: Passenger = ctx.request.body;

    if (
      inputPassenger.name !== undefined &&
      typeof inputPassenger.name === "string" &&
      inputPassenger.name.length
    ) {
      passengerArray[i].name = inputPassenger.name;
    }

    if (
      inputPassenger.trips !== undefined &&
      !Number.isNaN(inputPassenger.trips) &&
      typeof inputPassenger.trips === "number" &&
      inputPassenger.trips >= 0
    ) {
      passengerArray[i].trips = inputPassenger.trips;
    }

    if (inputPassenger.airline !== undefined) {
      passengerArray[i].airline = inputPassenger.airline;
    }
    arrayOfObjects.passengers_data = passengerArray;
    await fss.writeFile(
      path.join(__dirname, "../passenger.json"),
      JSON.stringify(arrayOfObjects, null, 4)
    );
    ctx.status = 200;
    ctx.message = "Passenger Updated successfully";
    ctx.type = "text/html";
    ctx.body = {
      msg: `passenger with id ${idd} updated successfully `,
      status: "success",
    };
  } catch (err) {
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
