const uuid = require("uniqid");

// eslint-disable-next-line node/no-unsupported-features/node-builtins
const fs = require("fs").promises;

function readFild(path) {
  return fs
    .readFile(path)
    .then((data) => data)
    .catch(() => false);
}
function Passenger(name, trips, airline) {
  this._id = uuid();
  this.name = name;
  this.trips = trips;
  this.airline = airline;
  this.__v = 0;
}

module.exports.createPassenger = async (ctx) => {
  try {
    const { name, trips, airline } = ctx.request.body;
    // console.log(typeof name);
    if (
      name === undefined ||
      trips === undefined ||
      airline === undefined ||
      Number.isNaN(trips) ||
      Number.isNaN(airline) ||
      typeof name !== "string" ||
      typeof trips !== "number" ||
      typeof airline !== "number"
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

    const dats = await readFild("./passenger.json");
    const arrayOfObjects = JSON.parse(dats);
    const pass = new Passenger(name, trips, airline);
    arrayOfObjects.passengers_data.push(pass);
    await fs.writeFile(
      "passenger.json",
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

module.exports.getPassengers = async (ctx) => {
  try {
    // console.log(ctx.query.page);
    if (
      ctx.query.page === undefined ||
      ctx.query.size === undefined ||
      Number.isNaN(ctx.query.page) ||
      Number.isNaN(ctx.query.size)
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

    const page = Number(ctx.query.page);
    const size = Number(ctx.query.size);

    const dats = await readFild("./passenger.json");
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

module.exports.updatePassenger = async (ctx) => {
  try {
    if (ctx.params.passengerId === undefined) {
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

    const dats = await readFild("./passenger.json");
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

    const { name, trips, airline } = ctx.request.body;

    if (name !== undefined && typeof name === "string" && name.length) {
      passengerArray[i].name = name;
    }

    if (
      trips !== undefined &&
      !Number.isNaN(trips) &&
      typeof trips === "number" &&
      trips >= 0
    ) {
      passengerArray[i].trips = trips;
    }

    if (
      airline !== undefined &&
      !Number.isNaN(airline) &&
      typeof airline === "number" &&
      airline >= 0
    ) {
      passengerArray[i].airline = airline;
    }

    arrayOfObjects.passengers_data = passengerArray;
    await fs.writeFile(
      "passenger.json",
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
