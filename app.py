
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
    populer={
    "0": { "catogory_id": 0, "item_id": 12, "name": "xyz", "imgUrl": "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", "price": 99, "discriptcs": "chisee and spisy"},
    "1": { "catogory_id": 1, "item_id": 15, "name": "abc", "imgUrl": "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", "price": 99, "discriptcs": "chisee and spisy"},
    "2": { "catogory_id": 7, "item_id": 17, "name": "rth", "imgUrl": "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", "price": 99, "discriptcs": "chisee and spisy"}
  }
    
    
    return jsonify(populer)

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
