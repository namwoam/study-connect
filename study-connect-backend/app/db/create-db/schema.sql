-- Table 1: USER
CREATE TABLE USER (
    student_ID CHAR(9) PRIMARY KEY NOT NULL,
    name VARCHAR(20) NOT NULL,
    self_introduction VARCHAR(300),
    department CHAR(20) REFERENCES DEPARTMENT(dep_ID) NOT NULL
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Table 2: CONTACT
CREATE TABLE CONTACT (
    user_ID CHAR(9) PRIMARY KEY REFERENCES USER(student_ID) NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    ig_account VARCHAR(20),
    fb_account VARCHAR(20)
);

-- Table 3: DEPARTMENT
CREATE TABLE DEPARTMENT (
    department_ID CHAR(20) PRIMARY KEY NOT NULL,
    department_name VARCHAR(20) NOT NULL
);

-- Table 4: INSTRUCTOR
CREATE TABLE INSTRUCTOR (
    instructor_ID INT PRIMARY KEY NOT NULL,
    instructor_name VARCHAR(20) NOT NULL,
    department_ID VARCHAR(20) REFERENCES DEPARTMENT(dep_ID) NOT NULL
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Table 5: IS_FRIEND_OF
CREATE TABLE IS_FRIEND_OF (
    user1_ID CHAR(9) PRIMARY KEY REFERENCES USER(student_ID) NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    user2_ID CHAR(9) PRIMARY KEY REFERENCES USER(student_ID) NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    confirm_status VARCHAR(11) NOT NULL CHECK (confirm_status IN ('Agree', 'Disagree', 'Unconfirmed', 'Unfriend'))
);

-- Table 6: COURSE
CREATE TABLE COURSE (
    course_ID CHAR(20) PRIMARY KEY NOT NULL,
    course_name VARCHAR(20) NOT NULL,
    semester CHAR(5) NOT NULL
);

-- Table 7: TAKE_COURSE
CREATE TABLE TAKE_COURSE (
    user_ID CHAR(9) REFERENCES USER(student_ID) PRIMARY KEY NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    course_ID CHAR(20) REFERENCES COURSE(course_ID) PRIMARY KEY NOT NULL
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    grade VARCHAR(2) NOT NULL DEFAULT 'I' CHECK (grade IN ('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F', 'W', 'I1')),
    display_on_introduction BOOLEAN DEFAULT FALSE
);

-- Table 8: OFFER_COURSE
CREATE TABLE OFFER_COURSE (
    instructor_ID INT REFERENCES USER(student_ID) PRIMARY KEY NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    course_ID CHAR(20) REFERENCES COURSE(course_ID) PRIMARY KEY NOT NULL
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Table 9: GROUP
CREATE TABLE GROUP (
    group_ID INT PRIMARY KEY NOT NULL,
    group_name VARCHAR(20) NOT NULL,
    group_status VARCHAR(11) NOT NULL CHECK (group_status IN ('In progress', 'Finished', 'Deleted')),
    capacity INT NOT NULL,
    creator_ID CHAR(9) REFERENCES USER(student_ID) NOT NULL
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    course_ID CHAR(20) REFERENCES COURSE(course_ID) NOT NULL
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Table 10: JOIN_GROUP
CREATE TABLE JOIN_GROUP (
    group_ID INT REFERENCES GROUP(group_ID) PRIMARY KEY NOT NULL
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    user_ID CHAR(9) REFERENCES USER(student_ID) PRIMARY KEY NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    join_status VARCHAR(5) NOT NULL CHECK (join_status IN ('Join', 'Leave', 'Waiting')),
    role CHAR(6) NOT NULL DEFAULT 'Member' CHECK (role IN ('Member', 'Leader')),
    job VARCHAR(15),
);

-- Table 11: ANNOUNCEMENT
CREATE TABLE ANNOUNCEMENT (
    group_ID INT REFERENCES GROUP(group_ID) PRIMARY KEY NOT NULL
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    publisher_ID CHAR(9) REFERENCES USER(student_ID) PRIMARY KEY NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    publish_time TIMESTAMP PRIMARY KEY NOT NULL,
    content VARCHAR(200) NOT NULL
);

-- Table 12: MEET
CREATE TABLE MEET (
    meet_ID INT PRIMARY KEY REFERENCES MEET(meet_ID) NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    user_ID CHAR(9) PRIMARY KEY REFERENCES USER(student_ID) NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    available_from TIMESTAMP PRIMARY KEY NOT NULL,
    available_to TIMESTAMP PRIMARY KEY NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table 13: MEET_AVAILABLE_TIME
CREATE TABLE MEET_AVAILABLE_TIME (
    meet_ID INT REFERENCES MEET(meet_ID) PRIMARY KEY NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    user_ID CHAR(9) REFERENCES USER(student_ID) PRIMARY KEY NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    available_from TIMESTAMP PRIMARY KEY NOT NULL,
    available_to TIMESTAMP PRIMARY KEY NOT NULL
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
