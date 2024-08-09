from flask import Flask, Response, render_template, redirect, request
import hashlib
import dotenv
import jinja2
import json
import os

dotenv.load_dotenv()

APP_HOST = os.environ.get("APP_HOST")
APP_PORT = os.environ.get("APP_PORT")

APP_DEBUG = os.environ.get("APP_DEBUG") == "True"
APP_SECRET_KEY = os.environ.get("APP_SECRET_KEY")

app = Flask(__name__)
app.secret_key = APP_SECRET_KEY

@app.route("/")
def index():
    return render_template("index.html")

app.run(host=APP_HOST, port=APP_PORT, debug=APP_DEBUG)