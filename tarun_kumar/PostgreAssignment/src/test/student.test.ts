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

    test("checking GET students ", async () => {

        const getRes = await request(app.callback()).get("/student?page=0&size=2").expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET students marks", async () => {
        const id = `26b4f7bd-973e-4116-af8c-db008c68646f`;
        const getRes = await request(app.callback()).get(`/student/${id}/marks`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });


    test("checking GET students by class id", async () => {
        const classid = `1341d538-e86d-41b2-900f-6176a5b02d0d`;
        const getRes = await request(app.callback()).get(`/student/${classid}/class`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET students by subject id", async () => {
        const subid = `e25c1d22-479e-4151-ae74-68e2a36684f9`;
        const getRes = await request(app.callback()).get(`/student/${subid}/subject`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET students by teacher id", async () => {
        const teacherid = `bc04c5ff-9073-4c24-9991-b4d36a570192`;
        const getRes = await request(app.callback()).get(`/student/${teacherid}/subject`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET top ten marks by subject id", async () => {
        const subid = `bcb04939-47be-4b41-8697-146635c9191e`;
        const getRes = await request(app.callback()).get(`/student/${subid}/topten`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });


    test("checking GET  getTopScorerEachSub", async () => {

        const getRes = await request(app.callback()).get(`/student/subjecttopper`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

});





