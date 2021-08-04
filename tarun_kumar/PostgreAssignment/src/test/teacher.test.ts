/* eslint-disable @typescript-eslint/no-var-requires */

import app from "../app/index";
import { dbStart, dbDisConnect } from "../db/db";

/* eslint-disable no-undef */
import request from "supertest";



describe("student routes tests", () => {

    beforeAll(async () => {
        // do something before anything else runs
        await dbStart();
        console.log("Test starting!");
    });

    afterAll(async () => {
        await dbDisConnect();
        console.log("server closed!");
    });

    test("checking GET teacher ", async () => {

        const getRes = await request(app.callback()).get("/teacher").expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });



});





