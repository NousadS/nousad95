from config import *

router = APIRouter(
    prefix="/token",
    tags=["cat-token"],
    dependencies=[],
    responses={},
)

@router.get("/{cat_token}", responses=openapi.routes["api"]["cat_token"]["check"])
def cat_token_check(request: Request, cat_token: str):
    try:
        if re.compile("^cat\.[a-zA-Z0-9-]+\:[a-fA-F0-9]{32}$").match(cat_token):
            cat_token = cat_token[4:].split(":")

            db = Database()

            db.cursor.execute(
                "SELECT * FROM nousad95_cat_token WHERE first_part = %(cat_token)s;",
                { "cat_token": cat_token[0] },
            )

            response = db.cursor.fetchone()

            if response != [] and cat_token[1] == hashlib.md5((response[0] + response[1] + SECRET_KEY).encode()).hexdigest():
                return JSONResponse({ "response": True })
    except Exception as e:
        pass
    
    return JSONResponse({ "response": False })

@router.post("/{cat_token_keys}", responses=openapi.routes["api"]["cat_token"]["create"])
def cat_token_create(request: Request, cat_token_keys: str, secret: str):
    first_part, last_part = cat_token_keys.split(":")

    if secret == SECRET_KEY:
        try:
            db = Database()

            db.cursor.execute(
                "INSERT INTO nousad95_cat_token (first_part, last_part) VALUES (%(first_part)s, %(last_part)s);",
                { "first_part": first_part, "last_part": last_part},
            )

            db.cursor.execute(
                "SELECT * FROM nousad95_cat_token;"
            )

            return JSONResponse(
                {
                    "response": "Created",
                    "content": db.cursor.fetchall()
                }
            )
        except Exception as e:
            raise StarletteHTTPException(
                status_code=409,
                detail="Already Created"
            )
    else:
        raise StarletteHTTPException(
            status_code=401,
            detail="Authorization Failed"
        )

@router.put("/{cat_token_keys}", responses=openapi.routes["api"]["cat_token"]["update"])
def cat_token_update(request: Request, cat_token_keys: str, secret: str):
    first_part, last_part = cat_token_keys.split(":")

    if secret == SECRET_KEY:
        try:
            db = Database()

            db.cursor.execute(
                "UPDATE nousad95_cat_token SET first_part = %(first_part)s, last_part = %(last_part)s WHERE first_part = %(first_part)s;",
                { "first_part": first_part, "last_part": last_part},
            )

            db.cursor.execute(
                "SELECT * FROM nousad95_cat_token;"
            )

            return JSONResponse(
                {
                    "response": "Updated",
                    "content": db.cursor.fetchall()
                }
            )
        except Exception as e:
            raise StarletteHTTPException(
                status_code=404,
                detail="Not Found"
            )
    else:
        raise StarletteHTTPException(
            status_code=401,
            detail="Authorization Failed"
        )

@router.delete("/{cat_token_keys}", responses=openapi.routes["api"]["cat_token"]["delete"])
def cat_token_delete(request: Request, cat_token_keys: str, secret: str):
    first_part, last_part = cat_token_keys.split(":")

    if secret == SECRET_KEY:
        try:
            db = Database()

            db.cursor.execute(
                "DELETE FROM nousad95_cat_token WHERE first_part = %(first_part)s;",
                { "first_part": first_part },
            )

            db.cursor.execute(
                "SELECT * FROM nousad95_cat_token;"
            )

            return JSONResponse(
                {
                    "response": "Deleted",
                    "content": db.cursor.fetchall()
                }
            )
        except Exception as e:
            raise StarletteHTTPException(
                status_code=404,
                detail="Not Found"
            )
    else:
        raise StarletteHTTPException(
            status_code=401,
            detail="Authorization Failed"
        )