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

    test("checking GET teacher wrong path", async () => {

        const getRes = await request(app.callback()).get("/teacherdf").expect(400);
        //console.log(getRes.body.data);
        //console.log();
    });
    test("checking POST  teachers", async () => {
        const c = {
            name: "xavier",
            sex: "male",
            dob: "1991-2-23",
            subid: "60cc4e10-1e5e-4330-b792-d92661a64696"
        };
        const getRes = await request(app.callback()).post(`/teacher`).send(c).expect(201);
    });

    test("checking POST  teachers with wrong data", async () => {
        const c = {
            name: "xavier",
            sex: "male",
            dob: "1991-2-23",
            subid: "60cc4e10-1e5e-4330-b7sdfsdf92-d92661a64696"
        };
        const getRes = await request(app.callback()).post(`/teacher`).send(c).expect(500);
    });

});

