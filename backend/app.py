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
    query = request.json.get("input_query")
    response = model.generate_content(f"generate 5 gift items in bullet point form related to {query}")
    return jsonify({"message": response.text})

app.run(port=5050)