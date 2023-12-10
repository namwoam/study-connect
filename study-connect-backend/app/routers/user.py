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
