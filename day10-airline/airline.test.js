/* eslint-disable */
const request = require("supertest");
const server = require("./airline.js");
const passengers = require("./passengers.json");
const uniqid = require("uniqid");

beforeAll(async () => {
    // do something before anything else runs
    console.log("Test starting!");
}); // close the server after each test

afterAll(() => {
    server.close();
    console.log("server closed!");
});

describe("basic route tests", () => {
    test("checking GET all passengers", async () => {
        let getRes = await request(server).get("/v1/passengers?page=0&size=10");
        //console.log(getRes.body.data);
        // console.log(passengers);

        expect(getRes.body.data).toEqual(passengers);
    });

    test(" checking invalid page size", async () => {
        let response = await request(server).get("/v1/passengers?page=110&size=10");
        //console.log(response.body);
        expect(response.status).toEqual(400);
        expect(response.text).toEqual("unable to fetch, page out of range");
    });

    test("POST ROUTE CHECK", async () => {
        const p1 = {
            name: "tarunds kumar",
            trips: 359,
            airline: {
                id: 2,
                name: "Singapore Airlines",
                country: "Singapore",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
                slogan: "A Great Way to Fly",
                head_quaters: "Airline House, 25 Airline Road, Singapore 819829",
                website: "www.singaporeair.com",
                established: "1947",
            },
            __v: 15,
        };

        p1._id = uniqid();
        //passengers.push(p1);
        const res = await request(server).post("/v1/passengers").send(p1);
        let getRes = await request(server).get("/v1/passengers?page=0&size=10");
        //console.log(getRes.body.data);
        //console.log(passengers);

        expect(getRes.body.data).toEqual(passengers);
    });

    test("check for wrong data given while post request", async () => {
        const p1 = {
            name: "tarun",
            trips: 359,
            airline: {
                id: 2,
                name: "",
                country: "Singapore",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
                slogan: "A Great Way to Fly",
                head_quaters: "Airline House, 25 Airline Road, Singapore 819829",
                website: "www.singaporeair.com",
                established: "1947",
            },
            __v: 123,
        };
        p1._id = uniqid();
        //passengers.push(p1);
        const res = await request(server).post("/v1/passengers").send(p1);
        let getRes = await request(server).get("/v1/passengers?page=0&size=10");

        console.log(res.text);

        expect(res.text).toEqual("Creation failed, Provide correct data");
        expect(getRes.body.data).toEqual(passengers);
    });

    test("check for wrong data given while post request 2nd", async () => {
        const p2 = {
            name: "",
            trips: 359,
            airline: {
                id: 2,
                name: "Tarun",
                country: "Singapore",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
                slogan: "A Great Way to Fly",
                head_quaters: "Airline House, 25 Airline Road, Singapore 819829",
                website: "www.singaporeair.com",
                established: "1947",
            },
            __v: 123,
        };
        p2._id = uniqid();
        //passengers.push(p1);
        const res = await request(server).post("/v1/passengers").send(p2);
        let getRes = await request(server).get("/v1/passengers?page=0&size=10");

        console.log(res.text);

        expect(res.text).toEqual("Creation failed, Provide correct data");
        expect(getRes.body.data).toEqual(passengers);
    });

    test("checking PUT/update task by ID ", async () => {
        const p1 = {
            name: "tarun",
            trips: 359,
            airline: {
                id: 2,
                name: "ok",
                country: "Singapore",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
                slogan: "A Great Way to Fly",
                head_quaters: "Airline House, 25 Airline Road, Singapore 819829",
                website: "www.singaporeair.com",
                established: "1947",
            },
            __v: 123,
        };
        p1._id = uniqid();
        const res = await request(server).post("/v1/passengers").send(p1);

        const p2 = {
            name: "tarun updated kumar",
            trips: 359,
            airline: {
                id: 2,
                name: "get sinagpore",
                country: "Singapore",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
                slogan: "A Great Way to Fly",
                head_quaters: "Airline House, 25 Airline Road, Singapore 819829",
                website: "www.singaporeair.com",
                established: "1947",
            },
            __v: 123,
        };
        // console.log(res.body);

        let putRes = await request(server)
            .put("/v1/passengers/" + res.body.content._id)
            .send(p2);
        let getRes = await request(server).get("/v1/passengers?page=0&size=10");
        // console.log(putRes);

        expect(putRes.body.message).toEqual(
            `Passenger with id : ${res.body.content._id} updated successfully.`
        );
        expect(getRes.body.data).toEqual(passengers);
    });

    test("checking PUT/update passenger by invalid data ", async () => {
        const p1 = {
            name: "tarun1",
            trips: 359,
            airline: {
                id: 2,
                name: "ok",
                country: "Singapore",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
                slogan: "A Great Way to Fly",
                head_quaters: "Airline House, 25 Airline Road, Singapore 819829",
                website: "www.singaporeair.com",
                established: "1947",
            },
            __v: 123,
        };

        p1._id = uniqid();
        const res = await request(server).post("/v1/passengers").send(p1);

        const p2 = {
            name: "",
            trips: 359,
            airline: {
                id: 2,
                name: "ok",
                country: "Singapore",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
                slogan: "A Great Way to Fly",
                head_quaters: "Airline House, 25 Airline Road, Singapore 819829",
                website: "www.singaporeair.com",
                established: "1947",
            },
            __v: 1234,
        };
        let putRes = await request(server)
            .put("/v1/passengers/" + res.body.content._id)
            .send(p2);
        expect(putRes.text).toEqual(`Update failed, Provide correct data`);
    });
});
