import React from 'react';
import { FCart } from './Cart';
import { HomePage } from "./Home";
import { FMenuNav } from "./MenuFolder/Menu";
import { useState,createContext } from "react";
import { FSearch } from './SearchFolder/searchbar';
import { FFooter } from "./FooterFolder/FooterItems";
import { ScrollToTopOnPageChange } from "./ScrollToTop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './Temp';
import LoginPage from './Authentication/LoginPage';
import SignUpPage from './Authentication/SignUpPage';

const data = {
  123:{
    itemId: 123,
    itemName: "Margherita",
    cost: 109,
    imgUrl: "john@https://www.dominos.co.in/store-location/img/image1.jpg",
    type: "veg",

    category: "pizza",
  },
  124:{
    itemId: 124,
    ItemName: "McFlurry Oreo",
    cost: 129,
    imgUrl:
      "https://c38blhej2h.execute-api.ap-south-1.amazonaws.com/dev/png/456/FLOREO-3-1-3.png",
    type: "veg",
    category: "dessert",
  },
  125:{
    itemId: 125,
    ItemName: "Paneer Makhmali with Flavorful Rice",
    cost: 269,
    imgUrl:
      "https://rp-media.faasos.io/catalog/images/HNYSDPDQZPKU.jpeg?d=375&tr:w-0.5,h-0.5",
    type: "veg",
    category: "rice",
  },
  126:{
    itemId: 126,
    ItemName: "Pesto Chicken Paradiso Medium Pizza",
    cost: 550,
    imgUrl:
      "https://rp-media.faasos.io/catalog/images/IFL1SLJBOJXA.jpeg?d=375&tr:w-0.5,h-0.5",
    type: "nonveg",
    category: "pizza",
  },
  127:{
    itemId: 127,
    ItemName: "Sabudana Paratha & Paneer Makhmali Vrat Thali",
    cost: 349,
    imgUrl:
      "https://rp-media.faasos.io/catalog/images/KZ7VNKASIBMM.jpeg?d=375&tr:w-0.5,h-0.5",
    type: "veg",
    category: "rice",
  },
  128:{
    itemId: 128,
    ItemName: "Chocolate Truffle Pastry",
    cost: 349,
    imgUrl:
      "https://rp-media.faasos.io/catalog/images/1QYGZOVPHXTS.jpeg?d=375&tr:w-0.5,h-0.5",
    type: "veg",
    category: "dessert",
  }
};

export const CartContext = createContext();

const LayoutPage = () =>{
  const [cartData, setCartData] = useState(data);
  return (
    <CartContext.Provider value={{cartData,setCartData}}>
      <BrowserRouter>
          <ScrollToTopOnPageChange />
          <Routes>
          {/* <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignUpPage />} /> */}
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/menu" element={<FMenuNav />} />
            <Route exact path="/search" element={<FSearch />} />
            <Route exact path="/cart" element={<FCart />} />
          </Routes>
          <FFooter />
      </BrowserRouter>
    </CartContext.Provider>
  );
};



export { LayoutPage };