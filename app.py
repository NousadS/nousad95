from config import *
# import routers

# app.include_router(routers.api.router)
# app.include_router(routers.system.router)

uvicorn.run(
    app=app, host="0.0.0.0", port=5000,
)