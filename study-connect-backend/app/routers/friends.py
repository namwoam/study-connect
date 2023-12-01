from fastapi import APIRouter, Depends, HTTPException
from ..db import query_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/user/friend",
    tags=["friends"],
    responses={404: {"description": "Not found"}},
)


@router.get("/list/{student_id}")
def requests(student_id: str):
    friends_relationship = query_database(
        f"""
        SELECT CASE WHEN user1_ID='{student_id}' THEN user2_ID
                    WHEN user2_ID='{student_id}' THEN user1_ID
                    END AS friend_id
        FROM IS_FRIEND_OF
        WHERE comfirm_status = 'Agree' AND (user1_ID='{student_id}' OR user2_ID='{student_id}')
        """)
    # print(friends_relationship.head())
    return ok_respond({
        "friends": friends_relationship["friend_id"].unique().tolist()
    })
