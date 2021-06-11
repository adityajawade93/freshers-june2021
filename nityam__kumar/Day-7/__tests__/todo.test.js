// eslint-disable-next-line node/no-unpublished-require
const request = require("supertest");

const app = require("../app");

describe("GET /task", () => {
  test("It responds with an array of Tasks", async () => {
    const response = await request(app.callback()).get("/todo");
    expect(response.body.task.length).toBe(2);
    expect(response.body.task[0]).toHaveProperty("id");
    expect(response.body.task[0]).toHaveProperty("title");
    expect(response.body.task[0]).toHaveProperty("date");
    expect(response.body.task[0]).toHaveProperty("completed");
    expect(response.body.task[0]).toHaveProperty("content");
    expect(response.statusCode).toBe(200);
    expect(response.body.task[0].id).toBe("56");
    expect(response.body.task[1].title).toBe("study");
  });

  test("It responds with an  Task of particular id", async () => {
    const response = await request(app.callback()).get("/todo/56");
    expect(response.body.task).toHaveProperty("id");
    expect(response.body.task).toHaveProperty("title");
    expect(response.body.task).toHaveProperty("date");
    expect(response.body.task).toHaveProperty("completed");
    expect(response.body.task).toHaveProperty("content");
    expect(response.statusCode).toBe(200);
    expect(response.body.task.id).toBe("56");
    expect(response.body.task.title).toBe("sop");
  });
});

describe("Delete /task", () => {
  test("It responds with message of successful deletion", async () => {
    const response = await request(app.callback()).delete("/todo/56");
    expect(response.statusCode).toBe(200);
    const response2 = await request(app.callback()).get("/todo");
    expect(response2.body.task.length).toBe(1);
  });

  test("It responds with message of fail deletion", async () => {
    const response = await request(app.callback()).delete("/todo/6");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("fail");
  });
});

describe("POST /task", () => {
  test("It responds with message of successful creation", async () => {
    const response = await request(app.callback())
      .post("/todo")
      .send({
        title: "Anotherone",
        content: "mozoo",
      })
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(201);
    const response2 = await request(app.callback()).get("/todo");
    expect(response2.body.task.length).toBe(2);
  });
});

describe("PUT /task", () => {
  test("It responds with message of successful updation", async () => {
    const response = await request(app.callback())
      .put("/todo/1234")
      .send({
        title: "Nextone",
        content: "bozoo",
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    const response2 = await request(app.callback()).get("/todo/1234");
    expect(response2.statusCode).toBe(200);
    expect(response2.body.task.id).toBe("1234");
    expect(response2.body.task.title).toBe("Nextone");
    expect(response2.body.task.content).toBe("bozoo");
  });
});
