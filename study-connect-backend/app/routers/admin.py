from fastapi import APIRouter
from ..db import query_database
from ..utils import ok_respond
router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
)