import "./App.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { LayoutPage } from "./Components/Layout";
import { GoogleLogin } from "@react-oauth/google";

import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";


const App = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("isLoggedIn"));
  const handleLoginSuccess = (credentialResponse) => {
    const decode = jwtDecode(credentialResponse?.credential);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userDetails", JSON.stringify(decode));
    setIsLoggedIn(true);
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed", error);
    localStorage.setItem("isLoggedIn", "false");
  };


  useEffect(()=>{
  },[isLoggedIn])
  return (

    <BrowserRouter>
        <LayoutPage />
      </BrowserRouter>
       
   
  );
};

export default App;
