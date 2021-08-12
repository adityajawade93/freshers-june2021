set search_path to school

create table students(
	studentid uuid default uuid_generate_v4() primary key,
	fname text not null,
	lname text null,
	bdate date not null
);

--> FIXME : add varchar
create table teachers(
	teacherid uuid default uuid_generate_v4() primary key,
	tfname text not null,
	tlname text null,
	tsubject text not null,
	joindate date not null
) 

create table standards(
	standard integer not null primary key
)

create table subjects(
	subjectid uuid default uuid_generate_v4() primary key,
	subname text unique
)

create table classes(
	cstudentid uuid not null,
	cstandard integer not null,
	primary key(cstudentid,cstandard)
)

create table sechdule(
	subjectname text not null,
	tid uuid not null,
	std integer not null,
	primary key (subjectname,tid,std)
	
)

create table results(
	rsid uuid not null,
	rstd integer not null,
	rsubject text not null,
	rmarks integer not null,
	primary key(rsid,rstd,rsubject)
)

insert into students(fname,lname,bdate) values('sujit','kumar','2000-09-11');
insert into students(fname,lname,bdate) values('matt','kumar','2001-07-11');
insert into students(fname,lname,bdate) values('sandeep','kumar','2002-09-11');
insert into students(fname,lname,bdate) values('john','kumar','2001-09-11');
insert into students(fname,lname,bdate) values('mike','kumar','2000-08-11');

insert into teachers(tfname,tlname,tsubject,joindate) values('chandler','bing','maths','2017-06-15');
insert into teachers(tfname,tlname,tsubject,joindate) values('joey','tribbiyani','physics','2017-06-17');     
insert into teachers(tfname,tlname,tsubject,joindate) values('rachel','green','chemistry','2017-06-18');
insert into teachers(tfname,tlname,tsubject,joindate) values('monica','geller','biology','2017-06-19');

insert into standards values('11');
insert into standards values('12');
insert into standards values('10');

insert into subjects(subname) values('physics');
insert into subjects(subname) values('chemistry');
insert into subjects(subname) values('biology');
insert into subjects(subname) values('maths');

select studentid from students

insert into classes values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','11');
insert into classes values('2011f090-4136-4494-9a05-aa5089ee050e','12');
insert into classes values('154052a8-77b4-4999-8877-36e3b107d3ad','10');
insert into classes values('0895241f-c654-4155-b766-5fc2b74a83e9','11');
insert into classes values('b90f12e8-6fb5-428c-b541-aba4700d4d03','12');

select * from teachers
insert into sechdule values('physics','38f8d099-143d-4db4-ac66-e9a89acebc48','11');
insert into sechdule values('chemistry','abb45dff-8887-442f-a386-3521b2549248','11');
insert into sechdule values('biology','df188cf2-0d03-4c8e-a8e6-11bddb5b5682','11');
insert into sechdule values('maths','d86da372-addb-4c24-92a1-0f6db14704f8','11');

insert into results values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','11','physics','100');
insert into results values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','11','chemistry','100');
insert into results values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','11','biology','100');
insert into results values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','11','maths','100');
insert into results values('0895241f-c654-4155-b766-5fc2b74a83e9','11','physics','100');
insert into results values('0895241f-c654-4155-b766-5fc2b74a83e9','11','chemistry','100');
insert into results values('0895241f-c654-4155-b766-5fc2b74a83e9','11','biology','100');


alter table teachers add foreign key(tsubject) references subjects(subname);
alter table sechdule add foreign key(subjectname) references subjects(subname);
alter table sechdule add foreign key(tid) references teachers(teacherid);
alter table sechdule add foreign key(std) references standards(standard);
alter table results add foreign key(rsid) references students(studentid);
alter table results add foreign key(rstd) references standards(standard);
alter table results add foreign key(rsubject) references subjects(subname);
alter table classes add foreign key(cstudentid) references students(studentid);
alter table classes add foreign key(cstandard) references standards(standard);


--> added changes

alter table sechdule
rename std to standard

alter table sechdule
rename tid to teacher_id

alter table standards
add column class_id uuid default uuid_generate_v4()

select * from standards

alter table standards
rename standard to class_level

alter table sechdule
rename standard to classid

drop table sechdule

create table sechdule(
	subjectname text not null,
	teacher_id uuid not null,
	classid uuid not null,
	primary key (subjectname,teacher_id,classid)
)

drop table results
drop table classes
drop table standards
drop table sechdule
drop table student_class

create table standards(
	class_id uuid default uuid_generate_v4(),
	class_level integer not null,
	primary key(class_id)	
)

create table student_class(
	cstudentid uuid not null,
	student_classid uuid not null,
	primary key(cstudentid,student_classid)
)


create table results(
	rstudent_id uuid not null,
	rstudent_class_id uuid not null,
	rsubject_id uuid not null,
	rmarks integer not null,
	primary key(rstudent_id,rstudent_class_id,rsubject_id)
)

drop table teachers

create table teachers(
	teacherid uuid default uuid_generate_v4() primary key,
	tfname text not null,
	tlname text null,
	tsubject_id uuid not null,
	joindate date not null
) 

insert into standards(class_level) values('11');
insert into standards(class_level) values('12');
insert into standards(class_level) values('10');


insert into teachers(tfname,tlname,tsubject_id,joindate) values('chandler','bing','200fb81a-ed09-4c04-a203-969772c6b143','2017-06-15');
insert into teachers(tfname,tlname,tsubject_id,joindate) values('joey','tribbiyani','c85f2e2d-4fd0-4309-8c62-8990c350d4fc','2017-06-17');     
insert into teachers(tfname,tlname,tsubject_id,joindate) values('rachel','green','a59d2473-edcb-4d40-8686-8810f444447b','2017-06-18');
insert into teachers(tfname,tlname,tsubject_id,joindate) values('monica','geller','272716e1-dacb-4d04-a951-d337069ecbe1','2017-06-19');

insert into student_class values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','b11416f8-1c5c-4366-ac89-4d8ce821eae3');
insert into student_class values('2011f090-4136-4494-9a05-aa5089ee050e','91d6b1f3-08e3-4a21-bba4-fd20ad6e6aa7');
insert into student_class values('154052a8-77b4-4999-8877-36e3b107d3ad','3632ae32-a0f1-48b1-903b-aac8de25541c');
insert into student_class values('0895241f-c654-4155-b766-5fc2b74a83e9','b11416f8-1c5c-4366-ac89-4d8ce821eae3');
insert into student_class values('b90f12e8-6fb5-428c-b541-aba4700d4d03','91d6b1f3-08e3-4a21-bba4-fd20ad6e6aa7');

insert into sechdule values('physics','ec883309-43f6-417e-8f4f-8b2dec27d182','b11416f8-1c5c-4366-ac89-4d8ce821eae3');
insert into sechdule values('chemistry','90e68fd8-4da4-44f8-9029-69fd88fcb10e','b11416f8-1c5c-4366-ac89-4d8ce821eae3');
insert into sechdule values('biology','2b5d4a47-7bd0-45c4-85c1-104ce99c14fc','b11416f8-1c5c-4366-ac89-4d8ce821eae3');
insert into sechdule values('maths','9360ef49-47d7-489e-94e9-2867ad886ff4','b11416f8-1c5c-4366-ac89-4d8ce821eae3');

insert into results values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','b11416f8-1c5c-4366-ac89-4d8ce821eae3','c85f2e2d-4fd0-4309-8c62-8990c350d4fc','100');
insert into results values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','b11416f8-1c5c-4366-ac89-4d8ce821eae3','a59d2473-edcb-4d40-8686-8810f444447b','98');
insert into results values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','b11416f8-1c5c-4366-ac89-4d8ce821eae3','272716e1-dacb-4d04-a951-d337069ecbe1','95');
insert into results values('56a6af4a-b323-450e-aaa0-04cfdab6fa59','b11416f8-1c5c-4366-ac89-4d8ce821eae3','200fb81a-ed09-4c04-a203-969772c6b143','91');
insert into results values('0895241f-c654-4155-b766-5fc2b74a83e9','b11416f8-1c5c-4366-ac89-4d8ce821eae3','c85f2e2d-4fd0-4309-8c62-8990c350d4fc','96');
insert into results values('0895241f-c654-4155-b766-5fc2b74a83e9','b11416f8-1c5c-4366-ac89-4d8ce821eae3','a59d2473-edcb-4d40-8686-8810f444447b','99');
insert into results values('0895241f-c654-4155-b766-5fc2b74a83e9','b11416f8-1c5c-4366-ac89-4d8ce821eae3','272716e1-dacb-4d04-a951-d337069ecbe1','93');

select * from students
select * from teachers
select * from student_class
select * from standards
select * from subjects
select * from sechdule
select * from results


alter table teachers add foreign key(tsubject_id) references subjects(subjectid);
alter table sechdule add foreign key(subjectname) references subjects(subname);
alter table sechdule add foreign key(teacher_id) references teachers(teacherid);
alter table sechdule add foreign key(classid) references standards(class_id);
alter table results add foreign key(rstudent_id) references students(studentid);
alter table results add foreign key(rstudent_class_id) references standards(class_id);
alter table results add foreign key(rsubject_id) references subjects(subjectid);
alter table student_class add foreign key(cstudentid) references students(studentid);
alter table student_class add foreign key(student_classid) references standards(class_id);

update student_class
set student_classid ='f7999045-09f8-455d-a655-a529a29b36dd'
where student_classid ='b11416f8-1c5c-4366-ac89-4d8ce821eae3'
select * from student_class
select * from standards
update student_class
set student_classid ='163d3f88-9926-403f-a10b-c79244c12599'
where student_classid ='91d6b1f3-08e3-4a21-bba4-fd20ad6e6aa7'
select * from student_class

update student_class
set student_classid ='a696be60-4e7a-4d09-acf8-eebaa6307c9e'
where student_classid ='3632ae32-a0f1-48b1-903b-aac8de25541c'

update results
set rstudent_class_id = 'f7999045-09f8-455d-a655-a529a29b36dd'
where rstudent_class_id ='b11416f8-1c5c-4366-ac89-4d8ce821eae3'

update sechdule
set classid = 'f7999045-09f8-455d-a655-a529a29b36dd'
where classid ='b11416f8-1c5c-4366-ac89-4d8ce821eae3'

alter table students
alter column fname type varchar(20),
alter column lname type varchar(20)

alter table teachers
alter column tfname type varchar(20),
alter column tlname type varchar(20)

delete from results where rstudent_id = '56a6af4a-b323-450e-aaa0-04cfdab6fa59' and rsubject_id ='c85f2e2d-4fd0-4309-8c62-8990c350d4fc';  
delete from teachers where tfname = 'ross';
delete from student_class where cstudentid ='035f2158-e850-4427-90f8-832b8effdfd5' and student_classid ='f7999045-09f8-455d-a655-a529a29b36dd';
delete from students where fname = 'lenerd';
delete from standards where class_level =9;
delete from sechdule where subjectname ='geology';
delete from subjects where subname = 'palentology';

