SELECT U.name,
    I.instructor_name,
    course_name,
    COUNT(*)
FROM USER AS U
    JOIN TAKE_COURSE AS TC ON TC.user_ID = U.student_ID
    JOIN COURSE AS C ON C.course_ID = TC.course_ID
    JOIN OFFER_COURSE AS OC ON OC.course_ID = C.course_ID
    JOIN INSTRUCTOR AS I ON I.instructor_ID = OC.instructor_ID
GROUP BY U.student_ID,
    I.instructor_ID