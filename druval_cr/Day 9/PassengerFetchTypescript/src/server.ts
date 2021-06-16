const axios = require('axios');
const fs = require('fs');
const { Parser } = require('json2csv');

interface PassengerI {
  _id: string,
  name: string,
  trips: number,
  airline: any[],
  __v: number
}

interface PassengerApiRes {
  data: {
    data: PassengerI[]
  }
}

const passengers: PassengerI[] = [];

function fetchPassengerData(url: string) {
  return axios.get(url);
}

function reductiveFetchPassenger(urls: string[]) {
  return urls.reduce((chain: Promise<any>, url: string) => chain.then((value: PassengerApiRes | void) => {
    // base condition promise won't have data
    if (value) passengers.push(...value.data.data);
    return fetchPassengerData(url);

    // base condition
  }), Promise.resolve());
}

function fetchPassenger() {
  const urls: string[] = [];
  const baseUrl: string = 'https://api.instantwebtools.net/v1/passenger';
  const totPages: number = 18;
  const maxPageSize: number = 500;

  for (let page: number = 0; page < totPages; page += 1) {
    urls.push(`${baseUrl}?page=${page}&size=${maxPageSize}`);
  }

  reductiveFetchPassenger(urls)
    .then((res: PassengerApiRes | void) => {
      if (res) passengers.push(...res.data.data);

      const passengersJsonObj: PassengerI[] = JSON.parse(JSON.stringify(passengers));
      const keys: string[] = [];
      if (passengersJsonObj.length > 0) {
        keys.push(...Object.keys(passengersJsonObj[0]));
      }

      try {
        const parser: typeof Parser = new Parser({ keys });
        const csv: string = parser.parse(passengersJsonObj);
        fs.writeFile('passenger.csv', csv, (err: Error) => {
          if (err) throw err;
          console.log('csv data saved');
        });
      } catch (err) {
        console.error(err);
      }

      const jsonContent: string = JSON.stringify(passengersJsonObj);

      fs.writeFile('passenger.json', jsonContent, 'utf8', (err: Error) => {
        if (err) {
          console.log(err);
        } else {
          console.log('json data saved');
        }
      });
    });
}

fetchPassenger();
