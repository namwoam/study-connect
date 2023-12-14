from typing import Union

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from .routers import friends, courses, info, user , group , admin

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
