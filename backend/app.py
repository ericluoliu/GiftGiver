# API Key: AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)
genai.configure(api_key="AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks")
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/", methods = ['POST'])
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

app.run(port=5050, debug=True)
