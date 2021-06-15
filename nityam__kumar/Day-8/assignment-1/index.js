const axios = require("axios");

const fs = require("fs").promises;

const { parseAsync } = require("json2csv");

function Person(_id, name, trips, __v) {
  this.id = _id;
  this.name = name;
  this.trips = trips;
  this.v = __v;
}

function isAccessible(path) {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
}

function readFild(path) {
  return fs
    .readFile(path)
    .then((data) => data)
    .catch(() => false);
}

const getPassengerDetail = async () => {
  try {
    const r = await axios.get(
      `https://api.instantwebtools.net/v1/passenger?page=0&size=500`
    );
    const page = r.data.totalPages;

    for (let i = 0; i < page; i += 1) {
      const response = await axios.get(
        `https://api.instantwebtools.net/v1/passenger?page=${i}&size=500`
      );

      const jsonArray = response.data.data;

      let dats = await readFild("./passenger.json");

      let arrayOfObjects = JSON.parse(dats);

      // console.log(arrayOfObjects);

      // pass_array = arrayOfObjects.passengers_data;

      // console.log(pass_array);

      arrayOfObjects["passengers_data"].push(...jsonArray);

      await fs.writeFile(
        "passenger.json",
        JSON.stringify(arrayOfObjects),
        null,
        4
      );

      let passengers = [];
      let flights = [];

      for (let j = 0; j < jsonArray.length; j++) {
        const obj = jsonArray[j];
        const p = new Person(obj._id, obj.name, obj.trips, obj.__v);
        passengers.push(p);
        let f = obj.airline;
        if (f instanceof Array) {
          f = f[0];
        }
        // console.log(f);
        f["passenger_id"] = obj._id;
        flights.push(f);
        //  console.log(obj.airline);
      }

      let csv_passenger;
      let csv_flight;

      if (await isAccessible("passenger.csv")) {
        csv_passenger = await parseAsync(passengers, { header: false });
        csv_flight = await parseAsync(flights, { header: false });
      } else {
        csv_passenger = await parseAsync(passengers, { header: true });
        csv_flight = await parseAsync(flights, { header: true });
      }

      await fs.appendFile("passenger.csv", csv_passenger);
      await fs.appendFile("passenger.csv", "\r\n");

      await fs.appendFile("flight.csv", csv_flight);
      await fs.appendFile("flight.csv", "\r\n");
    }
  } catch (err) {
    console.log(error);
  }
};

getPassengerDetail();
