import pymongo
from bson.objectid import ObjectId
import pandas
import itertools
from fuzzywuzzy import process
import numpy
from scipy.spatial import distance

url = 'mongodb+srv://emmaykoushal:ATLemma2003@cluster0.6u3kv5t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
client = pymongo.MongoClient(url)

db = client['myMenu']

restaurant_collection = db['Restaurants']
orders_collection = db['Orders']
simitems_collection = db['SimItemsMatrix']
simusers_collection = db['SimUsersMatrix']
users_collection = db['Users']

simusers_collection.update_one({"restaurant_id": ObjectId("66378cd6bed0587fd82cabb3")}, {'$set':{'restaurant_id': ObjectId("6637aca14bfa08cf9527bfe5")}})

def PopularItems(restaurant_id):
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    item_popularity = {}
    for item in menu:
        item_popularity[item] = menu[item]['popularity']

    popular_item_ids = [k for k, v in sorted(item_popularity.items(), key=lambda item: item[1], reverse=True)[:10]]
    popular_items = {}
    for item_id in popular_item_ids:
        popular_items[item_id] = menu[item_id]
    return popular_items

def SearchItems(restaurant_id, input):
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    item_names = []
    for item in menu:
        item_names.append(menu[item]['name'])

    results = process.extract(input, item_names, limit=10)
    searched_item_names = []
    for result in results:
        searched_item_names.append(result[0])

    item_ids = []
    for item in searched_item_names:
        item_ids.append(item_names.index(item))
    searched_items = {}
    for item_id in item_ids:
        searched_items[str(item_id)] = menu[str(item_id)]

    return searched_items

def AddToCart(restaurant_id, user_id, item_id):
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    #user = users_collection.find_one({'id': user_id})
    users_collection.update_one({"id": user_id}, {"$push": {"cart": menu[str(item_id)]}})

    return menu[str(item_id)]

def RecommendedItems(restaurant_id, order_id):
    cosine_similarities = {}
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu'] 
    max_items = len(menu)
    orders_data = simusers_collection.find_one({"restaurant_id": ObjectId(restaurant_id)})
    #print(orders_data)
    del orders_data['_id']
    del orders_data['restaurant_id']

    selected_order_data = orders_data[order_id]
    selected_order_ratings = [0]*max_items
    for i in selected_order_data:
        selected_order_ratings[i] = 1
    
    for id in orders_data:
        temp = orders_data[id]
        temp_ratings = [0] * max_items
        for i in temp:
            temp_ratings[i] = 1
        
        cosine_sim = 1 - distance.cosine(selected_order_ratings, temp_ratings)
        cosine_similarities[id] = cosine_sim
    
    similar_orders_dist = sorted(cosine_similarities.items(), key=lambda item: item[1], reverse=True)[:10]
    similar_orders = {}
    for order in similar_orders_dist:
        similar_orders[order[0]] = orders_data[order[0]]
    
    return similar_orders

def PopupRecommendedItems(restaurant_id, item_id):
    cosine_similarities = {}
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu'] 
    item_ratings = simitems_collection.find_one({"restaurant_id": ObjectId(restaurant_id)})
    del item_ratings['_id']
    del item_ratings['restaurant_id']
    max_orders = len(orders_collection.find_one({"restaurant_id": "6637aca14bfa08cf9527bfe5"}))-2

    selected_item = item_ratings[item_id]
    selected_item_ratings = [0]*max_orders
    for i in selected_item:
        selected_item_ratings[i] = 1
    
    for id in item_ratings:
        temp = item_ratings[id]
        temp_ratings = [0] * max_orders
        for i in temp:
            temp_ratings[i] = 1
        
        cosine_sim = 1 - distance.cosine(selected_item_ratings, temp_ratings)
        cosine_similarities[id] = cosine_sim
    
    similar_items_dist = sorted(cosine_similarities.items(), key=lambda item: item[1], reverse=True)[:10]
    similar_items = {}
    for item in similar_items_dist:
        similar_items[item[0]] = menu[str(item[0])]
    
    return similar_items