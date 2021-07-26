create schema myschool;
set search_path to myschool;

create type sex as enum('male','female','others');

create table students(studentId int not null primary key,
					  name varchar(40) not null ,
					  dob date not null,
					 gender sex null);
					 
insert into students values('1','anurag','1997-02-04','male');
insert into students values('2','niti','1999-02-06','female');
insert into students values('3','ayog','1998-02-07','male');
insert into students values('4','anupma','1995-02-06','female');
insert into students values('5','chirag','1997-05-04','male');
insert into students values('6','rahul','1987-05-08','male');
insert into students values('7','kaaju','1996-02-08','female');
insert into students values('8','jaggu','1997-07-23','female');
insert into students values('9','prince','1997-05-13','male');
insert into students values('10','yash','2000-02-04','male');

create table teachers(teacherId int not null primary key,
					teacher_fname varchar(40) not null,
					teacher_lname varchar(40) null,
					 gender sex null 
					 );
					 
insert into teachers values('1','rajesh','verma','male');
insert into teachers values('2','parmanand','verma','male');
insert into teachers values('3','kuldeep','raj','male');
insert into teachers values('4','nirupma','singh','female');
insert into teachers values('5','abhishek','maurya','female');

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
					 subject_name varchar(30) not null
					);

insert into subject values('1','data structure');
insert into subject values('2','c++');
insert into subject values('3','javaScript');
insert into subject values('4','java');
insert into subject values('5','python');


select * from subject;

create table class_schedule(cls_Id int PRIMARY KEY NOT NULL,
							subjId int NOT NULL,
							subject_name varchar(30) NOT NULL,
							teach_Id int NOT NULL,
							teacher_fname varchar(40) NOT NULL);
							
insert into Class_schedule values('101','1','data strucure','1','rajesh');
insert into Class_schedule values('102','2','c++','5','abhishek');
insert into Class_schedule values('103','5','python','2','parmanand');
insert into Class_schedule values('104','4','java','3','kuldeep');
insert into Class_schedule values('105','3','javaScript','4','nirupma');

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
