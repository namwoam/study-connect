from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import query_database, update_database
from ..utils import ok_respond
import datetime
router = APIRouter(
    prefix="/group",
    tags=["groups"],
    responses={404: {"description": "Not found"}},
)


class JoinGroupAction(BaseModel):
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
    start_time: datetime.datetime
    end_time: datetime.datetime


class EditGroupNameAction(BaseModel):
    group_id: str
    content: str


@router.post("/edit_name")
def edit_name(egna: EditGroupNameAction):
    try:
        update_database(
            f"""
            UPDATE STUDY_GROUP
            SET group_name = "{egna.content}"
            WHERE group_id = "{egna.group_id}" AND group_status = "In_progress"
            """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.get("/pending_request/{group_id}")
def pending_request(group_id: str):
    requests = query_database(f"""
        SELECT user_ID
        FROM JOIN_GROUP
        WHERE join_status = "Waiting" AND group_id = "{group_id}" AND group_status = "In_progress"
    """)
    return ok_respond({
        "requests": requests["user_ID"].to_list()
    })


@router.post("/send_request")
def send_request(jga: JoinGroupAction):
    try:
        update_database(
            f"""
            INSERT OR IGNORE INTO JOIN_GROUP VALUES ('{jga.group_id}', '{jga.user}' , 'Waiting' , 'Member' , 'Undecided')
            """
        )
    except BaseException as err:
        print(err)
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/approve_request")
def approve_request(jgq: JoinGroupAction):
    try:
        df = query_database(
            f"""
            SELECT COUNT(*) AS current , capacity
            FROM JOIN_GROUP AS JG
            JOIN STUDY_GROUP AS SG ON SG.group_id = JG.group_id
            WHERE SG.group_id = {jgq.group_id} AND JG.join_status = "Join" AND SG.group_status = "In_progress"
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
            WHERE group_id = "{jgq.group_id}" AND user_id = "{jgq.user}"
            """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/kick")
def kick(jga: JoinGroupAction):
    try:
        update_database(
            f"""
            UPDATE JOIN_GROUP
            SET join_status = "Leave"
            WHERE group_id = "{jga.group_id}" AND user_id = "{jga.user}" AND group_status = "In_progress"
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
            INSERT OR IGNORE INTO ANNOUNCEMENT (group_id,publisher_id,publish_time,content) VALUES('{a.group_id}','{a.user}',datetime('now','localtime'),'{a.content}')
            """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/meeting/create")
def meeting_create(m: Meeting):
    try:
        update_database(
            f"""
            INSERT OR IGNORE INTO MEET (meet_name,group_id,host_ID,start_time,end_time) VALUES('{m.meet_name}', '{m.group_id}', '{m.user}', '{m.start_time}', '{m.end_time}')
            """
        )
    except BaseException as err:
        print(err)
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()
