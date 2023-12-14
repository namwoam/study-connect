from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import query_database, update_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/info",
    tags=["info"],
    responses={404: {"description": "Not found"}},
)


@router.get("/user/{student_id}")
def student_info(student_id: str):
    student_info = query_database(
        f'''
        SELECT U.student_id, U.student_name , U.self_introduction, D.department_ID , D.department_name , C.ig_account AS ig , C.fb_account AS fb
        FROM USER AS U
        JOIN CONTACT AS C ON U.student_id = C.user_id
        LEFT JOIN DEPARTMENT AS D ON D.department_ID = U.department_ID
        WHERE student_id = "{student_id}"
        ''')
    print(student_info)
    if len(student_info) == 0:
        return ok_respond({})
    return ok_respond({
        "student_id": student_info["student_ID"].to_list()[0],
        "student_name": student_info["student_name"].to_list()[0],
        "self_introduction": student_info["self_introduction"].to_list()[0],
        "department_id": student_info["department_ID"].to_list()[0],
        "department_name": student_info["department_name"].to_list()[0],
        "ig": student_info["ig"].to_list()[0],
        "fb": student_info["fb"].to_list()[0]
    })

@router.get("/department/{department_id}")
def department_info(department_id:str):
    department_info = query_database(
        f'''
        SELECT d.department_id, d.department_name, c.course_id
        FROM DEPARTMENT AS D
        JOIN COURSE AS C ON C.department_id = d.department_id
        WHERE D.department_id = "{department_id}"
        '''
    )
    return ok_respond({
        "department_id": department_info["department_ID"].to_list()[0],
        "department_name": department_info["department_name"].to_list()[0],
        "offer_courses": department_info["course_ID"].tolist()
    })



@router.get("/instructor/{instructor_id}")
def instructor_info(instructor_id: str):
    instructor_info = query_database(
        f'''
        SELECT i.instructor_id, i.instructor_name, OF.course_id
        FROM INSTRUCTOR AS i
        JOIN OFFER_COURSE AS OF ON OF.instructor_id = i.instructor_id
        WHERE i.instructor_id = "{instructor_id}"
        '''
    )
    return ok_respond({
        "instructor_id": instructor_info["instructor_ID"].to_list()[0],
        "instructor_name": instructor_info["instructor_name"].to_list()[0],
        "offer_courses": instructor_info["course_ID"].tolist()
    })


@router.get("/course/{course_id}")
def course_info(course_id: str):
    course_info = query_database(
        f'''
        SELECT c.course_id, of.instructor_id, c.course_name, c.semester,
        c.department_id, i.instructor_name, department_name
        FROM COURSE as c
        JOIN OFFER_COURSE as of ON c.course_id = of.course_id
        JOIN INSTRUCTOR as i ON of.instructor_id = i.instructor_id
        LEFT JOIN Department as D ON d.department_id = c.department_id
        WHERE c.course_id = "{course_id}";
        '''
    )
    # print(course_info)
    return ok_respond({
        "course_id": course_info["course_ID"].tolist()[0],
        "course_name": course_info["course_name"].tolist()[0],
        "semester": course_info["semester"].tolist()[0],
        "instructor_id": course_info["instructor_ID"].tolist()[0],
        "instructor_name": course_info["instructor_name"].tolist()[0],
        "department_id": course_info["department_ID"].tolist()[0],
        "department_name": course_info["department_name"].tolist()[0],
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
    # print(group_info)
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
