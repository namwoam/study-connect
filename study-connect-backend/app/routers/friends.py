from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import query_database, update_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/user/friend",
    tags=["friends"],
    responses={404: {"description": "Not found"}},
)


class FriendAction(BaseModel):
    user: str
    target: str

# TODO: implement safe checking


@router.post("/send_request")
def send_request(fa: FriendAction):
    try:
        update_database(
            f"""
        INSERT OR IGNORE INTO IS_FRIEND_OF VALUES ('{fa.user}', '{fa.target}' , 'Unconfirm')
        """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/approve_request")
def approve_request(fa: FriendAction):
    try:
        update_database(
            f"""
            UPDATE IS_FRIEND_OF
            SET confirm_status = 'Agree'
            WHERE user1_ID = "{fa.user}" AND user2_ID = "{fa.target}";
            """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/unfriend")
def unfriend(fa: FriendAction):
    try:
        update_database(
            f"""
            UPDATE IS_FRIEND_OF
            SET confirm_status = 'Disagree'
            WHERE user1_ID = "{fa.user}" AND user2_ID = "{fa.target}";
            """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.get("/list/{student_id}")
def list_friends(student_id: str):
    friends_relationship = query_database(
        f"""
        SELECT CASE WHEN user1_ID='{student_id}' THEN user2_ID
                    WHEN user2_ID='{student_id}' THEN user1_ID
                    END AS friend_id
        FROM IS_FRIEND_OF
        WHERE confirm_status = 'Agree' AND (user1_ID='{student_id}' OR user2_ID='{student_id}')
        """)
    # print(friends_relationship.head())
    return ok_respond({
        "friends": friends_relationship["friend_id"].unique().tolist()
    })

@router.get("/recommend/{student_id}")
def recommend(student_id:str):
    pass