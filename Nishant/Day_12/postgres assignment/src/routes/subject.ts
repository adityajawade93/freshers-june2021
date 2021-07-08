import koarouter from '@koa/router';

const router=new koarouter();

import {getSubject, getStudentBySubjectId, getSubjectMarksByStudentId, addSubject} from '../controller/subject';

router.get('/subject',getSubject);

router.get('/subject/:subjectId/student',getStudentBySubjectId);

router.get('/student/:studentId/subject/marks',getSubjectMarksByStudentId);

router.post('/subject',addSubject);

export {router};

