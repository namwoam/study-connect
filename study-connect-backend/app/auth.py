def is_admin(username: str) -> bool:
    admins = ["B11705009", "B09705024", "B10705020", "B10607011", "B10705006"]
    if username in admins:
        return True
    else:
        return False
