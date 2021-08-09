CREATE SCHEMA school;
SET search_path TO school;

CREATE TABLE student(
	sid VARCHAR(50) PRIMARY KEY,
	sname VARCHAR(50) NOT NULL,
	rollno INT NOT NULL,
	address VARCHAR(100)
);

CREATE TABLE teacher(
	tid VARCHAR(50) PRIMARY KEY,
	tname VARCHAR(50) NOT NULL,
	specialzation VARCHAR(100),
	contactno INT NOT NULL
);


CREATE TABLE subject(
	suid VARCHAR(50) PRIMARY KEY,
	sname VARCHAR(50) NOT NULL,
	tid VARCHAR(50) ,
	alternatetid VARCHAR(50)
);

CREATE TABLE resultTable(
	sid VARCHAR(50),
	ssid VARCHAR(50),
	mark DECIMAL(3,2) NOT NULL,
	PRIMARY KEY (sid,ssid)
); 
DROP TABLE classschedule;
CREATE TABLE classschedule (
	cid VARCHAR(50),
	ssid VARCHAR(50),
	starttime VARCHAR(50),
	endtime VARCHAR(50),
	PRIMARY KEY (cid)
);


CREATE TABLE studentclass (
	sid VARCHAR(50),
	cid VARCHAR(50),
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

