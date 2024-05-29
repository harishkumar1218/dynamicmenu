from flask import Flask, request, jsonify
from flask_cors import CORS
from BackendFunctions import *

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    # Process the data
    print(data)
    return jsonify({"message": "Data received successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)