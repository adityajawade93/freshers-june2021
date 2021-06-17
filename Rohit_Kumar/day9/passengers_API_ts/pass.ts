import { type } from "os";
const fs = require("fs");
var axios = require("axios");
const json_to_csv = require("json-2-csv");
// import fs from 'fs'
// import axios from 'axios'
// import json_to_csv from ''

var page: number = 0;
var size: number = 500;
var options: {
  method: string;
  url: string;
  headers: any;
} = {
  method: "GET",
  url: `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`,
  headers: {},
};

let pageIndexes: any = [];
for (let i = 0; i < 18; i++) pageIndexes.push(i);

interface passenger_data {
  _id: string;
  name: string;
  trips: number;
  airline: any[];
  __v: number;
}
interface res_type {
  data: {
    totalPassengers: number;
    totalPages: number;
    data: passenger_data[];
  };
}

const fetch = async () => {
  var arrPassengers: passenger_data[] = [];
  try {
    let res: res_type[] = [];
    res = await Promise.all(
      pageIndexes.map((index) => {
        page = index;
        return axios(options);
      })
    );
    res.map((data_list: res_type) => {
      arrPassengers = arrPassengers.concat(data_list.data.data);
    });
  } catch (error) {
    console.log(error);
  }
  fs.writeFile("passengers.json", JSON.stringify(arrPassengers), (err) => {
    if (err) throw err;
    console.log("done with json");
  });
  json_to_csv.json2csv(arrPassengers, (err, csv) => {
    if (err) {
      throw err;
    }
    console.log("done with csv");
    fs.writeFileSync("passengers.csv", csv);
  });
};

fetch();
