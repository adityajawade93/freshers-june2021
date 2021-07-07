
create schema school;
set search_path to school;


create table student(
	studentID varchar(255) not null primary key,
	name text not null,
	gender char not null,
	phone varchar(255) null,
);

create table class( 
	classID varchar(255) not null primary key,
	room varchar(255) not null
);

create table subject(
	subjectID varchar(255) not null primary key,
	name text not null
);

create table teacher(
	teacherID varchar(255) not null primary key,
	name text not null,
	sex char not null,
	phone varchar(255)
);

create table studies_in(
	studentID varchar(255) primary key,
	classID varchar(255),

	foreign key (studentID) references student(studentID),
	foreign key (classID) references class(classID)

);

create table having_subject(
	classID varchar(255),
	subjectID varchar(255),

	foreign key (classID) references class(classID),
	foreign key (subjectID) references subject(subjectID)
);

create table takes(
	teacherID varchar(255),
	subjectID varchar(255),

	foreign key (teacherID) references teacher(teacherID),
	foreign key (subjectID) references subject(subjectID)	

);


create table result(
	studentID varchar(255),
	subjectID varchar(255),

	marks int not null,

	foreign key (studentID) references student(studentID),
	foreign key (subjectID) references subject(subjectID)
);


