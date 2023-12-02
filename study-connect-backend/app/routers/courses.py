from fastapi import APIRouter
from ..db import query_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/course",
    tags=["courses"],
    responses={404: {"description": "Not found"}},
)


@router.get("/list_groups/{course_id}")
def requests(course_id: str):
    groups = query_database(
        f"""
        SELECT group_id FROM STUDY_GROUP
        WHERE course_id = "{course_id}"
        """)
    return ok_respond({
        "groups": groups["group_ID"].unique().tolist()
    })

@router.get("/list_students/{course_id}")
def requests(course_id: str):
    users = query_database(
        f"""
        SELECT user_id FROM TAKE_COURSE
        WHERE course_id = "{course_id}"
        """)
    return ok_respond({
        "students": users["user_ID"].unique().tolist()
    })


