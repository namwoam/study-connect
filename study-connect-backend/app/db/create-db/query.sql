SELECT v1,
    COUNT(*) AS occurrences
FROM (
        SELECT user1_id AS v1
        FROM IS_FRIEND_OF
        UNION ALL
        SELECT user2_id AS v2
        FROM IS_FRIEND_OF
    ) AS combined_columns
GROUP BY v1
ORDER BY COUNT(*) DESC;