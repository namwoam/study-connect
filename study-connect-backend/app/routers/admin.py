from fastapi import APIRouter
from ..db import query_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
)


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