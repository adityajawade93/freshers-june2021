/* eslint-disable @typescript-eslint/no-var-requires */

import app from "../app/index";
import { dbStart, dbDisConnect } from "../db/db";

/* eslint-disable no-undef */
import request from "supertest";


describe("classes routes tests", () => {

    beforeAll(async () => {
        // do something before anything else runs
        await dbStart();
        console.log("Test starting!");

    });

    afterAll(async () => {
        await dbDisConnect();
        console.log("server closed!");

    });

    test("checking GET all classes", async () => {
        const getRes = await request(app.callback()).get("/class").expect(200);

        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET  classes by id", async () => {
        const id = "4e7b559b-bc32-431a-a939-06dfda4e59dc";
        const getRes = await request(app.callback()).get(`/class/${id}`).expect(200);


    });

    test("checking GET  classes by wrong id", async () => {
        const id = "4e7b559b-bc32-431a-a939-06dfsdgsdda4e59dc";
        const getRes = await request(app.callback()).get(`/class/${id}`).expect(500);



    });
    test("checking POST  classes", async () => {
        const c = {
            name: "77"
        };
        const getRes = await request(app.callback()).post(`/class`).send(c).expect(201);

    });
    test("checking POST  classes", async () => {
        const c = {
            name: 77
        };
        const getRes = await request(app.callback()).post(`/class`).send(c).expect(500);

    });

    test("checking POST  classes", async () => {
        const c = {
            name: "77"
        };
        const getRes = await request(app.callback()).post(`/classbvh`).send(c).expect(400);

    });


});





