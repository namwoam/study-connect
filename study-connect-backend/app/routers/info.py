from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import query_database, update_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/info",
    tags=["info"],
    responses={404: {"description": "Not found"}},
)


@router.get("/user/info/{student_id}")
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


@router.get("/instructor/info/{instructor_id}")
def instructor_info(instructor_id: str):
    instructor_info = query_database(
        f'''
        SELECT i.instructor_id, i.instructor_name
        FROM INSTRUCTOR AS i
        WHERE i.instructor_id = "{instructor_id}"
        '''
    )
    return ok_respond({
        "instructor_id": instructor_info["instructor_ID"].to_list()[0],
        "instructor_name": instructor_info["instructor_name"].to_list()[0],
    })


@router.get("/course/info/{course_id}")
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


@router.get("/group/info/{group_id}")
def group_info(group_id: str):
    group_info = query_database(
        f"""
        SELECT SG.group_id , group_name , capacity , course_id , U.student_id , name , role , job
        FROM STUDY_GROUP AS SG
        JOIN JOIN_GROUP AS JG ON SG.group_id = JG.group_id AND SG.group_id = "{group_id}" AND JG.join_status = "Join"
        JOIN USER AS U ON JG.user_id = U.student_id
        """
    )
    course_name = query_database(
        f"""
        SELECT course_name
        FROM STUDY_GROUP AS SG
        JOIN COURSE AS C ON SG.course_id = C.course_id AND SG.group_id = "{group_id}"
        """
    )["course_name"].to_list()[0]
    announcements = query_database(
        f"""
        SELECT content
        FROM ANNOUNCEMENT AS A
        WHERE A.group_id = "{group_id}"
        """
    )["content"].to_list()
    meets_info = query_database(
        f"""
        SELECT *
        FROM MEET AS M
        WHERE M.group_id = "{group_id}"
        """
    )
    print(group_info)
    if len(group_info) == 0:
        return ok_respond({})
    return ok_respond({
        "group_id": group_info["group_ID"].to_list()[0],
        "group_name": group_info["group_name"].to_list()[0],
        "capacity": group_info["capacity"].to_list()[0],
        "course_id": group_info["course_ID"].to_list()[0],
        "course_name": course_name,
        "members": [{
            "student_id": group_info["student_ID"].to_list()[i],
            "name": group_info["name"].to_list()[i],
            "role": group_info["role"].to_list()[i],
            "job": group_info["job"].to_list()[i],
        }
            for i in range(len(group_info))],
        "announcements": announcements,
        "meets": [{
            "meet_id": meets_info["meet_ID"].to_list()[i],
            "meet_name": meets_info["meet_name"].to_list()[i],
            "start_time": meets_info["start_time"].to_list()[i],
            "end_time": meets_info["end_time"].to_list()[i]
        }
            for i in range(len(meets_info))],

    })
