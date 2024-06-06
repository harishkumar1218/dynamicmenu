
#"start": "react-scripts start",
#"concurrently \"npm run start-frontend\" \"python app.py\""
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

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
    poplist2=[{'item_id': 23, 'name': 'Pilau Rice', 'price': 2.95, 'popularity': 1.0, 'category': 'Starter', 'type': 'veg', 'img_url': 'https://source.unsplash.com/350x300/?Pilau-Rice'},{'item_id': 89, 'name': 'Plain Naan', 'price': 2.6, 'popularity': 0.79, 'category': 'Starter', 'type': 'veg', 'img_url': 'https://source.unsplash.com/350x300/?Plain-Naan'},{'item_id': 82, 'name': 'Plain Papadum', 'price': 0.8, 'popularity': 0.76, 'category': 'Others', 'type': 'veg', 'img_url': 'https://source.unsplash.com/350x300/?Plain-Papadum'}]
    
    catogorys=["Starter","Mains","Others"]
    bill={
        "total":55,
        "GST":-2,
        "discount":2
    }
    user={
        "name":"hari",
        "phone":684845646,
        "email":"harish@gmail.com"
    }
    auth={
        "verifyed":True
    }
    if data and  data["action"]=="catogorys":
        return jsonify(catogorys)
    
    if data and data["action"]=="bill":
        return jsonify(bill)
    if data and data["action"]=="sort":
        return jsonify(poplist[:2])
    if  data and data["action"]=="cart_recommend":
        return jsonify(poplist2)
    
    if data and data["action"]=="auth_signup":
        return jsonify(user)
    if data and data["action"]=="auth_login":
        return jsonify(auth)

    return jsonify(poplist)


