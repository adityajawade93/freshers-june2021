/* eslint-disable @typescript-eslint/no-var-requires */

import app from "../app/index";
import { dbStart, dbDisConnect } from "../db/db";

/* eslint-disable no-undef */
import request from "supertest";
import { v4 as uuidv4 } from 'uuid';


describe("mark routes tests", () => {

    beforeAll(async () => {
        // do something before anything else runs
        await dbStart();
        console.log("Test starting!");
    });

    afterAll(async () => {
        await dbDisConnect();
        console.log("server closed!");
    });

    test("checking POST add marks ", async () => {//1
        const d1 = {

            studentid: "2345a6b8-f1f8-4cd4-9c76-6272c3c7d3bc",
            subid: "e83a0b24-62fa-4016-8185-b04e1b25621c",
            marks: 83
        };
        const getRes = await request(app.callback()).post("/mark").send(d1).expect(201);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking PUT modify marks ", async () => {//2
        const d2 = {

            studentid: "beea4cdc-bbd6-4bfe-b295-4e561ec8e709",
            subid: "60cc4e10-1e5e-4330-b792-d92661a64696",
            marks: 71
        };
        const getRes = await request(app.callback()).put("/mark").send(d2).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });


    test("checking PUT modify marks with wrong id", async () => {//3
        const d2 = {

            studentid: "beea4cdc-bdsvbd6-4bfe-b295-4e561ec8e709",
            subid: "60cc4e10-1e5e-4330-b792-d92661a64696",
            marks: 71
        };
        const getRes = await request(app.callback()).put("/mark").send(d2).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking POST add marks wrong id ", async () => {//4
        const d1 = {

            studentid: "5a7394ssfsdf79-1c1d-4bf6-88b7-dafee2fa00fc",
            subid: "e83a0b24-62fa-4016-8185-b04e1b25621c",
            marks: 83
        };
        const getRes = await request(app.callback()).post("/mark").send(d1).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });
    test("checking POST add marks wrong path ", async () => {//5
        const d1 = {

            studentid: "5a7394ssfsdf79-1c1d-4bf6-88b7-dafee2fa00fc",
            subid: "e83a0b24-62fa-4016-8185-b04e1b25621c",
            marks: 83
        };
        const getRes = await request(app.callback()).post("/markbh").send(d1).expect(400);
        //console.log(getRes.body.data);
        //console.log();
    });


});





