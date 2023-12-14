-- Table 3: DEPARTMENT
CREATE TABLE DEPARTMENT (
    department_ID CHAR(20) PRIMARY KEY NOT NULL,
    department_name VARCHAR(20) NOT NULL
);
-- Table 1: USER
CREATE TABLE USER (
    student_ID CHAR(9) PRIMARY KEY NOT NULL,
    student_name VARCHAR(20),
    self_introduction VARCHAR(300),
    department_ID CHAR(20) NOT NULL,
    FOREIGN KEY (department_ID) REFERENCES DEPARTMENT(department_ID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
-- Table 2: CONTACT
CREATE TABLE CONTACT (
    user_ID CHAR(9) PRIMARY KEY NOT NULL,
    ig_account VARCHAR(20),
    fb_account VARCHAR(20),
    FOREIGN KEY (user_ID) REFERENCES USER(student_ID) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Table 4: INSTRUCTOR
CREATE TABLE INSTRUCTOR (
    instructor_ID INT PRIMARY KEY NOT NULL,
    instructor_name VARCHAR(20) NOT NULL
);
-- Table 5: IS_FRIEND_OF
CREATE TABLE IS_FRIEND_OF (
    user1_ID CHAR(9) NOT NULL,
    user2_ID CHAR(9) NOT NULL,
    confirm_status VARCHAR(11) NOT NULL CHECK (
        confirm_status IN ('Agree', 'Disagree', 'Unconfirm', 'Unfriend')
    ),
    PRIMARY KEY (user1_ID, user2_ID),
    FOREIGN KEY (user1_ID) REFERENCES USER(student_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user2_ID) REFERENCES USER(student_ID) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Table 6: COURSE
CREATE TABLE COURSE (
    course_ID CHAR(20) PRIMARY KEY NOT NULL,
    course_name VARCHAR(20) NOT NULL,
    semester CHAR(5) NOT NULL,
    department_ID VARCHAR(20)
);
-- Table 7: TAKE_COURSE
CREATE TABLE TAKE_COURSE (
    user_ID CHAR(9) NOT NULL,
    course_ID CHAR(20) NOT NULL,
    grade VARCHAR(2) DEFAULT 'I' CHECK (
        grade IN (
            'A+',
            'A',
            'A-',
            'B+',
            'B',
            'B-',
            'C+',
            'C',
            'C-',
            'F',
            'W',
            'I'
        )
    ),
    display_on_introduction BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_ID, course_ID),
    FOREIGN KEY (user_ID) REFERENCES USER(student_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_ID) REFERENCES COURSE(course_ID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
-- Table 8: OFFER_COURSE
CREATE TABLE OFFER_COURSE (
    instructor_ID INT NOT NULL,
    course_ID CHAR(20) NOT NULL,
    FOREIGN KEY (instructor_ID) REFERENCES INSTRUCTOR(instructor_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_ID) REFERENCES COURSE(course_ID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
-- Table 9: GROUP
CREATE TABLE STUDY_GROUP (
    group_ID INT PRIMARY KEY NOT NULL,
    group_name VARCHAR(20) NOT NULL,
    group_status VARCHAR(11) DEFAULT 'In progress' NOT NULL CHECK (
        group_status IN ('In_progress', 'Finished', 'Deleted')
    ),
    capacity INT NOT NULL,
    creator_ID CHAR(9) NOT NULL,
    course_ID CHAR(20) NOT NULL,
    FOREIGN KEY (creator_ID) REFERENCES USER(student_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_ID) REFERENCES COURSE(course_ID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
-- Table 10: JOIN_GROUP
CREATE TABLE JOIN_GROUP (
    group_ID INT NOT NULL,
    user_ID CHAR(9) NOT NULL,
    join_status VARCHAR(5) NOT NULL DEFAULT 'Waiting' CHECK (join_status IN ('Join', 'Leave', 'Waiting')),
    role CHAR(6) NOT NULL DEFAULT 'Member' CHECK (role IN ('Member', 'Leader')),
    job VARCHAR(15),
    PRIMARY KEY (group_ID, user_ID),
    FOREIGN KEY (group_ID) REFERENCES STUDY_GROUP(group_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_ID) REFERENCES USER(student_ID) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Table 11: ANNOUNCEMENT
CREATE TABLE ANNOUNCEMENT (
    group_ID INT NOT NULL,
    publisher_ID CHAR(9) NOT NULL,
    publish_time TIMESTAMP NOT NULL,
    content VARCHAR(200) NOT NULL,
    PRIMARY KEY (group_ID, publisher_ID, publish_time),
    FOREIGN KEY (group_ID) REFERENCES STUDY_GROUP(group_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (publisher_ID) REFERENCES USER(student_ID) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Table 12: MEET
CREATE TABLE MEET (
    meet_ID INT PRIMARY KEY NOT NULL,
    meet_name TEXT NOT NULL,
    group_ID INT NOT NULL,
    host_ID CHAR(9) NOT NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    vote_from TIMESTAMP,
    vote_to TIMESTAMP,
    FOREIGN KEY (group_ID) REFERENCES STUDY_GROUP(group_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (host_ID) REFERENCES USER(student_ID) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Table 13: MEET_AVAILABLE_TIME
CREATE TABLE MEET_AVAILABLE (
    meet_ID INT NOT NULL,
    user_ID CHAR(9) NOT NULL,
    available_from TIMESTAMP NOT NULL,
    available_to TIMESTAMP NOT NULL,
    PRIMARY KEY(meet_ID, user_ID, available_from, available_to),
    FOREIGN KEY (meet_ID) REFERENCES MEET(meet_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_ID) REFERENCES USER(student_ID) ON DELETE CASCADE ON UPDATE CASCADE
);