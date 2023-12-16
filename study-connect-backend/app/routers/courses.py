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
        SELECT JG.group_id , SG.group_name , COUNT(*) AS group_member , capacity
        FROM STUDY_GROUP SG
        JOIN JOIN_GROUP AS JG ON JG.group_id = SG.group_id AND course_id = "{course_id}" AND JG.join_status = "Join"
        WHERE SG.group_status = "In_progress"
        GROUP BY JG.group_id
        """)
    return ok_respond({
        "groups": groups[["group_ID", "group_name", "group_member" , "capacity"]].values.tolist()
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
