SELECT c.course_id,
    c.course_name,
    c.semester,
    COALESCE (g.total_groups, 0) AS total_groups,
    COALESCE (u.total_students, 0) AS total_students
FROM course c
    LEFT JOIN (
        SELECT course_id,
            COUNT (group_id) AS total_groups
        FROM STUDY_GROUP
        GROUP BY course_id
    ) g ON c.course_id = g.course_id
    LEFT JOIN (
        SELECT course_id,
            COUNT (user_id) AS total_students
        FROM take_course
        GROUP BY course_id
    ) u ON c.course_id = u.course_id