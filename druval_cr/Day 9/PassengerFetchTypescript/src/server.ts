const axios = require('axios');
const fs = require('fs');
const { Parser } = require('json2csv');

interface PassengerI {
  _id: string,
  name: string,
  trips: number,
  airline: any[] | {},
  __v: number
}

interface PassengerApiRes {
  data: {
    data: PassengerI[]
  }
}

function getTotalPages(totalData: number, batchSize: number) {
  if (batchSize <= 0 || totalData <= 0) return 0;
  return Math.ceil(totalData/batchSize);
}

function fetchPassengerData(url: string) {
  return axios.get(url);
}

async function getTotalPassengers(baseUrl: string) {
  const minLoad = { page: 0, size: 1 };
  const response = await fetchPassengerData(`${baseUrl}?page=${minLoad.page}&size=${minLoad.size}`);
  
  return response.data.totalPassengers;
}

function reductiveFetchPassenger(urls: string[], passengers: PassengerI[]) {
  return urls.reduce((chain: Promise<any>, url: string) => chain.then((value: PassengerApiRes | void) => {
    console.log(url);
    
    // base condition promise won't have data
    if (value) passengers.push(...value.data.data);
    return fetchPassengerData(url);

    // base condition
  }), Promise.resolve());
}

async function fetchPassenger() {
  const passengers: PassengerI[] = [];
  const urls: string[] = [];
  const baseUrl: string = 'https://api.instantwebtools.net/v1/passenger';
  const batchSize: number = 500;

  const totalPassengers = await getTotalPassengers(baseUrl);
  const totalPages = getTotalPages(totalPassengers, batchSize);

  console.log(totalPassengers, totalPages);
  
  for (let page: number = 0; page < totalPages; page += 1) {
    urls.push(`${baseUrl}?page=${page}&size=${batchSize}`);
  }

  reductiveFetchPassenger(urls, passengers)
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
