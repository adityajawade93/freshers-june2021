import { validationPageAndPageSize } from "./Validation";
import {page} from "./Page";
describe("Test cases for validating query page and size",()=>{
    test('Test case One for valid page and size',()=>{
        const validPage : page = {page:0,size:10};
        const noOfRecords : number =10;
        const actualResult : any = validationPageAndPageSize(validPage,noOfRecords);
        expect(actualResult[0]).toBe(0);
        expect(actualResult[1]).toBe(10);
        expect(actualResult.length).toBe(2);
    });
    test('Test case two for valid page and size',()=>{
        const validPage : page = {page:1,size:2};
        const noOfRecords : number =10;
        const actualResult : any = validationPageAndPageSize(validPage,noOfRecords);
        expect(actualResult[0]).toBe(2);
        expect(actualResult[1]).toBe(4);
        expect(actualResult.length).toBe(2);        
    });
    test('Test case three for valid page and size',()=>{
        const validPage : page = {page:0,size:11};
        const noOfRecords : number =10;
        const actualResult : any = validationPageAndPageSize(validPage,noOfRecords);
        expect(actualResult[0]).toBe(0);
        expect(actualResult[1]).toBe(10);
        expect(actualResult.length).toBe(2);
    });
    test('Test case one for invalid page size',()=>{
        const invalidPage : page = {page:100,size:11};
        const noOfRecords : number =10;
        const actualResult : any = validationPageAndPageSize(invalidPage,noOfRecords);
        expect(actualResult).toBe(false);
    });
    test('Test case one for invalid page input type',()=>{
        const invalidPage : page = {page:1.24,size:100};
        const noOfRecords : number =10;
        const actualResult : any = validationPageAndPageSize(invalidPage,noOfRecords);
        expect(actualResult).toBe(false);
    });
});