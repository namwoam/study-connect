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
