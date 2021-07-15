
create schema school;
set search_path to school;


create table student(
	studentID varchar(20) not null primary key,
	name char(40) not null,
	gender enum('M','O','F') not null,
	phone varchar(10) null,
);

create table class( 
	classID varchar(10) not null primary key,
	room varchar(10) not null
);

create table subject(
	subjectID varchar(20) not null primary key,
	name char(40) not null
);

create table teacher(
	teacherID varchar(20) not null primary key,
	name char(40) not null,
	sex enum('M','F','O') not null,
	phone varchar(10)
);

create table studies_in(
	subjectID varchar(20),
	classID varchar(10)
	primary key(subjectID,classID)

	foreign key (studentID) references student(studentID),
	foreign key (classID) references class(classID)

);

create table having_subject(
	classID varchar(10),
	subjectID varchar(20),
	primary key (classID, subjectID)

	foreign key (classID) references class(classID),
	foreign key (subjectID) references subject(subjectID)
);

create table takes(
	teacherID varchar(20),
	subjectID varchar(20),

	foreign key (teacherID) references teacher(teacherID),
	foreign key (subjectID) references subject(subjectID)	

);


create table result(
	studentID varchar(20),
	subjectID varchar(20),

	marks tinyint not null,

	foreign key (studentID) references student(studentID),
	foreign key (subjectID) references subject(subjectID)
);


