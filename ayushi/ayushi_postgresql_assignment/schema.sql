CREATE DATABASE schoolDB;
CREATE SCHEMA SchoolSchema;
SET search_path TO SchoolSchema;
CREATE TYPE address AS (
	city VARCHAR(30),
	street VARCHAR(40)
);
CREATE DOMAIN gender VARCHAR(15) 
	CHECK (VALUE IN ('male','female','others'));

CREATE TABLE IF NOT EXISTS students (
	student_id INT PRIMARY KEY,
	student_name VARCHAR(40) NOT NULL,
	student_dob DATE NOT NULL,
	student_address address NOT NULL,
	student_gender gender NOT NULL,
	student_phone INT NOT NULL
);
CREATE TABLE IF NOT EXISTS teachers (
	teacher_id INT PRIMARY KEY,
	teacher_name VARCHAR(40) NOT NULL,
	teacher_dob DATE NOT NULL,
	teacher_address address NOT NULL,
	teacher_gender gender NOT NULL,
	teacher_phone INT NOT NULL
);
CREATE TABLE IF NOT EXISTS subjects (
	subject_id INT PRIMARY KEY,
	subject_name VARCHAR(40) NOT NULL
);
CREATE TABLE IF NOT EXISTS schedule (
	class_id SERIAL PRIMARY KEY,
	subject_id INT NOT NULL,
	teacher_id INT NOT NULL
);
CREATE TABLE IF NOT EXISTS student_class (
	student_id INT NOT NULL,
	class_id INT NOT NULL,
	PRIMARY KEY (student_id,class_id)
);
CREATE TABLE IF NOT EXISTS results (
	student_id INT NOT NULL,
	class_id INT NOT NULL,
	subject_id INT NOT NULL,
	marks FLOAT NOT NULL,
	PRIMARY KEY (student_id,class_id)
);
DROP TABLE student_class;
INSERT INTO students VALUES('1','Shruti Khanna', '1996-01-12',('Gwalior','Mahalgaon'),'female','6789999564');
INSERT INTO students VALUES('2','Sambhavi Rajput', '1997-01-12',('Shivpuri','32-lane'),'female','6788408564');
INSERT INTO students VALUES('3','Amit Kulkarni', '1998-07-11',('Mumbai','Tarine Drive Road'),'male','8282838964');
INSERT INTO students VALUES('4','Shivam Joshi', '1995-06-12',('Delhi','Karol Bagh'),'male','8363738484');
INSERT INTO students VALUES('5','Zara Larrsson', '1996-06-10',('Meerut','Maata Raani Marg'),'female','8568555632');
INSERT INTO students VALUES('6','Seema Sen', '1995-06-12',('New Delhi','Bhadur Shah Zafar Marg'),'female','875032484');
INSERT INTO students VALUES('7','Linda Ray', '1997-04-09',('Bhopal','Maharaj Pura'),'female','8784748440');
INSERT INTO students VALUES('8','Pulkit Shrivastava', '1998-03-02',('Indore','Sherpur lane'),'male','9474848700');
INSERT INTO students VALUES('9','Manoj Mathur', '1996-06-10',('Chennai','Bisht Chauraha'),'male','9875576346');
INSERT INTO students VALUES('10','Rita Bhatnagar', '1996-04-01',('Rampur','Ram Mandir lane'),'female','8864485875');

INSERT INTO teachers VALUES('1','Ram Shankar Sinha','1982-01-10',('Mathura','32-bylane berha marg'),'male','9867686901');
INSERT INTO teachers VALUES('2','Rohit Rai','1985-01-24',('Kolkata','Durga nagar lane'),'male','8575858590');
INSERT INTO teachers VALUES('3','Shiela Kumar Khare','1983-06-29',('Jaipur','ratinagar colony'),'female','8576686960');
INSERT INTO teachers VALUES('4','Sahil Rajawat','1984-02-28',('Jabalpur','rishi-ram nagar colony'),'male','9484647509');
INSERT INTO teachers VALUES('5','Ruchi Saxena','1981-05-11',('Lucknow','jagdish chandra bose colony'),'female','7364547470');

INSERT INTO subjects VALUES('1','Computer Organisation');
INSERT INTO subjects VALUES('2','Computer Networks');
INSERT INTO subjects VALUES('3','DBMS');
INSERT INTO subjects VALUES('4','Operating System');
INSERT INTO subjects VALUES('5','Network Programming');

INSERT INTO schedule VALUES('1','5','2');
INSERT INTO schedule VALUES('2','1','4');
INSERT INTO schedule VALUES('3','4','5');
INSERT INTO schedule VALUES('4','2','3');
INSERT INTO schedule VALUES('5','3','1');

INSERT INTO results VALUES('1','1','5','78');
INSERT INTO results VALUES('2','1','5','90');
INSERT INTO results VALUES('3','1','5','65');
INSERT INTO results VALUES('4','1','5','29');
INSERT INTO results VALUES('5','1','5','76');
INSERT INTO results VALUES('6','2','1','44');
INSERT INTO results VALUES('7','2','1','94');
INSERT INTO results VALUES('8','2','1','30');
INSERT INTO results VALUES('9','2','1','50');
INSERT INTO results VALUES('10','2','1','89');
INSERT INTO results VALUES('6','3','4','69');
INSERT INTO results VALUES('1','3','4','83');
INSERT INTO results VALUES('4','3','4','71');
INSERT INTO results VALUES('2','3','4','67');
INSERT INTO results VALUES('8','3','4','58');
INSERT INTO results VALUES('1','4','2','64');
INSERT INTO results VALUES('10','4','2','52');
INSERT INTO results VALUES('5','4','2','48');
INSERT INTO results VALUES('7','4','2','25');
INSERT INTO results VALUES('6','4','2','10');
INSERT INTO results VALUES('4','5','3','99');
INSERT INTO results VALUES('2','5','3','66');
INSERT INTO results VALUES('9','5','3','85');
INSERT INTO results VALUES('7','5','3','93');
INSERT INTO results VALUES('3','5','3','73');

ALTER TABLE schedule ADD FOREIGN KEY(subject_id) REFERENCES subjects(subject_id);
ALTER TABLE schedule ADD FOREIGN KEY(teacher_id) REFERENCES teachers(teacher_id);
ALTER TABLE results ADD FOREIGN KEY(subject_id) REFERENCES subjects(subject_id);
ALTER TABLE results ADD FOREIGN KEY(class_id) REFERENCES schedule(class_id);
ALTER TABLE results ADD FOREIGN KEY(student_id) REFERENCES students(student_id);

ALTER TABLE students 
ALTER COLUMN student_phone TYPE BIGINT
USING student_phone::bigint;

ALTER TABLE teachers 
ALTER COLUMN teacher_phone TYPE BIGINT
USING teacher_phone::bigint;

ALTER TABLE students 
ALTER COLUMN student_id TYPE SMALLINT
USING student_id::smallint;
ALTER TABLE teachers 
ALTER COLUMN teacher_id TYPE SMALLINT
USING teacher_id::smallint;
ALTER TABLE subjects 
ALTER COLUMN subject_id TYPE SMALLINT
USING subject_id::smallint;
ALTER TABLE schedule
ALTER COLUMN subject_id TYPE SMALLINT
USING subject_id::smallint;
ALTER TABLE schedule
ALTER COLUMN class_id TYPE SMALLINT
USING class_id::smallint;
ALTER TABLE schedule
ALTER COLUMN teacher_id TYPE SMALLINT
USING teacher_id::smallint;
ALTER TABLE student_class
ALTER COLUMN student_id TYPE SMALLINT
USING student_id::smallint;
ALTER TABLE student_class
ALTER COLUMN class_id TYPE SMALLINT
USING class_id::smallint;
ALTER TABLE results
ALTER COLUMN class_id TYPE SMALLINT
USING class_id::smallint;
ALTER TABLE results
ALTER COLUMN student_id TYPE SMALLINT
USING student_id::smallint;
ALTER TABLE results
ALTER COLUMN subject_id TYPE SMALLINT
USING subject_id::smallint;
