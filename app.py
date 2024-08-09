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
    return redirect("/system")

@app.route("/token/")
def token():
    response = {
        "available": False,
        "available_level": 0,
    }
    
    if token := request.args.get("token"):
        response["available_level"] = 1
        if token.startswith("cat.") and len(token := token[4:].split(":")) == 2:
            response["available_level"] = SECRET_KEY
            if token[0] in TOKENS and token[1] == hashlib.md5((token[0]+TOKENS[token[0]]+SECRET_KEY).encode()).hexdigest():
                response["available_level"] = 3
                response["available"] = True
    
    return Response(json.dumps(response), mimetype="application/json")

@app.route("/system/", defaults={ "path": "cmd.exe" })
@app.route("/system/<path:path>")
def system(path):
    clear_path = path.replace(".exe", "")
    
    try:
        return render_template(f"{clear_path}.html", title="N:/"+path, path=clear_path)
    except jinja2.exceptions.TemplateNotFound:
        return render_template("unknown.html", title="N:/"+path, path="unknown")