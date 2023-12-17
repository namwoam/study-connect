from typing import Union

from pydantic import BaseModel

from fastapi import FastAPI, HTTPException

from fastapi.middleware.cors import CORSMiddleware

from .routers import friends, courses, info, user, group, admin

from .db import query_database
from .utils import ok_respond
from .auth import is_admin

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(friends.router)
app.include_router(courses.router)
app.include_router(info.router)
app.include_router(user.router)
app.include_router(group.router)
app.include_router(admin.router)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


class LoginAction(BaseModel):
    username: str
    password: str


@app.post("/login")
def login(la: LoginAction):
    try:
        assert la.username == la.password
        user_query = query_database(f"""
        SELECT student_id
        FROM USER
        WHERE student_id = "{la.username}"
        """)
        assert len(user_query) == 1
    except BaseException as err:
        return HTTPException(status_code=403, detail="Forbidden")
    return ok_respond({
        "is_admin": is_admin(la.username)
    })
