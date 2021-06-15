/* eslint-disable no-console */
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

const app = new Koa();

const router = new Router();

app
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes());

const totalPages = 18;
const maxPageSize = 500;
const passengerFile = 'passenger.json';

// helper functions
function validateQueryParams(query) {
  const result = {
    page: -1,
    size: -1,
  };

  if (!query) return result;
  if (query.page && query.page >= 0 && query.page < totalPages) {
    result.page = parseInt(query.page, 10);
  }
  if (query.size && query.size >= 1 && query.size <= maxPageSize) {
    result.size = parseInt(query.size, 10);
  }
  return result;
}

function getPassengerData(page, size) {
  return new Promise((resolve, reject) => {
    try {
      const pipeline = fs.createReadStream(passengerFile).pipe(StreamArray.withParser());
      const passengers = [];

      // [startIndex, endIndex)
      const startIndex = page * maxPageSize;
      const endIndex = startIndex + size;
      console.log(startIndex, endIndex);

      pipeline.on('data', ({ key, value }) => {
        if (key >= startIndex && key < endIndex) {
          passengers.push(value);
        } else if (key >= endIndex) {
          // eslint-disable-next-line no-useless-return
          return;
        }
      });
      pipeline.on('end', () => resolve(passengers));
    } catch (e) {
      reject(e);
    }
  });
}

// routes functions
async function fetchPassengers(ctx) {
  const result = validateQueryParams(ctx.request.query);
  const { page, size } = result;
  if (page === -1 || size === -1) {
    ctx.status = 404;
    ctx.body = 'Wrong query params';
    return;
  }
  try {
    const passengers = await getPassengerData(page, size);
    const responseData = {
      entries: passengers.length,
      data: passengers,
    };
    ctx.body = responseData;
  } catch (e) {
    ctx.status = 404;
    ctx.body = `Error occured while fetching: ${e}`;
  }
  // getPassengerData(page, size)
  //   .then((data) => {
  //     console.log(data);
  //     const responseData = {
  //       entries: data.length,
  //       data,
  //     };
  //     ctx.body = responseData;
  //   })
  //   .catch((error) => {
  //     ctx.status = 404;
  //     ctx.body = `Error occured while fetching: ${error}`;
  //   });
}

// routes
router.get('/v1/passengers', fetchPassengers);

app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = 'Page not found';
});

module.exports = {
  app,
};
