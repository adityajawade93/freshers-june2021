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

    test("checking POST add marks ", async () => {
        const d1 = {

            studentid: "5a739479-1c1d-4bf6-88b7-dafee2fa00fc",
            subid: "e83a0b24-62fa-4016-8185-b04e1b25621c",
            marks: 83
        };
        const getRes = await request(app.callback()).post("/mark").send(d1).expect(201);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking PUT modify marks ", async () => {
        const d2 = {

            studentid: "beea4cdc-bbd6-4bfe-b295-4e561ec8e709",
            subid: "60cc4e10-1e5e-4330-b792-d92661a64696",
            marks: 71
        };
        const getRes = await request(app.callback()).put("/mark").send(d2).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });


});





