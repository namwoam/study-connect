from fastapi import APIRouter
from ..db import query_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/course",
    tags=["courses"],
    responses={404: {"description": "Not found"}},
)


@router.get("/list_groups/{course_id}")
def list_groups(course_id: str):
    groups = query_database(
        f"""
        SELECT SG.group_id , SG.group_name , capacity , 
            CASE WHEN members IS NULL THEN 0 ELSE members END AS count
        FROM STUDY_GROUP SG
        LEFT JOIN (
            SELECT JG.group_id , COUNT(*) AS members
            FROM JOIN_GROUP AS JG
            JOIN STUDY_GROUP AS SG ON JG.group_id = SG.group_id
            WHERE SG.course_id = "{course_id}" AND JG.join_status = "Join"
            GROUP BY JG.group_id
        )AS C ON C.group_id = SG.group_id
        WHERE SG.group_status = "In_progress" AND SG.course_id = "{course_id}"
        """)
    return ok_respond({
        "groups": groups.values.tolist()
    })


@router.get("/list_students/{course_id}")
def list_students(course_id: str):
    users = query_database(
        f"""
        SELECT user_id FROM TAKE_COURSE
        WHERE course_id = "{course_id}"
        """)
    return ok_respond({
        "students": users["user_ID"].unique().tolist()
    })
