set search_path to school

create table students(
	studentid uuid default uuid_generate_v4() primary key,
	fname text not null,
	lname text null,
	bdate date not null
);
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
