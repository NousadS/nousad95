from config import *
from . import link, token

router = APIRouter(
    prefix="/api",
    tags=["api"],
    dependencies=[],
    responses={},
)

router.include_router(link.router)
router.include_router(token.router)