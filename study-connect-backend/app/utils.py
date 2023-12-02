def ok_respond(payload: dict | None):
    if payload:
        return {
            "success": True,
            "data": payload
        }
    return {
        "success": True
    }
