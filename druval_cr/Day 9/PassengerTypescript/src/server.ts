/* eslint-disable no-console */
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

import { ReadStream } from "fs";

const app = new Koa();

const router = new Router();

app
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes());

const totalPages: number = 18;
const maxPageSize: number = 500;
const passengerFile: string = 'passenger.json';

interface PassengerI {
  _id: string,
  name: string,
  trips: number,
  airline: any[],
  __v: number
}

// helper functions
function validateQueryParams(query: { page?: string, size?: string } | null) {
  interface ResultI {
    page: number,
    size: number
  }
  const result: ResultI = {
    page: -1,
    size: -1,
  };

  if (!query) return result;
  if (query.page) {
    const page: number = parseInt(query.page, 10);
    if (!isNaN(page) && page >= 0 && page < totalPages) {
      result.page = page;
    }
  }
  if (query.size) {
    const size: number = parseInt(query.size, 10);
    if (!isNaN(size) && size >= 1 && size <= maxPageSize) {
      result.size = size;
    }
  }
  return result;
}

function getPassengerData(page: number, size: number) {
  return new Promise<PassengerI[]>((resolve, reject) => {
    try {
      const readStream: ReadStream = fs.createReadStream(passengerFile);
      readStream.on('error', (e: Error) => reject(e));
      const pipeline = readStream.pipe(StreamArray.withParser());
      const passengers: PassengerI[] = [];

      // [startIndex, endIndex)
      const startIndex: number = page * maxPageSize;
      const endIndex: number = startIndex + size;
      console.log(startIndex, endIndex);

      pipeline.on('data', (item: { key: number, value: PassengerI }) => {
        if (item.key >= startIndex && item.key < endIndex) {
          passengers.push(item.value);
        } else if (item.key >= endIndex) {
          // eslint-disable-next-line no-useless-return
          return;
        }
      });
      pipeline.on('end', () => resolve(passengers));
      pipeline.on('error', (e: Error) => reject(e));
    } catch (e) {
      reject(e);
    }
  });
}

// routes functions
async function fetchPassengers(ctx: any) {
  const result: { page: number, size: number } = validateQueryParams(ctx.request.query);
  const page: number = result.page;
  const size: number = result.size;
  if (page === -1 || size === -1) {
    ctx.status = 404;
    ctx.body = 'Wrong query params';
    return;
  }
  try {
    const passengers: PassengerI[] = await getPassengerData(page, size);
    const responseData = {
      entries: passengers.length,
      data: passengers,
    };
    ctx.body = responseData;
  } catch (e) {
    ctx.status = 404;
    ctx.body = `Error occured while fetching: ${e}`;
  }
}

// routes
router.get('/v1/passengers', fetchPassengers);

app.use(async (ctx: any) => {
  ctx.status = 404;
  ctx.body = 'Page not found';
});

const port: number = 3000;

app.listen(port, () => {
  console.log('server is active on port', port);
});
