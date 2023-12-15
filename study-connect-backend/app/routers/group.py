from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import query_database, update_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/group",
    tags=["groups"],
    responses={404: {"description": "Not found"}},
)


class AdminGroupAction(BaseModel):
    user: str
    group_id: str


class GroupAction(BaseModel):
    user: str
    group_name: str
    capacity: int
    course_id: str


class Announcement(BaseModel):
    user: str
    content: str
    group_id: str


class Meeting(BaseModel):
    user: str
    meet_name: str
    group_id: str
    start_time: str
    end_time: str


@router.post("/send_request")
def send_request(aga: AdminGroupAction):
    try:
        update_database(
            f"""
            INSERT OR IGNORE INTO JOIN_GROUP VALUES ('{aga.group_id}', '{aga.user}' , 'Waiting' , 'Member' , 'Undecided')
            """
        )
    except BaseException as err:
        print(err)
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/approve_request")
def approve_request(aga: AdminGroupAction):
    try:
        df = query_database(
            f"""
            SELECT COUNT(*) AS current , capacity
            FROM JOIN_GROUP AS JG
            JOIN STUDY_GROUP AS SG ON SG.group_id = JG.group_id
            WHERE SG.group_id = {aga.group_id} AND JG.join_status = "Join"
            GROUP BY JG.group_id
            """
        )
        current = df["current"].to_list()[0]
        capacity = df["capacity"].to_list()[0]
        assert current < capacity
        update_database(
            f"""
            UPDATE JOIN_GROUP
            SET join_status = "Join"
            WHERE group_id = "{aga.group_id}" AND user_id = "{aga.user}"
            """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/kick")
def kick(aga: AdminGroupAction):
    try:
        update_database(
            f"""
            UPDATE JOIN_GROUP
            SET join_status = "Leave"
            WHERE group_id = "{aga.group_id}" AND user_id = "{aga.user}"
            """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/create")
def create(ga: GroupAction):
    try:
        update_database(
            f"""
            INSERT INTO STUDY_GROUP (group_name,capacity,creator_ID,course_ID) VALUES ('{ga.group_name}' , '{ga.capacity}','{ga.user}' ,'{ga.course_id}')
            """
        )
    except BaseException as err:
        print(err)
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/announcement/create")
def announcement_create(a: Announcement):
    try:
        update_database(
            f"""
            INSERT OR IGNORE INTO ANNOUNCEMENT VALUES('{a.user}', '{a.content}', '{a.group_id}')
            """
        )
    except BaseException as err:
        print(err)
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/meeting/create")
def meeting_create(m: Meeting):
    try:
        update_database(
            f"""
            INSERT OR IGNORE INTO MEET () VALUES('{m.user}', '{m.meet_name}', '{m.group_id}', '{m.start_time}', '{m.end_time}')
            """
        )
    except BaseException as err:
        print(err)
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()
