/* eslint-disable @typescript-eslint/no-var-requires */

import app from "../app/index";
import { dbStart, dbDisConnect } from "../db/db";

/* eslint-disable no-undef */
import request from "supertest";
import { v4 as uuidv4 } from 'uuid';


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

    test("checking POST subject ", async () => {
        const name = {
            name: "financeolnjogy"

        }
        const getRes = await request(app.callback()).post("/subject").send(name).expect(201);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking POST subject wrong name ", async () => {
        const name = {
            name: 123456
        }
        const getRes = await request(app.callback()).post("/subject").send(name).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking POST subject wrong name2 ", async () => {
        const name = {
            name: 123456,
            hash: 12
        }
        const getRes = await request(app.callback()).post("/subject").send(name).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET subject ", async () => {

        const getRes = await request(app.callback()).get("/subject").expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET subject wrong path", async () => {

        const getRes = await request(app.callback()).get("/subjectdd").expect(400);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET subject by name", async () => {
        const subname = "maths";
        const getRes = await request(app.callback()).get(`/subject/${subname}`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET subject by wrong name", async () => {
        const subname = "matsdafsdfsdfsdfhs";
        const getRes = await request(app.callback()).get(`/subject/${subname}`).expect(400);
        //console.log(getRes.body.data);
        //console.log();
    });


});





