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


class ChangeLeaderAction(BaseModel):
    user: str
    group_id: str


class CreateGroup(BaseModel):
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


class EditJobAction(BaseModel):
    user: str
    group_id: str
    job: str


@router.post("/change_leader")
def change_leader(cla: ChangeLeaderAction):
    try:
        update_database(
            f"""
            UPDATE JOIN_GROUP
            SET role = "Member"
            WHERE group_id = "{cla.group_id}"
            """
        )
        update_database(
            f"""
            UPDATE JOIN_GROUP
            SET role = "Leader"
            WHERE group_id = "{cla.group_id}" AND user_id = "{cla.user}"
            """
        )
    except BaseException as err:
        raise HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/edit_job")
def edit_job(eja: EditJobAction):
    try:
        update_database(
            f"""
            UPDATE JOIN_GROUP
            SET job = "{eja.job}"
            WHERE group_id = "{eja.group_id}" AND user_id = "{eja.user}"
            """
        )
    except BaseException as err:
        raise HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


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
        raise HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.get("/pending_request/{group_id}")
def pending_request(group_id: str):
    requests = query_database(f"""
        SELECT user_ID
        FROM JOIN_GROUP AS JG
        JOIN STUDY_GROUP AS SG ON SG.group_id = JG.group_id AND JG.group_id = "{group_id}"
        WHERE JG.join_status = "Waiting" AND SG.group_status = "In_progress"
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
        raise HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/approve_request")
def approve_request(jgq: JoinGroupAction):
    try:
        df = query_database(
            f"""
            SELECT capacity ,
                CASE WHEN members IS NULL THEN 0 ELSE members END AS current
            FROM STUDY_GROUP SG
            LEFT JOIN (
                SELECT JG.group_id , COUNT(*) AS members
                FROM JOIN_GROUP AS JG
                JOIN STUDY_GROUP AS SG ON JG.group_id = SG.group_id
                WHERE JG.group_id = "{jgq.group_id}" AND JG.join_status = "Join"
                GROUP BY JG.group_id
            )AS C ON C.group_id = SG.group_id
            WHERE SG.group_status = "In_progress" AND SG.group_id = "{jgq.group_id}"
        """
        )
        current = df["current"].to_list()[0]
        capacity = df["capacity"].to_list()[0]
        print(current, capacity)
        assert current < capacity
        update_database(
            f"""
            UPDATE JOIN_GROUP
            SET join_status = "Join"
            WHERE group_id = "{jgq.group_id}" AND user_id = "{jgq.user}"
            """
        )
    except BaseException as err:
        print(err)
        raise HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/kick")
def kick(jga: JoinGroupAction):
    try:
        update_database(
            f"""
            UPDATE JOIN_GROUP
            SET join_status = "Leave"
            WHERE group_id = "{jga.group_id}" AND user_id = "{jga.user}"
            """
        )
    except BaseException as err:
        raise HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/create")
def create(cg: CreateGroup, auto_join=True):
    try:
        if auto_join:
            assert cg.capacity > 0
        update_database(
            f"""
            INSERT INTO STUDY_GROUP (group_name,capacity,creator_ID,course_ID) VALUES ('{cg.group_name}' , '{cg.capacity}','{cg.user}' ,'{cg.course_id}')
            """
        )
        if auto_join:
            group_id = str(query_database("SELECT group_id FROM STUDY_GROUP ORDER BY group_id DESC LIMIT 1")[
                "group_ID"].to_list()[0])
            send_request(JoinGroupAction(user=cg.user, group_id=group_id))
            approve_request(JoinGroupAction(user=cg.user, group_id=group_id))
    except BaseException as err:
        print(err)
        raise HTTPException(status_code=403, detail="Forbidden")
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
        raise HTTPException(status_code=403, detail="Forbidden")
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
        raise HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()
