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
        create(cgcsv.group_data , False)
        group_data = pd.read_csv(io.StringIO(cgcsv.csv))
        assert "user_id" in group_data and "role" in group_data and "job" in group_data
        group_data = group_data[["user_id", "role", "job"]]
        assert group_data['role'].isin(['Leader', 'Member']).all()
        assert sum(group_data['role'] == "Leader") == 1
        assert group_data[group_data['role'] ==
                          "Leader"]['user_id'].to_list()[0] == cgcsv.group_data.user
        group_id = query_database("SELECT group_id FROM STUDY_GROUP ORDER BY group_id DESC LIMIT 1")[
            "group_ID"].to_list()[0]
        group_data["group_id"] = group_id
        group_data["join_status"] = "Join"
        update_database_df(group_data, "JOIN_GROUP")
        return ok_respond()
    except BaseException as err:
        print(err)
        raise HTTPException(status_code=403, detail="Forbidden")

from ..db import engine
from sqlalchemy.orm import Session

@router.post("/group/create_csv2")
def create_csv2(cgcsv: CreateGroupCSV):
    with Session(engine) as session:
        session.begin()
        try:
            create(cgcsv.group_data , False)
            group_data = pd.read_csv(io.StringIO(cgcsv.csv))
            assert "user_id" in group_data and "role" in group_data and "job" in group_data
            group_data = group_data[["user_id", "role", "job"]]
            assert group_data['role'].isin(['Leader', 'Member']).all()
            assert sum(group_data['role'] == "Leader") == 1
            assert group_data[group_data['role'] ==
                          "Leader"]['user_id'].to_list()[0] == cgcsv.group_data.user
            group_id = query_database("SELECT group_id FROM STUDY_GROUP ORDER BY group_id DESC LIMIT 1")[
            "group_ID"].to_list()[0]
            group_data["group_id"] = group_id
            group_data["join_status"] = "Join"
            update_database_df(group_data, "JOIN_GROUP")
        except BaseException as err:
            session.rollback()
            raise HTTPException(status_code=403, detail="Forbidden")
        else:
            session.commit()
            return ok_respond()


@router.get("/group/list_deleted")
def list_deleted(limit: int = 10):
    deleted = query_database(
        f"""
        SELECT group_id, group_name, creator_id, course_id
        FROM STUDY_GROUP
        WHERE group_status = "Deleted"
    """)
    return ok_respond({
        "groups": deleted.values.tolist()
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
def popular_instructor(limit: int = 10, sort: str = "desc"):
    popularity = query_database(
        f"""
        SELECT I.instructor_id , I.instructor_name , COUNT(*) AS popularity
        FROM INSTRUCTOR AS I
        JOIN OFFER_COURSE AS OC ON I.instructor_id = OC.instructor_id
        JOIN COURSE AS C ON C.course_id = OC.course_id
        JOIN TAKE_COURSE AS TC ON TC.course_id = OC.course_id
        GROUP BY I.instructor_id
        ORDER BY COUNT(*) {sort}
        LIMIT {limit}
        """
    )
    return ok_respond({
        "instructors": popularity.values.tolist()
    })


@router.get("/hardwork_instructor")
def hardwork_instructor(limit: int = 10, sort: str = "desc"):
    hardwork = query_database(
        f"""
        SELECT I.instructor_id , I.instructor_name , COUNT(*) AS popularity
        FROM INSTRUCTOR AS I
        JOIN OFFER_COURSE AS OC ON I.instructor_id = OC.instructor_id
        GROUP BY I.instructor_id
        ORDER BY COUNT(*) {sort}
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


@router.get("/group_creator")
def student_create_group(limit: int = 10, sort: str = "desc"):
    try:
        assert limit > 0 and (sort == "desc" or sort == "asc")
        created_group = query_database(
            f"""
        SELECT U.student_ID, U.student_name, COUNT (*) AS create_group_count
        FROM USER AS U
        JOIN STUDY_GROUP AS SG ON U.student_ID = SG.creator_ID
        GROUP BY SG.creator_ID
        ORDER BY COUNT (*) {sort}
        LIMIT {limit}
        """
        )
        return ok_respond({
            "students": created_group.values.tolist()
        })
    except BaseException as err:
        print(err)
        raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/friend_count")
def student_friend_num(limit: int = 10, sort: str = "desc"):
    try:
        assert limit > 0 and (sort == "desc" or sort == "asc")
        student_friend = query_database(
            f"""
        SELECT U.student_id, U.student_name, COUNT (*) AS friend_count
        FROM USER AS U
        JOIN IS_FRIEND_OF AS IFO ON U.student_id = IFO.user1_ID OR U.student_id = IFO.user2_ID
        JOIN USER AS F ON F.student_id != U.student_id  and ( F.student_id  = IFO.user1_ID OR F.student_id  = IFO.user2_ID )
        GROUP BY U.student_id
        Order By COUNT (*) {sort}
        LIMIT {limit}
            """
        )
        return ok_respond({
            "students": student_friend.values.tolist()
        })
    except BaseException as err:
        print(err)
        raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/course_count")
def group_count(by_group: bool = True, by_student: bool = False, limit: int = 10, sort="desc"):
    try:
        assert limit > 0 and (sort == "desc" or sort == "asc")
        assert by_group ^ by_student
        course_data = query_database(
            f"""
            SELECT TG.course_id, TG.course_name, total_group, total_student FROM (
                SELECT C.course_id, C.course_name,
                COUNT(*) AS total_group
                FROM COURSE AS C
                JOIN STUDY_GROUP AS SG ON SG.course_id = C.course_id
                GROUP BY SG.course_id
            ) AS TG JOIN (
                SELECT C.course_id,
                COUNT(*) AS total_student
                FROM COURSE AS C
                JOIN TAKE_COURSE AS TC ON TC.course_id = C.course_id
                GROUP BY TC.course_id
            ) AS TS ON TG.course_id = TS.course_id
            ORDER BY {"TG.total_group" if by_group else "TS.total_student"} {sort}
            LIMIT {limit}
        """)
        return ok_respond({
            "courses": course_data.values.tolist()
        })
    except BaseException as err:
        print(err)
        raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/group_student_total")
def group_student_total(get_group: bool = True, get_student: bool = True, limit: int = 10, sort: str = "desc"):
    group_student_total = query_database(
        f"""
        SELECT
            c.course_id,
            c.course_name,
            c.semester,
            CASE
                WHEN {get_group} = True AND {get_student} = False THEN COALESCE(g.total_groups, 0)
                WHEN {get_student} = True AND {get_group} = False THEN COALESCE(u.total_students, 0)
                WHEN {get_group} = True AND {get_student} = True THEN COALESCE(g.total_groups, 0)
                ELSE 0
            END AS total_groups,
            CASE
                WHEN {get_group} = True AND {get_student} = False THEN 0  -- If group is selected, set total_students to 0
                WHEN {get_student} = True AND {get_group} = False THEN COALESCE(u.total_students, 0)
                WHEN {get_group} = True AND {get_student} = True THEN COALESCE(u.total_students, 0)
                ELSE 0
            END AS total_students
        FROM course AS c
            LEFT JOIN (
                SELECT course_id, COUNT(group_id) AS total_groups
                FROM group
                GROUP BY course_id
            ) g ON c.course_id = g.course_id
            LEFT JOIN (
                SELECT course_id, COUNT(user_id) AS total_students
                FROM take_course
                GROUP BY course_id
            ) u ON c.course_id = u.course_id
        ORDER BY
            CASE
                WHEN {sort} = 'asc' THEN total_groups + total_students
                WHEN {sort} = 'desc' THEN (total_groups + total_students) * -1
            END
        LIMIT {limit};
        """
    )
    return ok_respond({
        "group and student number in courses": group_student_total.values.tolist()
    })


@router.get("/list_students")
def list_students(limit: int = 10):
    users = query_database(
        f"""
        SELECT student_ID, student_name
        FROM USER
        ORDER BY student_ID
        LIMIT {limit}
        """
    )
    return ok_respond({
        "students": users.values.tolist()
    })


@router.get("/list_courses")
def list_courses(limit: int = 10):
    users = query_database(
        f"""
        SELECT course_ID, course_name
        FROM COURSE
        ORDER BY course_ID
        LIMIT {limit}
        """
    )
    return ok_respond({
        "courses": users.values.tolist()
    })


@router.get("/list_groups")
def list_groups(limit: int = 10, course_id: str | None = None):
    groups = query_database(
        f"""
        SELECT group_ID, group_name, creator_ID, course_ID
        FROM STUDY_GROUP
        {""if course_id is None else f"WHERE course_ID  ='{course_id}'"}
        ORDER BY group_ID
        LIMIT {limit}
        """
    )
    return ok_respond({
        "groups": groups.values.tolist()
    })
