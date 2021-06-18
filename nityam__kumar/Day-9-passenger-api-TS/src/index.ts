import axios from "axios";
import { promises as fss } from "fs";
import * as fs from "fs";
import path from "path";
import { parseAsync } from "json2csv";

class Person {
  id: string;
  name: string;
  trips: number;
  v: number;
  constructor(_id: string, name: string, trips: number, __v: number) {
    this.id = _id;
    this.name = name;
    this.trips = trips;
    this.v = __v;
  }
}

interface Airline {
  id?: number | string;
  name?: string;
  country?: string;
  logo?: string;
  slogan?: string;
  head_quater?: string;
  website?: string;
  established?: string | number;
  passenger_id?: string;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline | Airline[] | any | any[];
  __v: number;
}

interface PassengerApi {
  totalPassengers: number;
  totalPages: number;
  data: Passenger[];
}

interface data {
  passengers_data: Passenger[];
}

function isAccessible(path: string) {
  return fss
    .access(path)
    .then(() => true)
    .catch(() => false);
}

const getPassengerDetail = async () => {
  try {
    const r = await axios.get(
      `https://api.instantwebtools.net/v1/passenger?page=0&size=500`
    );
    const page: number = r.data.totalPages;

    for (let i = 0; i < page; i += 1) {
      const response = await axios.get(
        `https://api.instantwebtools.net/v1/passenger?page=${i}&size=500`
      );

      const jsonObj: PassengerApi = response.data;

      let dats = fs.readFileSync(
        path.join(__dirname, "../passenger.json"),
        "utf8"
      );

      let obj: data = JSON.parse(dats);
      console.log(obj);

      let Api_data = jsonObj.data;
      obj.passengers_data.push(...Api_data);

      await fss.writeFile(
        path.join(__dirname, "../passenger.json"),
        JSON.stringify(obj, null, 4)
      );

      let passengers: Person[] = [];
      let flights: Airline[] = [];

      for (let j = 0; j < Api_data.length; j++) {
        const obj = Api_data[j];
        const p = new Person(obj._id, obj.name, obj.trips, obj.__v);
        passengers.push(p);
        let f: Airline = obj.airline;
        if (f instanceof Array) {
          f = f[0];
        }

        f["passenger_id"] = obj._id;
        flights.push(f);
      }

      let csv_passenger;
      let csv_flight;

      if (await isAccessible(path.join(__dirname, "../passenger.csv"))) {
        csv_passenger = await parseAsync(passengers, { header: false });
        csv_flight = await parseAsync(flights, { header: false });
      } else {
        csv_passenger = await parseAsync(passengers, { header: true });
        csv_flight = await parseAsync(flights, { header: true });
      }

      await fss.appendFile("passenger.csv", csv_passenger);
      await fss.appendFile("passenger.csv", "\r\n");

      await fss.appendFile("flight.csv", csv_flight);
      await fss.appendFile("flight.csv", "\r\n");
    }
  } catch (err) {
    console.log(err);
  }
};

getPassengerDetail();
