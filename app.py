
# #"start": "react-scripts start",
# #"concurrently \"npm run start-frontend\" \"python app.py\""
from flask import Flask, request, jsonify
from flask_cors import CORS
from BackendFunctions import *

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app) 
function_map = {
    "popular": PopularItems,
    "recommended": RecommendedItems,
    "combo":Combo,
    "search": SearchItems,
    "catogorys":GetCategories,
    "sort":SortFilterItems,
    "cart_recommend":CartRecommend,
    "menu":GetMenu,
    "auth_signup":SetUser,
    "auth_login":GetUser,
    "bill":GetBill,
    "addtocart":AddToCart
}

@app.route('/', methods=['GET'])
def home():
    return "Hello, this is the response from your Flask app!"

@app.route('/auth', methods=['POST'])
def handle_data2():
    return "Success"

@app.route('/home', methods=['POST'])
def handle_data():
    data = request.json
    poplist=[{'item_id': 14, 'name': 'Pilau Rice', 'price': 2.95, 'popularity': 1.0, 'category': 'Starter', 'type': 'veg', 'img_url': 'https://source.unsplash.com/350x300/?Pilau-Rice'},{'item_id': 10, 'name': 'Plain Naan', 'price': 2.6, 'popularity': 0.79, 'category': 'Starter', 'type': 'veg', 'img_url': 'https://source.unsplash.com/350x300/?Plain-Naan'},{'item_id': 5, 'name': 'Plain Papadum', 'price': 0.8, 'popularity': 0.76, 'category': 'Others', 'type': 'veg', 'img_url': 'https://source.unsplash.com/350x300/?Plain-Papadum'}]

    if data['action'] in function_map:
        return function_map[data['action']](data['inputs'])
    

    return jsonify(poplist)



if __name__ == '__main__':
    app.run(host='localhost', port=5000)



