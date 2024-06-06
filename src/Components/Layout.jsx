import React, { useEffect } from 'react';
import { FCart } from './Cart';
import { HomePage } from "./Home";
import { FMenuNav } from "./MenuFolder/Menu";
import { useState,createContext } from "react";
import { FSearch } from './SearchFolder/searchbar';
import { FFooter } from "./FooterFolder/FooterItems";
import { ScrollToTopOnPageChange } from "./ScrollToTop";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from './Temp';
import LoginPage from './Authentication/LoginPage';
import SignUpPage from './Authentication/SignUpPage';

const data = {};

export const CartContext = createContext();

const LayoutPage = () =>{

  const [cartData, setCartData] = useState(data);

  const location = useLocation();
  const isFooterVisible = location.pathname !== "/" && location.pathname !== "/signup";
  return (
    <CartContext.Provider value={{cartData,setCartData}}>
          <ScrollToTopOnPageChange />
          <Routes>
          <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignUpPage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/menu" element={<FMenuNav />} />
            <Route exact path="/search" element={<FSearch />} />
            <Route exact path="/cart" element={<FCart />} />
       
          </Routes>
          {
            isFooterVisible && <FFooter />
          }

      
    </CartContext.Provider>
  );
};



export { LayoutPage };