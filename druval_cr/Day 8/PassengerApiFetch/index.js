/* eslint-disable no-console */
const axios = require('axios');
const fs = require('fs');
const { Parser } = require('json2csv');

const passengers = [];

function fetchPassengerData(url) {
  return axios.get(url);
}

function reductiveFetchPassenger(urls) {
  return urls.reduce((chain, url) => chain.then((value) => {
    // base condition promise won't have data
    if (value) passengers.push(...value.data.data);
    return fetchPassengerData(url);

    // base condition
  }), Promise.resolve());
}

function fetchPassenger() {
  const urls = [];
  const baseUrl = 'https://api.instantwebtools.net/v1/passenger';
  const totPages = 18;
  const maxPageSize = 500;

  for (let page = 0; page < totPages; page += 1) {
    urls.push(`${baseUrl}?page=${page}&size=${maxPageSize}`);
  }

  reductiveFetchPassenger(urls)
    .then((res) => {
      if (res) passengers.push(...res.data.data);

      const passengersJsonObj = JSON.parse(JSON.stringify(passengers));
      const keys = [];
      if (passengersJsonObj.length > 0) {
        keys.push(...Object.keys(passengersJsonObj[0]));
      }

      try {
        const parser = new Parser({ keys });
        const csv = parser.parse(passengersJsonObj);
        fs.writeFile('passenger.csv', csv, (err) => {
          if (err) throw err;
          console.log('csv data saved');
        });
      } catch (err) {
        console.error(err);
      }

      const jsonContent = JSON.stringify(passengersJsonObj);

      fs.writeFile('passenger.json', jsonContent, 'utf8', (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('json data saved');
        }
      });
    });
}

fetchPassenger();
