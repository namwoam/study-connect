from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..db import query_database, update_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
)


@router.get("/group/list_deleted")
def list_deleted(limit: int = 10):
    deleted = query_database(
        f"""
        SELECT group_id
        FROM STUDY_GROUP
        WHERE group_status = "Deleted"
    """)
    return ok_respond({
        "groups": deleted["group_ID"].to_list()
    })


class AdminGroupAction(BaseModel):
    group_id: str


@router.post("/group/delete_group")
def delete_group(aga: AdminGroupAction):
    try:
        update_database(
            f"""
            UPDATE STUDY_GROUP
            SET group_status = "Deleted"
            WHERE group_id = "{aga.group_id}"
            """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.post("/group/restore_group")
def restore_group(aga: AdminGroupAction):
    try:
        update_database(
            f"""
            UPDATE STUDY_GROUP
            SET group_status = "In_progress"
            WHERE group_id = "{aga.group_id}"
            """
        )
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond()


@router.get("/popular_instructor")
def popular_instructor(limit: int = 10):
    popularity = query_database(
        f"""
        SELECT I.instructor_id , I.instructor_name , COUNT(*) AS popularity
        FROM INSTRUCTOR AS I
        JOIN OFFER_COURSE AS OC ON I.instructor_id = OC.instructor_id
        JOIN COURSE AS C ON C.course_id = OC.course_id
        JOIN TAKE_COURSE AS TC ON TC.course_id = OC.course_id
        GROUP BY I.instructor_id
        ORDER BY COUNT(*) DESC
        LIMIT {limit}
        """
    )
    return ok_respond({
        "instructors": popularity.values.tolist()
    })


@router.get("/hardwork_instructor")
def hardwork_instructor(limit: int = 10):
    hardwork = query_database(
        f"""
        SELECT I.instructor_id , I.instructor_name , COUNT(*) AS popularity
        FROM INSTRUCTOR AS I
        JOIN OFFER_COURSE AS OC ON I.instructor_id = OC.instructor_id
        GROUP BY I.instructor_id
        ORDER BY COUNT(*) DESC
        LIMIT {limit}
        """
    )
    return ok_respond({
        "instructors": hardwork.values.tolist()
    })
