# API Key: AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)
genai.configure(api_key="AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks")
model = genai.GenerativeModel("gemini-1.5-flash")


# Recieves query information from frontend
# Query request includes input_item, input_age, and input_additional
# Returns message generated through Gemini
@app.route("/query", methods = ['POST'])
def getAI():
    item = request.json.get("input_item")
    age = request.json.get("input_age")
    additional = request.json.get("input_additional")
    if additional == None:
        prompt = f"Generate 5 gift items in bullet point form related to {item}, the receipient is {age} years old. Give me raw text with no descriptions of the items."
    else:
        prompt = f"Generate 5 gift items in bullet point form related to {item}, the receipient is {age} years old. Here is some additional information about the person: {additional}. Give me raw text with no descriptions of the items."
    print(prompt)
    response = model.generate_content(prompt)
    return jsonify({"message": parseResponse(response.text)})

# Function to parse Gemini repsonse into an array of 5 items
def parseResponse(response):
    giftItems = []
    gift = ""
    for c in response:
        if c == "*":
            if gift != "":
                giftItems.append(gift)
            gift = ""
        if c != "*":
            gift += c
    giftItems.append(gift)
    return giftItems


# Receives login information from frontend
# Login information includes user_username and user_password
@app.route("/login", methods = ['POST'])
def login():
    username = request.json.get("user_username")
    password = request.json.get("user_password")
    print(f"username and password received")
    print(f"username: {username}    password: {password}")
    return jsonify({"login request" : "login request received"})


# Receives register information from frontend
# Login information includes new_username and new_password
@app.route("/register", methods = ['POST'])
def register():
    newUsername = request.json.get("new_username")
    newPassword = request.json.get("new_password")
    print(f"new username and  password received")
    print(f"new username: {newUsername}     new password: {newPassword}")
    return jsonify({"registration request" : "registration request received"})


app.run(port=5050)
