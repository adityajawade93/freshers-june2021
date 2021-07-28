CREATE SCHEMA College;
SET search_path TO College;
create type sex as enum('male','female','others');
CREATE TABLE Student(student_id int PRIMARY KEY NOT NULL,fname varchar(20) NOT NULL,mname varchar(20) NULL,lname varchar(20) NULL,dob date NOT NULL,gender sex NOT NULL,address varchar(50) NOT NULL);

CREATE TABLE Teacher(teacher_id int PRIMARY KEY NOT NULL,fname varchar(20) NOT NULL,mname varchar(20) NULL,lname varchar(20) NULL,dob date NOT NULL,gender sex NOT NULL,address varchar(50) NOT NULL);
   
  CREATE TABLE subject(subject_id int PRIMARY KEY NOT NULL,subject_name varchar(20) NOT NULL);
   
     CREATE TABLE Class_schedule(classid int PRIMARY KEY NOT NULL,classno int NOT NULL,subj_id int UNIQUE NOT NULL,subj_name varchar(20) NOT NULL,t_id int UNIQUE NOT NULL,t_fname varchar(20) NOT NULL);
   
    CREATE TABLE Class_student(class_id int NOT NULL,studid int NOT NULL,PRIMARY KEY(class_id,studid));
   
    CREATE TABLE Result(result_id int PRIMARY KEY NOT NULL,studentid int NOT NULL,clas_id int NOT NULL,subjectid int NOT NULL,marks smallint NOT NULL);  
   
   INSERT INTO Student values('1','sachin','ramesh','tendulkar','1967-08-11','male','lucknow');
      INSERT INTO Student values('2','akshita',NULL,'mahajan','1997-08-12','female','jammu');
     INSERT INTO Student values('3','mahinder','singh','dhoni','1987-12-31','male','ranchi');
     INSERT INTO Student values('4','kapil',NULL,'verma','1999-12-31','male','delhi');
     INSERT INTO Student values('5','nishaant','veer','dixit','2000-08-11','male','delhi');
      INSERT INTO Student values('6','masoom','raja','ansari','1997-11-11','male','kolkata');
    INSERT INTO Student values('7','aryant',NULL,'shukla','1998-04-21','male','kanpur');
      INSERT INTO Student values('8','shubhum','kumar','jha','1987-01-11','male','mumbai');
      INSERT INTO Student values('9','jyoti',NULL,'kumari','1991-10-13','female','srinagar');
      INSERT INTO Student values('10','aryan',NULL,'singh','1996-11-19','male','chandigarh');
     
      INSERT INTO Teacher values('1','ramesh','kumar','mishra','1967-08-11','male','allahabad');
      INSERT INTO Teacher values('2','narender',NULL,'singh','1972-11-11','male','lucknow');
      INSERT INTO Teacher values('3','nirupama',NULL,NULL,'1988-08-11','female','kolkata');
     INSERT INTO Teacher values('4','m','k','d','1981-08-11','male','chennai');
      INSERT INTO Teacher values('5','chiranjeev',NULL,'kumar','1977-08-11','male','bhopal');
     
      INSERT INTO subject values('1','data structure');
      INSERT INTO subject values('2','algorithm');
      INSERT INTO subject values('3','networks');
      INSERT INTO subject values('4','oops');
      INSERT INTO subject values('5','cpp');

      INSERT INTO Class_schedule values('101','1','4','oops','1','ramesh');
     INSERT INTO Class_schedule values('102','2','2','algorithm','5','chiranjeev');
      INSERT INTO Class_schedule values('103','3','5','cpp','2','narender');
      INSERT INTO Class_schedule values('104','4','1','data structure','3','nirupama');
   INSERT INTO Class_schedule values('105','5','3','networks','4','m');

      INSERT INTO Class_student values('101','1');
     INSERT INTO Class_student values('102','1');
      INSERT INTO Class_student values('103','2');
      INSERT INTO Class_student values('104','2');
     INSERT INTO Class_student values('105','3');
      INSERT INTO Class_student values('101','3');
      INSERT INTO Class_student values('102','4');
      INSERT INTO Class_student values('103','4');
      INSERT INTO Class_student values('104','5');
      INSERT INTO Class_student values('105','5');
      INSERT INTO Class_student values('101','6');
      INSERT INTO Class_student values('102','6');
      INSERT INTO Class_student values('103','7');
      INSERT INTO Class_student values('104','7');
      INSERT INTO Class_student values('105','8');
      INSERT INTO Class_student values('101','8');
      INSERT INTO Class_student values('102','9');
      INSERT INTO Class_student values('103','9');
      INSERT INTO Class_student values('104','10');
     INSERT INTO Class_student values('105','10');

       INSERT INTO Class_student values('101','1');
      INSERT INTO Class_student values('102','1');
      INSERT INTO Class_student values('103','2');
     INSERT INTO Class_student values('104','2');
      INSERT INTO Class_student values('105','3');
     INSERT INTO Class_student values('101','3');
      INSERT INTO Class_student values('102','4');
      INSERT INTO Class_student values('103','4');
      INSERT INTO Class_student values('104','5');
     INSERT INTO Class_student values('105','5');
     INSERT INTO Class_student values('101','6');
      INSERT INTO Class_student values('102','6');
      INSERT INTO Class_student values('103','7');
      INSERT INTO Class_student values('104','7');
      INSERT INTO Class_student values('105','8');
      INSERT INTO Class_student values('101','8');
      INSERT INTO Class_student values('102','9');
      INSERT INTO Class_student values('103','9');
      INSERT INTO Class_student values('104','10');
      INSERT INTO Class_student values('105','10');

      INSERT INTO result values('1001','2','104','1','100');
      INSERT INTO result values('1002','5','104','1','99');
      INSERT INTO result values('1003','7','104','1','98');
      INSERT INTO result values('1004','10','104','1','97');
      INSERT INTO result values('1005','1','102','2','96');
      INSERT INTO result values('1006','4','102','2','95');
      INSERT INTO result values('1007','6','102','2','94');
      INSERT INTO result values('1008','9','102','2','93');
      INSERT INTO result values('1009','3','105','3','92');
      INSERT INTO result values('10010','5','105','3','91');
      INSERT INTO result values('10011','8','105','3','90');
      INSERT INTO result values('10012','10','105','3','89');
      INSERT INTO result values('10013','1','101','4','88');
      INSERT INTO result values('10014','3','101','4','87');
      INSERT INTO result values('10015','6','101','4','86');
      INSERT INTO result values('10016','8','101','4','85');
      INSERT INTO result values('10017','2','103','5','84');
      INSERT INTO result values('10018','4','103','5','83');
      INSERT INTO result values('10019','7','103','5','82');
      INSERT INTO result values('10020','9','103','5','81');

      ALTER TABLE class_student ADD FOREIGN KEY (studid) REFERENCES Student(student_id);
      ALTER TABLE class_schedule ADD FOREIGN KEY (t_id) REFERENCES Teacher(teacher_id);
      ALTER TABLE Class_schedule ADD FOREIGN KEY (subj_id) REFERENCES Subject(subject_id);
      ALTER TABLE class_student ADD FOREIGN KEY(class_id) REFERENCES Class_schedule(classid);
      ALTER TABLE result ADD FOREIGN KEY(clas_id) REFERENCES Class_schedule(classid);
      ALTER TABLE result ADD FOREIGN KEY(studentid) REFERENCES Student(student_id);
      ALTER TABLE result ADD FOREIGN KEY(subjectid) REFERENCES Subject(subject_id);
      ALTER TABLE Subject ADD FOREIGN KEY (teach_id) REFERENCES Teacher(teacher_id);



