// eslint-disable-next-line node/no-unpublished-require
const request = require("supertest");

const app = require("../app");

describe("GET /passenger", () => {
  test("It responds with an array of Passengers with given page and size", async () => {
    const response = await request(app.callback()).get(
      "/v1/passengers/?page=1&size=10"
    );
    expect(response.body.data.length).toBe(5);
    expect(response.body.data[0]).toHaveProperty("_id");
    expect(response.body.data[0]).toHaveProperty("name");
    expect(response.body.data[0]).toHaveProperty("trips");
    expect(response.body.data[0]).toHaveProperty("airline");
    expect(response.statusCode).toBe(200);
    expect(response.body.data[4]._id).toBe("5f1c59c9fa523c3aa793bf41");
    expect(response.body.data[1].name).toBe("Danika Maretz");
  });
});

describe("POST /passenger", () => {
  test("It responds with message of successful creation of passenger", async () => {
    const response = await request(app.callback())
      .post("/v1/passenger")
      .send({
        name: "Kohli-king",
        trips: 824,
        airline: 34342,
      })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    const response2 = await request(app.callback()).get(
      "/v1/passengers/?page=1&size=10"
    );
    expect(response2.body.data.length).toBe(6);
    expect(response2.statusCode).toBe(200);
    expect(response2.body.data[5].name).toBe("Kohli-king");
  });
});

describe("PUT /task", () => {
  test("It responds with message of successful updation", async () => {
    const response3 = await request(app.callback()).get(
      "/v1/passengers/?page=1&size=10"
    );
    expect(response3.body.data.length).toBe(6);

    const response = await request(app.callback())
      .put("/v1/passenger/5f1c59c9fa523c3aa793bf41")
      .send({
        name: "BIG_HULK PURPLE",
        trips: 79,
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    const response2 = await request(app.callback()).get(
      "/v1/passengers/?page=1&size=10"
    );
    expect(response2.statusCode).toBe(200);
    expect(response2.body.data.length).toBe(6);
    expect(response2.statusCode).toBe(200);
    expect(response2.body.data[4].name).toBe("BIG_HULK PURPLE");
    expect(response2.body.data[4].trips).toBe(79);
    expect(response2.body.data[4]._id).toBe("5f1c59c9fa523c3aa793bf41");
  });
});
