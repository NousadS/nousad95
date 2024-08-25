from .imports import *

######################################
#                                    #
#               Environ              #
#                                    #
######################################

dotenv.load_dotenv()

######################################
#                                    #
#               Config               #
#                                    #
######################################

SECRET_KEY = os.environ.get("SECRET_KEY")

SERVER = os.environ.get("SERVER") == "true"
DEBUG  = os.environ.get("DEBUG")  == "true"

######################################
#                                    #
#                Paths               #
#                                    #
######################################

STATIC_PATH    = os.path.abspath("static/")
TEMPLATES_PATH = os.path.abspath("templates/")

ASSETS_PATH    = os.path.join(STATIC_PATH, "assets/")
DATA_PATH      = os.path.join(STATIC_PATH, "data/")
PUBLIC_PATH    = os.path.join(STATIC_PATH, "public/")

SASS_INPUT_PATH  = os.path.join(PUBLIC_PATH, "scss/")
SASS_OUTPUT_PATH = os.path.join(PUBLIC_PATH, "css/")
