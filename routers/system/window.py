from config import *

router = APIRouter(
    prefix="",
    tags=["windows"],
    dependencies=[],
    responses={},
)

@router.head("/", responses=openapi.routes["system"]["windows"]["alive"])
def alive(request: Request):
    return JSONResponse(
        { "response": "alive" }
    )

@router.get("/", responses=openapi.routes["system"]["windows"]["file"])
def system(request: Request):
    return templates.TemplateResponse(
        request=request, 
        name="system.html",
    )

@router.get("/system/", responses=openapi.routes["system"]["windows"]["file"])
def file(request: Request, file: str):
    return system_templates.TemplateResponse(
        request=request, 
        name=f"{file}.html",
    )