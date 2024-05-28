
#"start": "react-scripts start",

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET'])
def home():
    return "Hello, this is the response from your Flask app!"

@app.route('/data', methods=['POST'])
def handle_data():
    data = request.json
    response_message = f"Received data: {data}"
    return jsonify({"message": response_message})

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
