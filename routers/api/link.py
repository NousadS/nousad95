from config import *

router = APIRouter(
    prefix="/link",
    tags=["cat-link"],
    dependencies=[],
    responses={},
)

@router.get("/{id}")
def cat_link_resolve(request: Request, id: str):
    try:
        db = Database()

        db.cursor.execute(
            "SELECT * FROM nousad95_cat_link WHERE id = %(id)s;",
            { "id": id },
        )

        response = db.cursor.fetchone()

        if response != []:
            return RedirectResponse(f"{response[1]}?{request.query_params}")
        else:
            raise Exception()
    except Exception as e:
        raise StarletteHTTPException(
            status_code=404,
            detail="Not Found"
        )

@router.post("/{id}", responses=openapi.routes["api"]["cat_link"]["create"])
def cat_link_create(request: Request, id: str, link: str, secret: str):
    if secret == SECRET_KEY:
        try:
            db = Database()

            db.cursor.execute(
                "INSERT INTO nousad95_cat_link (id, link) VALUES (%(id)s, %(link)s);",
                { "id": id, "link": link},
            )

            db.cursor.execute(
                "SELECT * FROM nousad95_cat_link;"
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

@router.put("/{id}", responses=openapi.routes["api"]["cat_link"]["update"])
def cat_link_update(request: Request, id: str, link: str, secret: str):
    if secret == SECRET_KEY:
        try:
            db = Database()

            db.cursor.execute(
                "UPDATE nousad95_cat_link SET id = %(id)s, link = %(link)s WHERE id = %(id)s;",
                { "id": id, "link": link},
            )

            db.cursor.execute(
                "SELECT * FROM nousad95_cat_link;"
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

@router.delete("/{id}", responses=openapi.routes["api"]["cat_link"]["delete"])
def cat_link_delete(request: Request, id: str, secret: str):
    if secret == SECRET_KEY:
        try:
            db = Database()
            
            db.cursor.execute(
                "DELETE FROM nousad95_cat_link WHERE id = %(id)s;",
                { "id": id },
            )

            db.cursor.execute(
                "SELECT * FROM nousad95_cat_link;"
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