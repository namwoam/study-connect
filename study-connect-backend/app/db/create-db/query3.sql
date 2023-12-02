SELECT U.student_ID,
    U.name,
    COUNT(*)
FROM USER AS U
    JOIN STUDY_GROUP AS G ON U.student_ID = G.creator_ID
GROUP BY U.student_ID
ORDER BY COUNT(*) DESC