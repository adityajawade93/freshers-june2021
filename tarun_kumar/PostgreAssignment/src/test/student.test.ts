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

    test("checking post students ", async () => {//0
        const data = {
            name: "vision",
            dob: "1963-08-15",
            sex: "male",
            classid: "4e7b559b-bc32-431a-a939-06dfda4e59dc"
        }
        const getRes = await request(app.callback()).post("/student").send(data).expect(201);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET students ", async () => {//1

        const getRes = await request(app.callback()).get("/student?page=0&size=2").expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });



    test("checking GET students marks", async () => {//2
        const id = `26b4f7bd-973e-4116-af8c-db008c68646f`;
        const getRes = await request(app.callback()).get(`/student/${id}/marks`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });


    test("checking GET students by class id", async () => {//3
        const classid = `1341d538-e86d-41b2-900f-6176a5b02d0d`;
        const getRes = await request(app.callback()).get(`/student/${classid}/class`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET students by subject id", async () => {//4
        const subid = `e25c1d22-479e-4151-ae74-68e2a36684f9`;
        const getRes = await request(app.callback()).get(`/student/${subid}/subject`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET students by teacher id", async () => {//5
        const teacherid = `bc04c5ff-9073-4c24-9991-b4d36a570192`;
        const getRes = await request(app.callback()).get(`/student/${teacherid}/teacher`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET top ten marks by subject id", async () => {//6
        const subid = `bcb04939-47be-4b41-8697-146635c9191e`;
        const getRes = await request(app.callback()).get(`/student/${subid}/topten`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });


    test("checking GET  getTopScorerEachSub", async () => {//7

        const getRes = await request(app.callback()).get(`/student/subjecttopper`).expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET top ten marks by wrong subject id", async () => {//8
        const subid = `bcb04939-47be-4b41-86sdf97-146635c9191e`;
        const getRes = await request(app.callback()).get(`/student/${subid}/topten`).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET students by wrong teacher id", async () => {//9
        const teacherid = `bc04c5ff-9073-4c2ss4-9991-b4d36a570192`;
        const getRes = await request(app.callback()).get(`/student/${teacherid}/subject`).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });


    test("checking GET students marks wrong id", async () => {//10
        const id = `26b4f7bd-97s3e-4116-af8c-db00sf8c68646f`;
        const getRes = await request(app.callback()).get(`/student/${id}/marks`).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });


    test("checking GET students by wrong class id", async () => {//11
        const classid = `1341d538-e8d6d-41b2-9sd00f-6176a5b02d0d`;
        const getRes = await request(app.callback()).get(`/student/${classid}/class`).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET students by wrong subject id", async () => {//12
        const subid = `e25csd1d22-479e-41sd51-ae74-68e2a36684f9`;
        const getRes = await request(app.callback()).get(`/student/${subid}/subject`).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });


    test("checking GET students wrong path", async () => {//13
        const subid = `e25csd1d22-479e-41sd51-ae74-68e2a36684f9`;
        const getRes = await request(app.callback()).get(`/student/${subid}/subjectd`).expect(400);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking post students ", async () => {//14
        const data = {
            name: "vision",
            dob: "1963-08-15",
            sex: "male",
            classid: "4e7b559b-bc32-431a-a93gfgfdg9-06dfda4e59dc"
        }
        const getRes = await request(app.callback()).post("/student").send(data).expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });


    test("checking GET students 0-0", async () => {//15

        const getRes = await request(app.callback()).get("/student?page=0&size=0").expect(200);
        //console.log(getRes.body.data);
        //console.log();
    });

    test("checking GET students wrong params", async () => {//16

        const getRes = await request(app.callback()).get("/student?page=abc&size=def").expect(500);
        //console.log(getRes.body.data);
        //console.log();
    });




});





