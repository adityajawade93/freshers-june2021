import request from "supertest";

import app from "../src/app/app";

import AppError from "../src/utils/appError";

import { pgConnect } from "../src/db/index";

import { pgDisConnect } from "../src/db/index";

describe("Test / error", () => {
  beforeAll(async () => {
    await pgConnect();
  });
  afterAll(async () => await pgDisConnect());

  test("it should catch error", () => {
    const t = () => {
      throw new AppError("Internal Server Error", 500);
    };
    expect(t).toThrow(AppError);
    expect(t).toThrow("Internal Server Error");
  });
  test("it should catch error", () => {
    const t = () => {
      throw new AppError("Internal Error");
    };
    expect(t).toThrow(AppError);
    expect(t).toThrow("Internal Error");
  });

  test("it should catch error", () => {
    const t = () => {
      throw new Error("Error!!");
    };
    expect(t).toThrow(Error);
    expect(t).toThrow("Error!!");
  });

  test("it should catch error with 404 endpoint not found", async () => {
    const respnse = await request(app.callback()).get("/error").expect(404);
  });
});
