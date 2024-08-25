from config import *
from . import window

router = APIRouter(
    prefix="",
    tags=["system"],
    dependencies=[],
    responses={},
)

router.include_router(window.router)