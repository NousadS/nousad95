from fastapi import FastAPI, APIRouter, Request, Response
from fastapi.responses import * 
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.openapi.utils import get_openapi

from fastapi import HTTPException
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError

from typing import Callable

import pendulum
import uvicorn
import hashlib
import fastapi
import typing
import dotenv
import jinja2
import sass
import json
import os
import re