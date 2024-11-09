# API Key: AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks

from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)
genai.configure(api_key="AIzaSyCFSndRnJpXXIYpt_AykTrrPUIZ85cxTks")
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/", methods = ['POST'])
def hello_world():
    response = model.generate_content(request.data.get("input_query"))
    return jsonify({"message": response.text})

app.run()