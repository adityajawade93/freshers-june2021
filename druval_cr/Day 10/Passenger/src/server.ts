/* eslint-disable no-console */
import { Context } from "vm";

const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = new Koa();
const router = new Router();

app
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes());

interface PassengerRequestI {
  name?: any,
  trips?: any,
  airline?: any,
  __v?: any
}

class Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: any[] | object;
  __v: number;

  constructor(_id: string, name: string, trips: number = 0, airline: any[] | object = {}, __v: number = 0) {
    this._id = _id;
    this.name = name;
    this.trips = trips;
    this.airline = airline;
    this.__v = __v;
  }
}

let passerngerData: Passenger[] = require('../passenger.json');
const passerngerDataPath: string = './passenger.json';


// helper functions
const storeData = (data: string, path: string) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

function isFetchablePassengerData(page: number, size: number) {
  const totalData: number = passerngerData.length;
  
  if (totalData === 0 || size <= 0) return false;
  const totalPages: number = Math.ceil(totalData/size);
  
  // page: [0, totalPages)
  return (page >= 0 && page < totalPages); 
}

function fetchPassengerData(page: number, size: number) {
  if (!isFetchablePassengerData(page, size)) return [];

  const totalData: number = passerngerData.length;
  const startIndex: number = page * size;
  const endIndex: number = Math.min((page * size) + size - 1, totalData - 1);

  return passerngerData.slice(startIndex, endIndex + 1);
}

function validQueryParams(query: { page?: string, size?: string } | null) {
  interface ResultI {
    page: number,
    size: number
  }
  const result: ResultI = {
    page: -1,
    size: -1,
  };

  if (query) {
    if (query.page) {
      const page: number = parseInt(query.page, 10);
      if (!isNaN(page) && page >= 0) result.page = page;
    }
    if (query.size) {
      const size: number = parseInt(query.size, 10);
      if (!isNaN(size) && size > 0) result.size = size;
    }
  }
  return result;
}

function validPassengerRequestData(data: PassengerRequestI) {
  if ( (data.name && (typeof data.name !== 'string' || !data.name.trim()))
    || (data.trips && typeof data.trips !== 'number') 
    || (data.__v && typeof data.__v !== 'number')
    || (data.airline && (!Array.isArray(data.airline) || typeof data.airline !== 'object'))
  ) {
    return false;
  }
  return true;
}

function getPassengerID(id: any){
  if (!id || typeof id !== 'string') return -1;
  for (let index: number = 0; index < passerngerData.length; index += 1) {
    const passenger: Passenger = passerngerData[index];
    if (passenger._id === id) return index;
  }
  return -1;
}


// route functions
async function fetchPassengers(ctx: Context) {
  const paramsData: { page: number, size: number } = validQueryParams(ctx.request.query);
  const page: number = paramsData.page;
  const size: number = paramsData.size;
  if (page === -1 || size === -1) {
    ctx.status = 400;
    ctx.body = 'Wrong query params';
    return;
  }
  const result: Passenger[] = fetchPassengerData(page, size);
  ctx.body = {
    total: passerngerData.length,
    data_count: result.length,
    data: result
  }
}

function addPassenger(ctx: Context) {
  const passengerRequestData = ctx.request.body;
  // name is must, others are optional (default value is taken)
  
  
  const validRequestData: boolean = (validPassengerRequestData(passengerRequestData) && passengerRequestData.name);
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'Invalid data';
    return;
  }
  try {
    const id: string = uuidv4();
    const result: Passenger = new Passenger(id, passengerRequestData.name.trim() as string, passengerRequestData.trips, 
      passengerRequestData.airline, passengerRequestData.__v);

    storeData(JSON.parse(JSON.stringify([...passerngerData, result])), passerngerDataPath);
    // push to array only if it is successfully stored in the file
    passerngerData.push(result);
    ctx.body = {
      total: passerngerData.length,
      message: `passenger with id ${id} created successfully`
    }
  }
  catch (err) {
    ctx.status = 404;
    ctx.body = 'Error while saving data';
    return;
  }
}

function updatePassenger(ctx: Context) {
  const passengerRequestData = ctx.request.body;
  const id: number = getPassengerID(ctx.params.id);
  const validRequestData: boolean = validPassengerRequestData(passengerRequestData);
  if (id !== -1 && validRequestData){
    try {
      const currentPassengerData: Passenger[] = passerngerData.slice();
      if (passengerRequestData.name) currentPassengerData[id].name = passengerRequestData.name.trim();
      if (passengerRequestData.trips) currentPassengerData[id].trips = passengerRequestData.trips;
      if (passengerRequestData.__v) currentPassengerData[id].__v = passengerRequestData.__v;
      if (passengerRequestData.airline) currentPassengerData[id].airline = passengerRequestData.airline;

      storeData(JSON.parse(JSON.stringify(currentPassengerData)), passerngerDataPath);
      // push to array only if it is successfully stored in the file
      passerngerData = currentPassengerData.slice();
      ctx.body = {
        total: passerngerData.length,
        message: `passenger with id ${ctx.params.id} updated successfully`
      }
      return;
    }
    catch (err) {
      ctx.status = 404;
      ctx.body = 'Error while updating data';
      return;
    }
  }
  ctx.status = 400;
  ctx.body = 'Invalid data';
  return;
}


// routes
router.get('/v1/passenger', fetchPassengers);
router.post('/v1/passenger', addPassenger);
router.put('/v1/passenger/:id', updatePassenger);

app.use(async (ctx: any) => {
  ctx.status = 404;
  ctx.body = 'Page not found';
});

const port: number = 3000;

app.listen(port, () => {
  console.log('server is active on port', port);
});
