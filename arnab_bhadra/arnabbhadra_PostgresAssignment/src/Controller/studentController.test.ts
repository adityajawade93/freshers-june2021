import { app } from "./../Application/app";
import supertest from 'supertest';
import * as message from "../Middleware/message";
const educationApp = supertest(app.callback());

describe('Test cases to test students API for fetching Students\' information', () => {
    test('API Test to get all the studests with valid page and size', async () => {
        const response: any = await educationApp.get('/student?page=0&size=1');
        
        expect(response.status).toBe(200);
    });
    test('API Test to get all the studests with invalidvalid page and size', async () => {
        const response: any = await educationApp.get('/student?page=100000000&size=500');

        expect(response.status).toBe(406);
    });
    test('API Test 2 to get all the studests with invalidvalid page and size', async () => {
        const response: any = await educationApp.get('/student?page=abc&size=2');

        expect(response.status).toBe(406);
    });
});

describe('Test cases API to fetch student information by student id', () => {
    const studentId = 'a7853177-2887-4dd3-b537-c7486b97f4c5';
    test("API Test for retrieving valid student information", async () => {
        const response: any = await educationApp.get('/student/' + studentId)
        expect(response.status).toEqual(200);
        expect(response.body[0].sid).toEqual(studentId);
        expect(response.body.length).toEqual(1);
    });
    const invalidStudentId = 'kqwe1233'
    test("API Test for retrieving student information using invalid student id", async () => {
        const response: any = await educationApp.get('/student/' + invalidStudentId)
        expect(response.status).toEqual(404);
    });
});

describe('Test cases API to fetch student information by teacher id', () => {
    const teacherId = 'abgedbdw-askjwqnd-sss';
    test("API Test for retrieving valid student information by teacher id", async () => {
        const response: any = await educationApp.get('/student/teacher/' + teacherId)
        expect(response.status).toEqual(200);


    });
    const invalidteachertId = "eiugudbhbfduyegf";
    test("API Test for retrieving student information using invalid teacher id", async () => {
        const response: any = await educationApp.get('/student/teacher/' + invalidteachertId)
        expect(response.status).toEqual(404);

    });
});

describe('Test cases API to fetch student information by class id', () => {
    const classId = 'saqe-dwqd-ddd-asd';
    test("API Test for retrieving valid student information by class id ", async () => {
        const response: any = await educationApp.get('/student/class/' + classId)
        expect(response.status).toEqual(200);
        expect(response.body.length > 0).toEqual(true);

    });
    const invalidClassId = "12eer3c33";
    test("API Test for retrieving student information using invalid class id", async () => {
        const response: any = await educationApp.get('/student/class/' + invalidClassId)
        expect(response.status).toEqual(404);

    });
});


describe('Test cases API to fetch topper by subject', () => {
    const subjectId: string = 'qwwe-dwd-asdsad';
    test("API Test for fetching topper of subject by subject id ", async () => {
        const response: any = await educationApp.get('/result/' + subjectId + '/topper' )
        expect(response.status).toEqual(200);
        expect(response.body.length > 0).toEqual(true);
        

    });
    const invalidSubjectId = "12eer3c33";
    test("API Test forfetching topper of subject by invalid subject id", async () => {
        const response: any = await educationApp.get('/result/' + invalidSubjectId + '/topper')
        expect(response.status).toEqual(404);

    });
});


describe('Test cases API to fetch toppers',()=>{
    test('Test case to fetch first n toppers for valid number',async ()=>{
        const noOfToppers= "2";
        const response : any = await educationApp.get('/result/topper/'+noOfToppers);
        expect(response.body.length> 0 && response.body.length<=noOfToppers).toBe(true);
        expect(response.status).toEqual(200);
    });
    test('Test case to fetch first n toppers for invalid input',async ()=>{
        const noOfToppers= "acs";
        const response : any = await educationApp.get('/result/topper/:id'+noOfToppers);
        
        expect(response.status).toEqual(404);
    });
    test('Test case 2 to fetch first n toppers for zero input',async ()=>{
        const noOfToppers= "0";
        const response : any = await educationApp.get('/result/topper/:id'+noOfToppers);
        
        expect(response.status).toEqual(404);
    });
});


describe("Test case API for inserting new student information",()=>{
    test(' test case for inserting new student information', async ()=>{
        const newStudent ={
            name : "new student",
            rollno : 768924512,
            address : "Kolkata"
        }
        const response = await educationApp.post("/student").send(newStudent);
        expect(response.text).toEqual("Data inserted successfully");
        expect(response.status).toEqual(200);
    });

    test(' test case 2 for inserting new student information', async ()=>{
        const newStudent ={
            name : "new student 2 ",
            rollno : 567924512,
            
        }
        const response = await educationApp.post("/student").send(newStudent);
        expect(response.text).toEqual("Data inserted successfully");
        expect(response.status).toEqual(200);
    });

    test(' test case 1 for inserting invalid student information', async ()=>{
        const newStudent ={
            name : 1234567,
            rollno : 567924512,
            address : "Kolkata"
        }
        const response = await educationApp.post("/student").send(newStudent);
        expect(response.text).toEqual(message.invalidInputMessage);
        expect(response.status).toEqual(406);
    });

    test(' test case 2 for inserting invalid student information', async ()=>{
        const newStudent ={
            name : 1234567,
            address : "Kolkata"
        }
        const response = await educationApp.post("/student").send(newStudent);
        expect(response.text).toEqual(message.invalidInputMessage);
        expect(response.status).toEqual(406);
    });
});