from .imports import *
from .constants import *

######################################
#                                    #
#        FastAPI Application         #
#                                    #
######################################

app = FastAPI(
    debug=DEBUG,

    default_response_class=JSONResponse,

    openapi_url=None,
    docs_url=None,
    redoc_url=None,
)

######################################
#                                    #
#         Exception Handlers         #
#                                    #
######################################

@app.exception_handler(HTTPException)
@app.exception_handler(StarletteHTTPException)
async def http_exception(request: Request, exception: HTTPException | StarletteHTTPException):
    return JSONResponse(
        {
            "error": exception.detail,
            "code": exception.status_code,
        },
        exception.status_code,
    )

@app.exception_handler(RequestValidationError)
async def validation_exception(request: Request, exception: RequestValidationError):
    return JSONResponse(
        {
            "error": dict([
                [ e["type"], e["loc"][1] ] for e in exception.errors()
            ]),
            "code": 422,
        },
        422,
    )

@app.exception_handler(jinja2.TemplateNotFound)
async def validation_exception(request: Request, exception: jinja2.TemplateNotFound):
    return JSONResponse(
        {
            "error": "Template Not Found",
            "code": 404,
        },
        404,
    )

@app.middleware("http")
async def sass_middleware(request: Request, call_next: Callable):
    if not SERVER:
        sass.compile(
            dirname=(SASS_INPUT_PATH, SASS_OUTPUT_PATH),
            output_style="expanded",
            include_paths=[SASS_INPUT_PATH],
        )

    response = await call_next(request)
    return response

######################################
#                                    #
#     Templates and Static Files     #
#                                    #
######################################

app.mount("/static", StaticFiles(directory=STATIC_PATH), name="static")

templates = Jinja2Templates(directory=TEMPLATES_PATH)