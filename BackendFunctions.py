import pymongo
from bson.objectid import ObjectId
from fuzzywuzzy import process
from scipy.spatial import distance
import collections
from flask import Flask, request, jsonify
import math,random

url = 'mongodb+srv://emmaykoushal:ATLemma2003@cluster0.6u3kv5t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
client = pymongo.MongoClient(url)

db = client['myMenu']

restaurant_collection = db['Restaurants']
orders_collection = db['Orders']
simitems_collection = db['SimItemsMatrix']
simusers_collection = db['SimUsersMatrix']
users_collection = db['Users']

simusers_collection.update_one({"restaurant_id": ObjectId("6637aca14bfa08cf9527bfe5")}, {'$set':{'restaurant_id': ObjectId("6637aca14bfa08cf9527bfe5")}})

def PopularItems(inputs):
    #done
    restaurant_id = inputs['restaurant_id']
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    item_popularity = {}
    for item in menu:
        item_popularity[item] = menu[item]['popularity']

    popular_item_ids = [k for k, v in sorted(item_popularity.items(), key=lambda item: item[1], reverse=True)[:10]]
    popular_items = []
    for item_id in popular_item_ids:
        popular_items.append(menu[item_id])
    return jsonify(popular_items)

def Combo(inputs):
    #not a actual code. needed to be updated
    restaurant_id = inputs['restaurant_id']
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    item_combo = {}
    for item in menu:
        item_combo[item] = menu[item]['popularity']

    combo_item_ids = [k for k, v in sorted(item_combo.items(), key=lambda item: item[1], reverse=False)]
    combo_items = []
    random.shuffle(combo_item_ids)
    for item_id in combo_item_ids[11:21]:
        combo_items.append(menu[item_id])
    return jsonify(combo_items)


def SearchItems(inputs):
    #done
    restaurant_id = inputs['restaurant_id']
    input = inputs['input']
   
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    item_names = []
    for item in menu:
        item_names.append(menu[item]['name'])
        
    matches = process.extract(input, item_names, limit=len(item_names))
    results = [(item_names.index(match[0]), match[0], match[1]) for match in matches if match[1] >= 70]
    final=[]
    for result in results:
        final.append(menu[str(result[0])])
    return jsonify(final)

    # results = process.extract(input, item_names, limit=10)

    
    # searched_item_names = []
    # for result in results:
    #     searched_item_names.append(result[0])

    # item_ids = []
    # for item in searched_item_names:
    #     item_ids.append(item_names.index(item))
    # searched_items = []
    # for item_id in item_ids:
    #     searched_items.append(menu[str(item_id)])

    # return jsonify(searched_items)

def AddToCart(inputs):
    #not requesting from frontend
    restaurant_id = inputs['restaurant_id']
    user_id = inputs['user_id']
    item_id = inputs['item_id']
    cart=inputs['cartItems']
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    # user = users_collection.find_one({'id': user_id})
    users_collection.update_one({"id": user_id}, {"$set": {"cart": cart}})

    return jsonify(menu[str(item_id)])

def ShowCartItems(inputs):
    #not used
    user_id = inputs['user_id']
    items = users_collection.find_one({'id': user_id})['cart']
    cart_items = {}
    for i in range(len(items)):
        cart_items[items[i]['item_id']] = items[i]
    return jsonify(cart_items)

def RecommendedItems(inputs):
    #needed to be updated
    # restaurant_id = inputs['restaurant_id']
    # order_id = str(inputs['user_id'])
    # cosine_similarities = {}
    # menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu'] 
    # max_items = len(menu)
    # orders_data = simusers_collection.find_one({"restaurant_id": ObjectId(restaurant_id)})
    # #print(orders_data)
    # del orders_data['_id']
    # del orders_data['restaurant_id']

    # selected_order_data = orders_data[order_id]
    # selected_order_ratings = [0]*max_items
    # for i in selected_order_data:
    #     selected_order_ratings[i] = 1
    
    # for id in orders_data:
    #     temp = orders_data[id]
    #     temp_ratings = [0] * max_items
    #     for i in temp:
    #         temp_ratings[i] = 1
        
    #     cosine_sim = 1 - distance.cosine(selected_order_ratings, temp_ratings)
    #     cosine_similarities[id] = cosine_sim
    
    # similar_orders_dist = sorted(cosine_similarities.items(), key=lambda item: item[1], reverse=True)[:10]
    # similar_orders = {}
    # for order in similar_orders_dist:
    #     similar_orders[order[0]] = orders_data[order[0]]
    # return jsonify([x for x in similar_orders.values()])
    restaurant_id = inputs['restaurant_id']
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    item_recomended = {}
    for item in menu:
        item_recomended[item] = menu[item]['popularity']

    recomended_item_ids = [k for k, v in sorted(item_recomended.items(), key=lambda item: item[1], reverse=False)]
    recomended_items = []
    random.shuffle(recomended_item_ids)
    for item_id in recomended_item_ids[:10]:
        recomended_items.append(menu[item_id])
    return jsonify(recomended_items)

def PopupRecommendedItems(inputs):
    #Not in use
    restaurant_id = inputs['restaurant_id']
    item_id = inputs['item_id']

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
    
    return jsonify(similar_items)

def SortFilterItems(inputs):
    #Not Usefull
    restaurant_id = inputs['restaurant_id']
    sort_by = inputs['sort_by']
    sequence = inputs['sequence']
    filter_by = inputs['filter_by']

    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    filtering_criteria = ['veg', 'non-veg']
    sorting_criteria = ['price', 'popularity']
    sequence_map = {'low-high': False, 'high-low': True}
    filtered_menu = []
    if filter_by in filtering_criteria:
        for item_id in menu:
            if menu[item_id]['type'] == filter_by:
                filtered_menu.append(menu[item_id])
    else:
        print("[ERROR] Invalid filter")

    sorted_menu = sorted(filtered_menu, key=lambda x:x['price'], reverse=sequence_map[sequence])
    filtred_sorted_menu = {}
    for item in sorted_menu:
        filtred_sorted_menu[str(item['item_id'])] = item
    
    return jsonify(filtred_sorted_menu)


def GetCategories(inputs):
    #Not usefull
    # restaurant_id = inputs['restaurant_id']
    # menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    # categories = []
    # for item in menu:
    #     if menu[item]['category'] not in categories:
    #         categories.append(menu[item]['category'])
    
    #https://cdn4.iconfinder.com/data/icons/food-and-beverages/512/Food_Beverages_drink_container_soda-512.png
    categories=[
        {"item1":{"name":"Side Dish","img_url":"https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be010ef31678798444.jpeg"},"item2":{"name":"Beverages","img_url":"https://images.immediate.co.uk/production/volatile/sites/30/2020/01/retro-cocktails-b12b00d.jpg?resize=768,574"}},
        {"item1":{"name":"Starter","img_url":"https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png"},"item2":{"name":"Cake","img_url":"https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png"}}, 
        {"item1":{"name":"Main","img_url":"https://b.zmtcdn.com/data/o2_assets/e444ade83eb22360b6ca79e6e777955f1632716661.png"},"item2":{"name":"Dessert","img_url":"https://b.zmtcdn.com/data/o2_assets/4c7697178c268c50e1b1641fca205c231634401116.png"}}
        ]
    
    return jsonify(categories)

def CartRecommend(inputs):
    restaurant_id = inputs['restaurant_id']
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    #Dessert
    #Beverages
    recomendlist=[]
    for key in menu:
        if menu[key]["category"]=="Dessert" or menu[key]["category"]=="Beverages":
            recomendlist.append(menu[key])
    random.shuffle(recomendlist)
    return jsonify(recomendlist[:10])


def GetMenu(inputs):
    restaurant_id = inputs['restaurant_id']
    menu = restaurant_collection.find_one({"_id": ObjectId(restaurant_id)})['menu']
    final_menu=collections.defaultdict(list)
    for key in menu:
        final_menu[menu[key]['category']].append(menu[key])
    
    return jsonify(final_menu)


def GetBill(inputs):
    bill={
        "total":0,
        "GST":4.9,
        "discount":2
    }
    return jsonify(bill)

def SetUser(inputs):
    name=inputs['name']
    if "phoneNumber" not in inputs:
        gmail=inputs['gmail']
        users_collection.update_many({}, {"$push": {"id": gmail,"name":name,"gmail":gmail,"cart": {}}})
    phone_number=inputs['phoneNumber']
    users_collection.update_many({}, {"$push": {"id": phone_number,"name":name,"phone_number":phone_number,"cart": {}}})
    return jsonify(inputs)


def GetUser(inputs):
    auth={
        "verifyed":True
    }
    return jsonify(auth)


