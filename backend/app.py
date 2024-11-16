# API Key: AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)
genai.configure(api_key="AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks")
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/generate", methods = ['POST'])
def getAI():
    response = model.generate_content(request.json.get("input_query"))
    return jsonify({"message": response.text})

# POST, GET for authentication
@app.route("/login", methods = ['GET', 'POST'])
def login():
    # POST username/password inputted to DB
    # see if username exists, in DB
    # if not, tell client to register
    # else, GET password for username and compare if matches inputted password
    # if inputpass == pass, success! (show side bar with history)
        #  else, "wrong password", try again
    #variables: inputted username/password from client
    #           corresponding password to username from DB
    input_username = request.json.get("username")
    input_password = request.json.get("password")
    # Replace this with your actual authentication logic
    if username == "admin" and password == "password123":
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

app.run(port=5050)