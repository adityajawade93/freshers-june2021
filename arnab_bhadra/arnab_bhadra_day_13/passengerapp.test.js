const {app}=require("./index");
const supertest = require('supertest');
const passengerApp=supertest(app.callback());

describe('GET API test', ()=>{
    beforeAll(async ()=>{
        const response = await passengerApp.get("/v1/passengers?page=0&size=10");
        
    });
    test('GET passenger info',async()=>{
        
        const response = await passengerApp.get("/v1/passengers?page=0&size=10");
        expect(response.status).toEqual(200);
    }); 
    test('GET Invalid page number error',async ()=>{
        const response = await passengerApp.get("/v1/passengers?page=110&size=10");
        expect(response.status).toEqual(406);
        expect(response.text).toEqual("Page Number overflow");
    });
    test('GET Invalid URL error',async ()=>{
        const response = await passengerApp.get("/v1/1234?page=110&size=10");
        expect(response.status).toEqual(404);
        expect(response.text).toEqual("Page Not Found");
    });
    test('GET Invalid URL error',async ()=>{
        const response = await passengerApp.delete("/v1/passengers?page=110&size=10");
        expect(response.status).toEqual(404);
        expect(response.text).toEqual("Page Not Found");
    });

});

describe('Create new Passenger Info',()=>{
    test('create new Passenger',async ()=>{
        const newPassenger={
             "name": "Arnab Kumar Bhadra",
            "trips": 1111,
            "airline": [
                {
                    "_id": "5ef4a09eaab384a021750ce7",
                    "id": 12,
                    "name": "Sri Lankan Airways",
                    "country": "Sri Lanka",
                    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png",
                    "slogan": "From Sri Lanka",
                    "head_quaters": "Katunayake, Sri Lanka",
                    "website": "www.srilankaairways.com",
                    "established": "1990",
                
                }
            ]
        }
        const response  = await passengerApp.post("/v1/passengers").send(newPassenger);
        const id=response.text.split(":")[1];
        //console.log(id);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(" New Passenger Info Created Successfully with id :"+id);

    });

    test("GET invaild input error while creating new passenger with invalid data",async ()=>{
        const response  = await passengerApp.post("/v1/passengers").send({"invalid data":"I"});
        expect(response.status).toEqual(400);
        expect(response.text).toEqual("Invalid Input");
    });

});


describe("Update passenger information",()=>{
    var id =-1;
    beforeAll(async ()=>{
        const newPassenger={
            "name": "Demo user",
           "trips": 1111,
           "airline": [
               {
                   
                   "id": 12,
                   "name": "Sri Lankan Airways",
                   "country": "Sri Lanka",
                   "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png",
                   "slogan": "From Sri Lanka",
                   "head_quaters": "Katunayake, Sri Lanka",
                   "website": "www.srilankaairways.com",
                   "established": "1990",
               
               }
           ]
       }
       const response  = await passengerApp.post("/v1/passengers").send(newPassenger);
       id=response.text.split(":")[1];
       //console.log(id);
    });
    test("Update Passenger Successfully", async ()=>{
        const updatedPassenger={"name": "Demo updated user",
        "trips": 1765}
        const response  = await passengerApp.put("/v1/passengers/"+id).send(updatedPassenger);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("Update Successfully");
    });
    test("Passenger Not found", async ()=>{
        const updatedPassenger={"name": "Demo updated user",
        "trips": 1765}
        const response  = await passengerApp.put("/v1/passengers/12345678").send(updatedPassenger);
        expect(response.status).toEqual(204);
    });
    test("Invalid input data", async ()=>{
        const response  = await passengerApp.put("/v1/passengers/"+id).send("1234");
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("Nothing Updated");
    });
    test(" Not proper Data",async ()=>{
        const response  = await passengerApp.put("/v1/passengers/"+id).send({"invalid":"data"});
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("Nothing Updated");
    });

});