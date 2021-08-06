import * as subjectModel from "./SubjectModel";
import * as uuid from 'uuid';
import {Subject} from "./Subject";

describe('Test cases for Subject model database operations', ()=>{
    test('Test case for fetching subjects information', async ()=>{
        const subjectsInformation = await subjectModel.getSubjectInfo();
        expect(subjectsInformation.length>0).toBe(true);
    });
    test('Test case for fetching no of subjects',async ()=>{
        const noOfSubjects = await subjectModel.getNumberOfSubjects();
        expect(noOfSubjects[0].count>0).toBe(true);
    });

    test('Test case for inserting new Subject in subject table', async ()=>{
        const newSubject : Subject ={
            suid: uuid.v4(),
            sname: "Computer Science",
            tid: null,
            alternatetid: null
        };
        const subjectEntity = [newSubject.suid,newSubject.sname,newSubject.tid,newSubject.alternatetid];
        const response = await subjectModel.insertSubjectInfo(subjectEntity);
        expect(response).toStrictEqual([]);
    });


});