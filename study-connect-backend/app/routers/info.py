from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import query_database, update_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/info",
    tags=["info"],
    responses={404: {"description": "Not found"}},
)


@router.post("/user/info/{student_id}")
def student_info(student_id: str):
    student_info = query_database(
        f'''
        SELECT u.student_id, u.self_introduction, u.department, c.ig_accoung, c.fb_account
        FROM USER AS u, CONTACT AS c
        WHERE student_id = "{student_id}" AND u.student_id = c.student_id
        ''')
    return ok_respond({
        "student": student_info["student_id"].unique().tolist()
    })

@router.post("/instructor/info/{instructor_id}")
def instructor_info(instructor_id: str):
    instructor_info = query_database(
        f'''
        SELECT i.instructor_id, i.instructor_name
        FROM INSTRUCTOR as i
        WHERE i.instructor_id = "{instructor_id}"
        '''
    )
    return ok_respond({
        "instructor": instructor_info["instructor_id"].unique().tolist()
    })

@router.post("/course/info/{course_id}")
def course_info(course_id: str):
    course_info = query_database(
        f'''
        SELECT c.course_id, of.instructor_id, c.course_name, c.semester, i.department_id
        FROM COURSE as c
        JOIN OFFER_COURSE as of ON c.course_id = of.course_id
        JOIN INSTRUCTOR as i ON of.instructor_id = i.instructor_id
        WHERE c.course_id = "{course_id}";
        '''
    )
    return ok_respond({
        "course": course_info["course_id"].unique().tolist()
    })
