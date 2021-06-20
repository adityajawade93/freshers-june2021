// eslint-disable-next-line node/no-unpublished-require
import request from "supertest";

import * as fs from "fs";

import path from "path";

import app from "../src/app";

interface Airline {
  id?: number | string;
  name?: string;
  country?: string;
  logo?: string;
  slogan?: string;
  head_quater?: string;
  website?: string;
  established?: string | number;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline | Airline[];
  __v: number;
}

interface Data {
  passengers_data: Passenger[];
}

const createRandom = (min: number, max: number) => {
  const diff = max - min;
  const random = Math.random();
  return Math.floor(random * diff + min);
};

describe("GET /passenger", () => {
  test("invalid data", async () => {
    const response = await request(app.callback()).get(
      `/v1/passengers?page=gf&size=gfg`
    );
    expect(response.status).toBe(400);
  });

  test("page not found", async () => {
    const response = await request(app.callback()).get(
      "/v1/passengers/?page=2&size=700"
    );
    expect(response.status).toBe(404);
  });

  test("It responds with an array of Passengers with given page and size", async () => {
    const response = await request(app.callback()).get(
      "/v1/passengers/?page=1&size=10"
    );

    const dats = fs.readFileSync(
      path.join(__dirname, "../passenger.json"),
      "utf8"
    );

    const arrayOfObjects: Data = JSON.parse(dats);

    const data_size = arrayOfObjects.passengers_data.length;
    const curr_index1: number = createRandom(0, response.body.data.length - 1);
    const curr_index2: number = createRandom(0, response.body.data.length - 1);

    const v1 = arrayOfObjects.passengers_data[curr_index1].name;
    const v2 = arrayOfObjects.passengers_data[curr_index2]._id;
    expect(response.body.data.length).toBe(data_size);
    expect(response.body.data[curr_index2]).toHaveProperty("_id");
    expect(response.body.data[curr_index2]).toHaveProperty("name");
    expect(response.body.data[curr_index2]).toHaveProperty("trips");
    expect(response.body.data[curr_index2]).toHaveProperty("airline");
    expect(response.statusCode).toBe(200);
    expect(response.body.data[curr_index2]._id).toBe(v2);
    expect(response.body.data[curr_index1].name).toBe(v1);
  });
});

describe("POST /passenger", () => {
  test("It responds with message of successful creation of passenger", async () => {
    const response3 = await request(app.callback()).get(
      "/v1/passengers/?page=1&size=500"
    );

    const curr_size = response3.body.data.length;

    const response = await request(app.callback())
      .post("/v1/passenger")
      .send({
        name: "Undertaker",
        trips: 82431212,
        airline: {
          id: 69999,
          name: "Deutsche Lufthansa AG",
          country: "India",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lufthansa_Logo_2018.svg/300px-Lufthansa_Logo_2018.svg.png",
          slogan: "Say yes to the world",
          head_quaters: "Cologne, Germany",
          website: "lufthansa.com",
          established: "1953",
        },
      })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);

    const response2 = await request(app.callback()).get(
      "/v1/passengers/?page=1&size=500"
    );
    const dats = fs.readFileSync(
      path.join(__dirname, "../passenger.json"),
      "utf8"
    );

    const arrayOfObjects: Data = JSON.parse(dats);

    const data_size = arrayOfObjects.passengers_data.length;
    expect(response2.body.data.length).toBe(curr_size + 1);
    expect(response2.statusCode).toBe(200);
    expect(response2.body.data[data_size - 1].name).toBe("Undertaker");
  });
});

describe("PUT /task", () => {
  test("It responds with message of successful updation", async () => {
    const response3 = await request(app.callback()).get(
      "/v1/passengers/?page=1&size=10"
    );

    const dats = fs.readFileSync(
      path.join(__dirname, "../passenger.json"),
      "utf8"
    );

    const arrayOfObjects: Data = JSON.parse(dats);
    const curr_data_size = arrayOfObjects.passengers_data.length;
    expect(response3.body.data.length).toBe(curr_data_size);

    const curr_index: number = createRandom(0, response3.body.data.length - 1);
    const curr: Passenger = response3.body.data[curr_index];
    const idd = curr._id;
    const response = await request(app.callback())
      .put(`/v1/passenger/${idd}`)
      .send({
        name: "BIG_HULK PURPLE",
        trips: 79,
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    const response2 = await request(app.callback()).get(
      "/v1/passengers/?page=1&size=500"
    );
    expect(response2.statusCode).toBe(200);
    expect(response2.body.data.length).toBe(response3.body.data.length);
    expect(response2.body.data[curr_index].name).toBe("BIG_HULK PURPLE");
    expect(response2.body.data[curr_index].trips).toBe(79);
    expect(response2.body.data[curr_index]._id).toBe(`${idd}`);
  });
});
