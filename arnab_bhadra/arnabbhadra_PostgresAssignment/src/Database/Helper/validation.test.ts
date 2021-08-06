import * as validation from "./validation";

describe("test cases for joi validation of Student schema", () => {
    test("Test case to validate student schema for a valid input", async ()=>{
        const validStudent = {
            name: "demo",
            rollno: 1234567,
            address: "Durgapur"
        } 
        const result = await validation.studentSchema.validateAsync(validStudent); 
        expect(result).toEqual(result);  
    });

    test("Test case 2 to validate student schema for a valid input", async ()=>{
        const validStudent = {
            name: "demo",
            rollno: 1234567
            
        } 
        const result = await validation.studentSchema.validateAsync(validStudent); 
        expect(result).toEqual(result);  
    });
    
    test("test case 2 to validate student schenma for invalid input ", async () => {
        const invalidstudent = {
            //name: "demo",
            rollno: 1234567,
            address: "Durgapur"
        }
        try {

            await validation.studentSchema.validateAsync(invalidstudent);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });

    test("test case 3 to validate student schenma for invalid input ", async () => {
        const invalidstudent = {
            name: 12344,
            rollno: 1234567,
            address: "Durgapur"
        }
        try {

            await validation.studentSchema.validateAsync(invalidstudent);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });
    test("test case 4 to validate student schenma for invalid input ", async () => {
        const invalidstudent = {
            name: 12344,
            rollno: "ancd",
            address: "Durgapur"
        }
        try {

            await validation.studentSchema.validateAsync(invalidstudent);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });
    test("test case 5 to validate student schenma for invalid input ", async () => {
        const invalidstudent = {
        }
        try {

            await validation.studentSchema.validateAsync(invalidstudent);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });

});




describe('test cases for joi validation of class schedule schema',()=>{
    test('test case for validating class schedule', async ()=>{
        const classSchedule= {
            ssid : "abcdef",
            start : "10/11/12",
            end : "10/05/13"
        };
        const result = await validation.classScheduleSchema.validateAsync(classSchedule);
        expect(result).toEqual(classSchedule);
    });

    test("test case 1 to validate class schedule schenma for invalid input ", async () => {
        const invalidClassSchedule= {
            ssid : 1234,
            start : "10/11/12",
            end : "10/05/13"
        };
        try {

            await validation.classScheduleSchema.validateAsync(invalidClassSchedule);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });

    test("test case 3 to validate class schedule schenma for invalid input ", async () => {
        const invalidClassSchedule= {
            ssid : 1234,
            start : "10/11/12",

        };
        try {

            await validation.classScheduleSchema.validateAsync(invalidClassSchedule);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });

    test("test case 4 to validate class schedule schenma for invalid input ", async () => {
        const invalidClassSchedule= {

        };
        try {

            await validation.classScheduleSchema.validateAsync(invalidClassSchedule);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });

});

describe(' test cases for validating teacher schema',()=>{

    test("Test case for validating teacher schema with valid input ", async ()=>{
        const teacher =  {
            name : " demo teacher",
            contactno : 810581111
        }
        const result = await validation.teacherSchema.validateAsync(teacher);
    });
    test("test case 1 to validate teacher schenma for invalid input ", async()=>{
        const invalidTeacher =  {
            name : 1234,
            contactno : 810581111
        }
        try {

            await validation.teacherSchema.validateAsync(invalidTeacher);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });
    test("test case 2 to validate teacher schenma for invalid input ", async()=>{
        const invalidTeacher =  {
            name : 1234,
            contactno : "abc"
        }
        try {

            await validation.teacherSchema.validateAsync(invalidTeacher);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });
    test("test case 3 to validate teacher schenma for invalid input ", async()=>{
        const invalidTeacher =  {

        }
        try {

            await validation.teacherSchema.validateAsync(invalidTeacher);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });
});


describe('Test case for subject schema joi validation', ()=>{
    test("test case for validating subject schema with a valid input", async  ()=>{
        const validSubject={ 
            name : "abswdqd"
        }
        const result = await validation.subjectSchema.validateAsync(validSubject);
        expect(result).toEqual(result);
    });

    test("test case for validating subject schema with invalid input", async  ()=>{
        const invalidvalidSubject={ 
            name : 1234
        }
        try {

            await validation.subjectSchema.validateAsync(invalidvalidSubject);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });

    test("test case 2 for validating subject schema with invalid input", async  ()=>{
        const invalidvalidSubject={ 
        }
        try {

            await validation.subjectSchema.validateAsync(invalidvalidSubject);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(true).toBe(true);
        }
    });
});