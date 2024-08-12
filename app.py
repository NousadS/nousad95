from flask import Flask, Response, render_template, redirect, request
import hashlib
import dotenv
import jinja2
import json
import os

dotenv.load_dotenv()

SECRET_KEY = os.environ.get("SECRET_KEY")

TOKENS = {
    "nedo": "hackers",
}

app = Flask(__name__)
app.secret_key = SECRET_KEY

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/token/")
def token():
    response = {
        "available": False,
        "available_level": 0,
    }
    
    if token := request.args.get("token"):
        response["available_level"] = 1
        if token.startswith("cat.") and len(token := token[4:].split(":")) == 2:
            response["available_level"] = 2
            if token[0] in TOKENS and token[1] == hashlib.md5((token[0]+TOKENS[token[0]]+SECRET_KEY).encode()).hexdigest():
                response["available_level"] = 3
                response["available"] = True
    
    return Response(json.dumps(response), mimetype="application/json")