"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line node/no-unpublished-require
const supertest_1 = __importDefault(require("supertest"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("../src/app"));
const createRandom = (min, max) => {
    const diff = max - min;
    const random = Math.random();
    return Math.floor(random * diff + min);
};
describe("GET /passenger", () => {
    test("invalid data", async () => {
        const response = await supertest_1.default(app_1.default.callback()).get(`/v1/passengers?page=gf&size=gfg`);
        expect(response.status).toBe(400);
    });
    test("page not found", async () => {
        const response = await supertest_1.default(app_1.default.callback()).get("/v1/passengers/?page=2&size=700");
        expect(response.status).toBe(404);
    });
    test("It responds with an array of Passengers with given page and size", async () => {
        const response = await supertest_1.default(app_1.default.callback()).get("/v1/passengers/?page=1&size=10");
        const dats = fs.readFileSync(path_1.default.join(__dirname, "../passenger.json"), "utf8");
        const arrayOfObjects = JSON.parse(dats);
        const data_size = arrayOfObjects.passengers_data.length;
        const curr_index1 = createRandom(0, response.body.data.length - 1);
        const curr_index2 = createRandom(0, response.body.data.length - 1);
        const v1 = arrayOfObjects.passengers_data[curr_index1].name;
        const v2 = arrayOfObjects.passengers_data[curr_index2]._id;
        expect(response.body.data.length).toBe(data_size);
        expect(response.body.data[curr_index2]).toHaveProperty("_id");
        expect(response.body.data[curr_index2]).toHaveProperty("name");
        expect(response.body.data[curr_index2]).toHaveProperty("trips");
        expect(response.body.data[curr_index2]).toHaveProperty("airline");
        expect(response.statusCode).toBe(200);
        expect(response.body.data[curr_index2]._id).toBe(v2);
        expect(response.body.data[curr_index1].name).toBe(v1);
    });
});
describe("POST /passenger", () => {
    test("It responds with message of successful creation of passenger", async () => {
        const response3 = await supertest_1.default(app_1.default.callback()).get("/v1/passengers/?page=1&size=500");
        const curr_size = response3.body.data.length;
        const response = await supertest_1.default(app_1.default.callback())
            .post("/v1/passenger")
            .send({
            name: "Undertaker",
            trips: 82431212,
            airline: {
                id: 69999,
                name: "Deutsche Lufthansa AG",
                country: "India",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lufthansa_Logo_2018.svg/300px-Lufthansa_Logo_2018.svg.png",
                slogan: "Say yes to the world",
                head_quaters: "Cologne, Germany",
                website: "lufthansa.com",
                established: "1953",
            },
        })
            .set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        const response2 = await supertest_1.default(app_1.default.callback()).get("/v1/passengers/?page=1&size=500");
        const dats = fs.readFileSync(path_1.default.join(__dirname, "../passenger.json"), "utf8");
        const arrayOfObjects = JSON.parse(dats);
        const data_size = arrayOfObjects.passengers_data.length;
        expect(response2.body.data.length).toBe(curr_size + 1);
        expect(response2.statusCode).toBe(200);
        expect(response2.body.data[data_size - 1].name).toBe("Undertaker");
    });
});
describe("PUT /task", () => {
    test("It responds with message of successful updation", async () => {
        const response3 = await supertest_1.default(app_1.default.callback()).get("/v1/passengers/?page=1&size=10");
        const dats = fs.readFileSync(path_1.default.join(__dirname, "../passenger.json"), "utf8");
        const arrayOfObjects = JSON.parse(dats);
        const curr_data_size = arrayOfObjects.passengers_data.length;
        expect(response3.body.data.length).toBe(curr_data_size);
        const curr_index = createRandom(0, response3.body.data.length - 1);
        const curr = response3.body.data[curr_index];
        const idd = curr._id;
        const response = await supertest_1.default(app_1.default.callback())
            .put(`/v1/passenger/${idd}`)
            .send({
            name: "BIG_HULK PURPLE",
            trips: 79,
        })
            .set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        const response2 = await supertest_1.default(app_1.default.callback()).get("/v1/passengers/?page=1&size=500");
        expect(response2.statusCode).toBe(200);
        expect(response2.body.data.length).toBe(response3.body.data.length);
        expect(response2.body.data[curr_index].name).toBe("BIG_HULK PURPLE");
        expect(response2.body.data[curr_index].trips).toBe(79);
        expect(response2.body.data[curr_index]._id).toBe(`${idd}`);
    });
});
