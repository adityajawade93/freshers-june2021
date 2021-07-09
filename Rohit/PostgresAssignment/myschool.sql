create schema myschool;
set search_path to myschool;

create table students(studentId int not null primary key,
					  name text not null ,
					  dob date not null,
					 gender char null);
					 
insert into students values('1','anurag','1997-02-04','M');
insert into students values('2','niti','1999-02-06','F');
insert into students values('3','ayog','1998-02-07','M');
insert into students values('4','anup','1995-02-06','M');
insert into students values('5','chirag','1997-05-04','M');
insert into students values('6','rahul','1987-05-08','M');
insert into students values('7','kaaju','1996-02-08','F');
insert into students values('8','jaggu','1997-07-23','F');
insert into students values('9','prince','1997-05-13','M');
insert into students values('10','yash','2000-02-04','M');

create table teachers(teacherId int not null primary key,
					teacher_fname text not null,
					teacher_lname text not null,
					 gender char 
					 );
					 
insert into teachers values('1','rajesh','verma','M');
insert into teachers values('2','parmanand','verma','M');
insert into teachers values('3','kuldeep','raj','M');
insert into teachers values('4','nirupma','singh','F');
insert into teachers values('5','abhishek','maurya','M');

create table classes(classId int not null,
				   stId int not null,
				   primary key(classId,stId)
				  );

				  
insert into classes values('101','1');
insert into classes values('102','1');
insert into classes values('104','2');
insert into classes values('105','2');
insert into classes values('103','3');
insert into classes values('101','3');
insert into classes values('102','4');
insert into classes values('103','4');
insert into classes values('104','5');
insert into classes values('105','5');
insert into classes values('101','6');
insert into classes values('102','6');
insert into classes values('103','7');
insert into classes values('104','7');
insert into classes values('105','8');
insert into classes values('101','8');
insert into classes values('102','9');
insert into classes values('103','9');
insert into classes values('103','10');
insert into classes values('104','10');

create table subject(subjectId int not null primary key,
					 subject_name text not null
					);

insert into subject values('1','ds');
insert into subject values('2','c++');
insert into subject values('3','js');
insert into subject values('4','java');
insert into subject values('5','python');


select * from subject;

create table class_schedule(cls_Id int PRIMARY KEY NOT NULL,
							classno int NOT NULL,
							subjId int UNIQUE NOT NULL,
							subject_name text NOT NULL,
							teach_Id int UNIQUE NOT NULL,
							teacher_fname text NOT NULL);
							
insert into Class_schedule values('101','1','4','oops','1','rajesh');
insert into Class_schedule values('102','2','2','algorithm','5','abhishek');
insert into Class_schedule values('103','3','5','cpp','2','parmanand');
insert into Class_schedule values('104','4','1','data structure','3','kuldeep');
insert into Class_schedule values('105','5','3','networks','4','nirupma');

select * from class_schedule;

create table result(
					studentid int not null,
					class_Id int not null,
					subject_Id int not null,
					marks int ); 
					 
insert into result values('2','104','1','100');
insert into result values('5','104','1','99');
insert into result values('7','104','1','98');
insert into result values('10','104','1','97');
insert into result values('1','102','2','96');
insert into result values('4','102','2','95');
insert into result values('6','102','2','94');
insert into result values('9','102','2','93');
insert into result values('3','105','3','92');
insert into result values('5','105','3','91');
insert into result values('8','105','3','90');
insert into result values('10','105','3','89');
insert into result values('1','101','4','88');
insert into result values('3','101','4','87');
insert into result values('6','101','4','86');
insert into result values('8','101','4','85');
insert into result values('2','103','5','84');
insert into result values('4','103','5','83');
insert into result values('7','103','5','82');
insert into result values('9','103','5','81');	
	  
alter table classes add foreign key (stId) references students(studentId);
alter table class_schedule add foreign key (teach_Id) references teachers(teacherId);
alter table class_schedule add foreign key (subjId) references subject(subjectId);
alter table classes add foreign key (classId) references class_schedule(cls_Id);
alter table result add foreign key (class_Id) references class_schedule(cls_Id);


alter table result add foreign key(studentid) references students(studentId);
alter table result add foreign key(subject_Id) references subject(subjectId);
alter table subject add foreign key (subjectId) references teachers(teacherId);
