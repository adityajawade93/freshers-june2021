create schema myschool;
set search_path to myschool;

create table students(s_id int not null primary key,
					  s_name text not null ,
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

create table teachers(t_id int not null primary key,
					t_fname text not null,
					t_lname text not alter tablegender char 
					 );
					 
insert into teachers values('1','rajesh','verma','M');
insert into teachers values('2','parmanand','verma','M');
insert into teachers values('3','kuldeep','raj','M');
insert into teachers values('4','nirupma','singh','F');
insert into teachers values('5','abhishek','maurya','M');

create table classes(cls_id int not null,
				   st_id int not null,
				   primary key(cls_id,st_id)
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

create table subject(sub_id int not null primary key,
					 sub_name text not null
					);

insert into subject values('1','ds');
insert into subject values('2','c++');
insert into subject values('3','js');
insert into subject values('4','java');
insert into subject values('5','python');


select * from subject;

create table class_schedule(classid int PRIMARY KEY NOT NULL,
							classno int NOT NULL,
							subj_id int UNIQUE NOT NULL,
							subj_name text NOT NULL,
							tch_id int UNIQUE NOT NULL,
							tch_fname text NOT NULL);
							
insert into Class_schedule values('101','1','4','oops','1','rajesh');
insert into Class_schedule values('102','2','2','algorithm','5','abhishek');
insert into Class_schedule values('103','3','5','cpp','2','parmanand');
insert into Class_schedule values('104','4','1','data structure','3','kuldeep');
insert into Class_schedule values('105','5','3','networks','4','nirupma');

select * from class_schedule;

create table result(result_id int primary key not null,
					studentid int not null,
					clas_id int not null,
					subjectid int not null,
					marks int ); 
					 
insert into result values('1001','2','104','1','100');
insert into result values('1002','5','104','1','99');
insert into result values('1003','7','104','1','98');
insert into result values('1004','10','104','1','97');
insert into result values('1005','1','102','2','96');
insert into result values('1006','4','102','2','95');
insert into result values('1007','6','102','2','94');
insert into result values('1008','9','102','2','93');
insert into result values('1009','3','105','3','92');
insert into result values('10010','5','105','3','91');
insert into result values('10011','8','105','3','90');
insert into result values('10012','10','105','3','89');
insert into result values('10013','1','101','4','88');
insert into result values('10014','3','101','4','87');
insert into result values('10015','6','101','4','86');
insert into result values('10016','8','101','4','85');
insert into result values('10017','2','103','5','84');
insert into result values('10018','4','103','5','83');
insert into result values('10019','7','103','5','82');
insert into result values('10020','9','103','5','81');	
	  
alter table classes add foreign key (st_id) references students(s_id);
alter table class_schedule add foreign key (tch_id) references teachers(t_id);
alter table class_schedule add foreign key (subj_id) references subject(sub_id);
alter table classes add foreign key (cls_id) references class_schedule(classid);
alter table result add foreign key (clas_id) references class_schedule(classid);


alter table result add foreign key(studentid) references students(s_id);
alter table result add foreign key(subjectid) references subject(sub_id);
alter table subject add foreign key (sub_id) references teachers(t_id);