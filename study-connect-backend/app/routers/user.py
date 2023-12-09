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
    update: str  # 要更新的內容


@router.post("/edit_intro")
def edit_intro(useri: UserUpdate):
    try:
        update_database(
            f'''
            UPDATE USER
            SET self_introduction = {useri.update}
            WHERE student_id = {useri.user_id}
            '''
        )
    except BaseException as err:
        return HTTPException(status_code=404, detail="No request found")
    return ok_respond()

# separate FB and IG into two posts


@router.post("/edit_contact/FB")
def edit_FB_contact(useri: UserUpdate):
    try:
        update_database(
            f'''
            UPDATE CONTACT
            SET fb_account = {useri.update}
            WHERE user_id = {useri.user_id}
            '''
        )
    except BaseException as err:
        return HTTPException(status_code=404, detail="No request found")
    return ok_respond()


@router.post("/edit_contact/IG")
def edit_IG_contact(useri: UserUpdate):
    try:
        update_database(
            f'''
            UPDATE CONTACT
            SET ig_account = {useri.update}
            WHERE user_id = {useri.user_id}
            '''
        )
    except BaseException as err:
        return HTTPException(status_code=404, detail="No request found")
    return ok_respond()


@router.post("/edit_name")
def edit_name(useri: UserUpdate):
    try:
        update_database(
            f'''
            UPDATE USER
            SET name = {useri.update}
            WHERE student_id = {useri.user_id}
            '''
        )
    except BaseException as err:
        return HTTPException(status_code=404, detail="No request found")
    return ok_respond()
