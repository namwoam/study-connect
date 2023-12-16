from .group import create, CreateGroup
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from ..db import query_database, update_database, update_database_df
from ..utils import ok_respond

import io
import pandas as pd

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
)


class CreateGroupCSV(BaseModel):
    csv: str
    group_data: CreateGroup


@router.post("/group/create_csv")
def create_csv(cgcsv: CreateGroupCSV):
    try:
        create(cgcsv.group_data)
        group_data = pd.read_csv(io.StringIO(cgcsv.csv))
        assert "user_id" in group_data and "role" in group_data and "job" in group_data
        group_data = group_data[["user_id", "role", "job"]]
        assert group_data['role'].isin(['Leader', 'Member']).all()
        assert sum(group_data['role'] == "Leader") == 1
        assert group_data[group_data['role'] ==
                          "Leader"]['user_id'] == cgcsv.group_data.user
        group_id = query_database("SELECT group_id FROM STUDY_GROUP ORDER BY group_id DESC LIMIT 1")[
            "group_ID"].to_list()[0]
        group_data["group_id"] = group_id
        group_data["join_status"] = "Join"
        update_database_df(group_data, "STUDY_GROUP")
        return ok_respond()
    except BaseException as err:
        print(err)
        raise HTTPException(status_code=403, detail="Forbidden")


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
        raise HTTPException(status_code=403, detail="Forbidden")
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
        raise HTTPException(status_code=403, detail="Forbidden")
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


class CustomQuery(BaseModel):
    query: str


@router.post("/custom_query")
def custom_query(cq: CustomQuery):
    try:
        result = query_database(cq.query)
        stream = io.StringIO()
        result.to_csv(stream, index=False)
        res = StreamingResponse(iter([stream.getvalue()]),
                                media_type="text/csv"
                                )
        res.headers["Content-Disposition"] = "attachment; filename=export.csv"
        return res
    except BaseException as err:
        raise HTTPException(status_code=403, detail="Forbidden")
