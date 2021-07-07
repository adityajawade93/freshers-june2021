CREATE TABLE student(
st_id VARCHAR(50) NOT NULL PRIMARY KEY,
fname TEXT NOT NULL,
lname TEXT NOT NULL,
age INT NULL,
cl_no INT NOT NULL
);

CREATE TABLE classes(
cl_no INT NOT NULL,
sub_id VARCHAR(50) NOT NULL,
teacher_id VARCHAR(50) NOT NULL,
PRIMARY KEY(cl_no,sub_id)
);


CREATE TABLE teacher(
teacher_id VARCHAR(50) NOT NULL PRIMARY KEY,
fname TEXT NOT NULL,
lname TEXT NOT NULL,
age INT NULL
);

CREATE TABLE subject(
sub_id VARCHAR(50) NOT NULL PRIMARY KEY,
sub_name TEXT NOT NULL,
cl_no INT NOT NULL,
teacher_id VARCHAR(50) NOT NULL
);



CREATE TABLE teaches(
teacher_id VARCHAR(50) NOT NULL,
sub_id VARCHAR(25) NOT NULL,
PRIMARY KEY(teacher_id,sub_id )
);

DROP TABLE teaches;

CREATE TABLE marks(
st_id VARCHAR(50) NOT NULL,
sub_id VARCHAR(50) NOT NULL,
marks DECIMAL(10,3) NOT NULL,
teacher_id VARCHAR(50) NOT NULL,
cl_no INT NOT NULL

);

ALTER TABLE marks ADD PRIMARY KEY (st_id,sub_id);

-- INsert into marks values($1,$2,$3,$4,$5);
DELETE FROM marks WHERE st_id = '123457';
SELECT * FROM marks;
-- INsert into student values($1,$2,$3,$4,$5);
-- INsert into classes values($1,$2,$3);
INSERT INTO teacher VALUES($1,$2,$3,$4);
-- INsert into subject values($1,$2,$3,$4);
-- alter table teaches Add primary key (cl_no;


SELECT *FROM teaches;


ALTER TABLE classes ADD FOREIGN KEY(sub_id) REFERENCES subject(sub_id);
ALTER TABLE teaches ADD FOREIGN KEY(teacher_id) REFERENCES teacher(teacher_id);

ALTER TABLE teaches ADD FOREIGN KEY(sub_id) REFERENCES subject(sub_id);


-- alter table student add FOREIGN key(cl_no) references classes;
-- 
-- alter table student add FOREIGN key(cl_no) references classes;
-- 
-- alter table marks add FOREIGN key(st_id) references student(st_id);
-- 
-- alter table marks add FOREIGN key(sub_id) references subject(sub_id);

-- alter table marks add FOREIGN key(teacher_id) references teacher(teacher_id);
-- 
-- alter table marks add FOREIGN key(cl_no) references classes(cl_no);


-- List of all Student - with pagination 
SELECT * FROM student LIMIT 5;

-- List of all Teachers
SELECT *FROM teacher;

--List of all teachers associated with any subject
SELECT t1.teacher_id,t1.fname,t1.lname,t1.age,t2.sub_name,t2.cl_no FROM
teacher AS t1 INNER JOIN subject AS t2 ON t1.teacher_id=t2.teacher_id;



-- List of all Classes
SELECT *FROM classes;

SELECT c.cl_no,c.sub_id,c.teacher_id,t.fname,t.lname,s.sub_name 
FROM classes AS c INNER JOIN teacher AS t ON c.teacher_id=t.teacher_id
INNER JOIN subject AS s ON s.sub_id=c.sub_id
ORDER BY c.cl_no;

-- List of all Subject
SELECT *FROM subject;

-- List of all student Given classId

SELECT * FROM student WHERE cl_no=11;

-- List of all student Given TeacherId

SELECT s1.st_id,s1.fname,s1.lname,s1.age,s1.cl_no FROM student AS s1
WHERE s1.cl_no IN (SELECT DISTINCT cl_no FROM subject AS sub WHERE teacher_id='222222');


-- List of all student Given SubjectId

SELECT s1.fname,s1.lname,s1.cl_no,s1.age,sub.sub_id,sub.sub_name
FROM subject AS sub,student AS s1
WHERE sub.sub_id='105060' 
AND sub.cl_no=s1.cl_no; 



-- List of all subject marks given studentId

SELECT s.fname,s.lname,s.cl_no,m1.marks
FROM marks AS m1,student AS s
WHERE m1.st_id='123457' 
AND s.st_id= m1.st_id;


-- List of highest mark per subject given class and subject should return student info
-- select s.st_id,s.fname from student as s inner join
-- (select marks.sub_id from marks  group by sub_id) as b
-- on s.st_id=b.st_id;

-- select MAX(marks),sub_id
-- from marks 
-- group by sub_id
-- order by sub_id;

// List of highest mark per subject and return student info

SELECT concat(s1.fname,' ',s1.lname)AS student_name,s1.age AS student_age,s1.cl_no AS class_no,maxa.sub_id,sub1.sub_name,maxa.marks AS highest_marks,maxa.teacher_id,concat(t1.fname,' ',t1.lname) AS teacher_name
FROM student AS s1
INNER JOIN
(SELECT m.st_id,m.sub_id,m.marks,m.cl_no,m.teacher_id
FROM marks AS m
INNER JOIN (
SELECT MAX(marks) AS maximum,(sub_id)
FROM marks 
GROUP BY sub_id
ORDER BY sub_id
)maxmarks
ON maxmarks.maximum=m.marks)maxa
ON maxa.st_id=s1.st_id
INNER JOIN subject AS sub1
ON maxa.sub_id=sub1.sub_id
INNER JOIN teacher AS t1
ON t1.teacher_id=maxa.teacher_id
ORDER BY highest_marks DESC;




-- select st_id from 


-- (select * from marks where exists
-- (select sub_id,max(marks) as Max_marks
-- from marks
-- group by sub_id));


-- SELECT * FROM student;
-- SELECT * FROM teacher;
-- SELECT *FROM subject;
-- SELECT * FROM teaches;
-- delete from subject
-- where sub_id = '8d0rghceokqi9xw71';

// List of top 10 scores(sum all subject), studentInfo grouped by class, subject. Should be in descending order of score.

SELECT s1.st_id AS student_id,Concat(s1.fname,' ',s1.lname)AS student_name,s1.age AS student_age,s1.cl_no AS class_no,total.total_marks FROM student AS s1
INNER JOIN
(SELECT st_id,sum(marks)AS total_marks
FROM marks
GROUP BY st_id
LIMIT 10)total
ON total.st_id=s1.st_id
ORDER BY total.total_marks DESC;
