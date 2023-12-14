from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import query_database, update_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)


class UserUpdate(BaseModel):
    user_id: str
    update_content: str


class ChangeVisibility(BaseModel):
    user_id: str
    course_id: str
    visibility: bool


@router.post("/edit_intro")
def edit_intro(useri: UserUpdate):
    try:
        update_database(
            f'''
            UPDATE USER
            SET self_introduction = {useri.update_content}
            WHERE student_id = {useri.user_id}
            '''
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()

# separate FB and IG into two posts


@router.post("/edit_contact/FB")
def edit_FB_contact(useri: UserUpdate):
    try:
        update_database(
            f'''
            UPDATE CONTACT
            SET fb_account = {useri.update_content}
            WHERE user_id = {useri.user_id}
            '''
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/edit_contact/IG")
def edit_IG_contact(useri: UserUpdate):
    try:
        update_database(
            f'''
            UPDATE CONTACT
            SET ig_account = {useri.update_content}
            WHERE user_id = {useri.user_id}
            '''
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/edit_name")
def edit_name(useri: UserUpdate):
    try:
        update_database(
            f'''
            UPDATE USER
            SET name = {useri.update_content}
            WHERE student_id = {useri.user_id}
            '''
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.get("/enrolled_courses/{student_id}")
def enrolled_course(student_id: str):
    courses = query_database(
        f"""
        SELECT TC.course_id , C.course_name
        FROM TAKE_COURSE AS TC
        JOIN COURSE AS C ON C.course_id = TC.course_id
        WHERE TC.user_ID = '{student_id}'
        """
    )
    return ok_respond({
        "courses": courses[["course_ID", "course_name"]].values.tolist()
    })


@router.get("/joined_groups/{student_id}")
def joined_groups(student_id: str):
    groups = query_database(
        f"""
        SELECT JG.group_id , SG.group_name , COUNT(*) AS group_member, capacity , course_name , semester
        FROM STUDY_GROUP SG
        JOIN COURSE AS C ON SG.course_id = C.course_id
        JOIN JOIN_GROUP AS JG ON JG.group_id = SG.group_id AND user_id = "{student_id}" AND JG.join_status = "Join"
        GROUP BY JG.group_id
        """)
    return ok_respond({
        "groups": groups[["group_ID", "group_name", "group_member", "capacity", "course_name", "semester"]].values.tolist()
    })


@router.get("/waiting_groups/{student_id}")
def waiting_groups(student_id: str):
    groups = query_database(
        f"""
        SELECT JG.group_id , SG.group_name , COUNT(*) AS group_member, capacity, course_name, semester
        FROM STUDY_GROUP SG
        JOIN COURSE AS C ON SG.course_id = C.course_id
        JOIN JOIN_GROUP AS JG ON JG.group_id = SG.group_id AND user_id = "{student_id}" AND JG.join_status = "Waiting"
        GROUP BY JG.group_id
        """)
    return ok_respond({
        "groups": groups[["group_ID", "group_name", "group_member", "capacity", "course_name", "semester"]].values.tolist()
    })


@router.get("/left_groups/{student_id}")
def waiting_groups(student_id: str):
    groups = query_database(
        f"""
        SELECT JG.group_id , SG.group_name , COUNT(*) AS group_member, capacity, course_name, semester
        FROM STUDY_GROUP SG
        JOIN COURSE AS C ON SG.course_id = C.course_id
        JOIN JOIN_GROUP AS JG ON JG.group_id = SG.group_id AND user_id = "{student_id}" AND JG.join_status = "Leave"
        GROUP BY JG.group_id
        """)
    return ok_respond({
        "groups": groups[["group_ID", "group_name", "group_member", "capacity", "course_name", "semester"]].values.tolist()
    })


@router.post("/change_visibility")
def change_visibility(cv: ChangeVisibility):
    try:
        r = update_database(
            f'''
            UPDATE TAKE_COURSE
            SET display_on_introduction = {1 if cv.visibility else 0}
            WHERE user_id = "{cv.user_id}" AND course_id = "{cv.course_id}"
            '''
        )
        if r == 0:
            raise BaseException("Invalid target")
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()
