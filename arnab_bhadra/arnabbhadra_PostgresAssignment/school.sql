CREATE SCHEMA school;
SET search_path TO school;

CREATE TABLE student(
	sid TEXT PRIMARY KEY,
	sname TEXT NOT NULL,
	rollno INT NOT NULL,
	address TEXT
);

CREATE TABLE teacher(
	tid TEXT PRIMARY KEY,
	tname TEXT NOT NULL,
	specialzation TEXT,
	contactno INT NOT NULL
);


CREATE TABLE subject(
	suid TEXT PRIMARY KEY,
	sname TEXT NOT NULL,
	tid TEXT ,
	alternatetid TEXT
);

CREATE TABLE resultTable(
	sid TEXT,
	ssid TEXT,
	mark DECIMAL(3,2) NOT NULL,
	PRIMARY KEY (sid,ssid)
); 
DROP TABLE classschedule;
CREATE TABLE classschedule (
	cid TEXT,
	ssid TEXT,
	starttime TEXT,
	endtime TEXT,
	PRIMARY KEY (cid)
);


CREATE TABLE studentclass (
	sid TEXT,
	cid TEXT,
	PRIMARY KEY (sid,cid)
);


ALTER TABLE subject ADD FOREIGN KEY (tid) REFERENCES teacher(tid);
ALTER TABLE resultTable ADD FOREIGN KEY (sid) REFERENCES student(sid);
ALTER TABLE resultTable ADD FOREIGN KEY (ssid) REFERENCES subject(suid);
ALTER TABLE classschedule ADD FOREIGN KEY (ssid) REFERENCES subject(suid);
ALTER TABLE studentclass ADD FOREIGN KEY (sid) REFERENCES student(sid);
ALTER TABLE studentclass ADD FOREIGN KEY (cid) REFERENCES classschedule(cid);


SELECT DISTINCT s.sid, s.sname,s.rollno,s.address
FROM student s JOIN studentclass sc ON s.sid = sc.sid AND cid ='saqe-dwqd-ddd-asd';


SELECT DISTINCT s.sid, s.sname,s.rollno,s.address
FROM student s JOIN studentclass sc ON s.sid = sc.sid JOIN classschedule cs ON sc.cid = cs.cid WHERE cs.ssid = 'qwwe-dwd-asdsad';

SELECT DISTINCT s.sid, s.sname,s.rollno,s.address
FROM student s ,  studentclass sc, classschedule cs, subject su
WHERE s.sid = sc.sid AND sc.cid = cs.cid AND cs.ssid = su.suid AND tid='1';

SELECT * FROM school.classschedule;
INSERT INTO student VALUES ('jasdisd-askjwqnd-sss','Avo',1234,'A 46 Durgapur');
          	
INSERT INTO teacher VALUES ('abgedbdw-askjwqnd-sss','Jeet','CS',789456123);

INSERT INTO subject VALUES ('qwwe-dwd-asdsad','DAA','abgedbdw-askjwqnd-sss',NULL);

INSERT INTO classschedule VALUES ('saqe-dwqd-ddd-asd','qwwe-dwd-asdsad','10','12');

