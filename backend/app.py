# API Key: AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import google.generativeai as genai

app = Flask(__name__)
CORS(app)
genai.configure(api_key="AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks")
model = genai.GenerativeModel("gemini-1.5-flash")
uri = "mongodb://localhost:27017/"
client = MongoClient(uri)
database = client["GiftGiver"]

# Recieves query information from frontend
# Query request includes input_item, input_age, and input_additional
# Query data obtained through request.json.get("<key name>")
# Returns message generated through Gemini as string
@app.route("/query", methods = ['POST'])
def getAI():
    item = request.json.get("input_item")
    age = request.json.get("input_age")
    additional = request.json.get("input_additional")
    # what if they get a query before logging in?
    # include a way to get username from frontend: username = request.json.get("user_username")
    collection = database["users"]
    if additional == None:
        prompt = f"Generate 5 gift items in bullet point form related to {item}, the receipient is {age} years old. Give me raw text with no descriptions of the items."
    else:
        prompt = f"Generate 5 gift items in bullet point form related to {item}, the receipient is {age} years old. Here is some additional information about the person: {additional}. Give me raw text with no descriptions of the items."
    print(prompt)
    response = parseResponse(model.generate_content(prompt).text)
    # once username is set properly, update user in mongoDB to add history
    # collection.update_one({"username": username}, {"$set": {"history": response}})
    return jsonify({"message": response})

# Function to parse Gemini string repsonse into an array of 5 items
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
# Login data obtained through request.json.get("<key name>")
@app.route("/login", methods = ['POST'])
def login():
    username = request.json.get("user_username")
    password = request.json.get("user_password")
    print(f"username and password received")
    print(f"username: {username}    password: {password}")
    collection = database["users"]
    user = collection.find_one({"username": username})
    if user and password == user.get("password"):
        # on successful login, load user history
        return jsonify({"login status" : "successful login"})
    return jsonify({"login status" : "failed login"})


# Receives register information from frontend
# Login information includes new_username and new_password
# Registration data obtained through request.json.get("<key name>")
@app.route("/register", methods = ['POST'])
def register():
    newUsername = request.json.get("new_username")
    newPassword = request.json.get("new_password")
    print(f"new username and  password received")
    print(f"new username: {newUsername}     new password: {newPassword}")
    collection = database["users"]
    if not collection.find_one({"username": newUsername}): 
        collection.insert_one({"username": newUsername, "password": newPassword, "history": []})
        return jsonify({"registration status" : "successful registration"})
    return jsonify({"registration status" : "failed registration"})




app.run(port=5050)
