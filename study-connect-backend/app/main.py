from typing import Union

from fastapi import FastAPI

from .routers import friends, courses

app = FastAPI()


app.include_router(friends.router)
app.include_router(courses.router)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
