import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { FaIndianRupeeSign, FaSearchengin } from "react-icons/fa6";
import { CNavbar, CInputGroup, CSpinner, CFormInput, CButton } from '@coreui/react'

import './Search.css';
import "../MenuFolder/menu.css";


const FSearch = () => {

  const [searchQueue, setSearchQueue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const suggetionList = ["Biryani", "Panipuri", "Pizza"];
  const [searchResult, setSearch] = useState([]);
  const [, setState] = useState();
  const [cartItems, setCartItems] = useState({});
  const forceUpdate = () => setState({});
  const cardCountRefs = useRef({});
  

  useEffect(()=>(setCartItems(window.localStorage.getItem('cart')!=null? JSON.parse(window.localStorage.getItem('cart')):{})),[window.localStorage.getItem('cart')])

  useEffect( () => {
    const find=async()=> {
    if (searchQueue) {
      setLoading(true);
      
      const searchRequest = {
      
        inputs:
        {
          restaurant_id: "6637aca14bfa08cf9527bfe5",
          input: searchQueue
        },
        action: "search"
      }

      try {
        const response = await axios.post("https://dynamicmenu.onrender.com/home", searchRequest, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const searchResult = response.data;
        setLoading(false)
        if (searchResult) setSearch(searchResult);

      } catch (error) {
        console.log(error);
      }
    }
  }
  find();

  }, [searchQueue]);


  const handleIncrement = (index) => {
    cardCountRefs.current[index].count += 1;
    if (cartItems.hasOwnProperty(index)) {
      cartItems[index].count++;
      setCartItems(cartItems);
    } else {
      cartItems[index] = { ...searchResult[index], count: 1 };
    }
    window.localStorage.setItem("cart",JSON.stringify(cartItems));
    forceUpdate();
  };

  const handleDecrement = (index) => {
    if (cardCountRefs.current[index].count > 0) {
      cardCountRefs.current[index].count -= 1;
      if (index in cartItems) {
        cartItems[index].count--;
        if (cartItems[index].count <= 0) {
          delete cartItems[index];
        }
        setCartItems(cartItems);
      }
      forceUpdate();
    }

  };

  const handleInputChange = (e) => {
    setSearchQueue(e.target.value);
  };


  return (
    <div style={{marginBottom:120}}>
      <div>
        <CNavbar className="bg-body-tertiary" >
          <div className="container-fluid">
            <CInputGroup >
              <CButton id="basic-addon1" style={{ width: "39px", height: "39px", marginRight: "2px", borderRadius: '50%', cursor: "pointer", boxShadow: "0 0 5px rgb(200, 200, 200)" }}>
                {loading ? (<CSpinner size="sm" color="danger" />) : (<FaSearchengin />)}
              </CButton>
              <CFormInput ref={inputRef} onChange={handleInputChange} type="text" placeholder="Search" style={{ borderRadius: '20px' }} />
            </CInputGroup>
          </div>
        </CNavbar>
      </div>
      <div >
      {
        (searchQueue == "") ?
          (
            <div>
              <div style={{ paddingLeft: "5px" }}>Popular Searches</div>
              <hr />
              <div style={{ paddingLeft: "7px" }}>
                {suggetionList.map((val, ind) => (
                  <div onClick={() => { inputRef.current.value = val; setSearchQueue(val) }}><FaSearchengin />{val}</div>
                ))}
              </div>
            </div>
          ) :
          searchResult.map((value, index) => {

            const item = value;
            if (!cardCountRefs.current[index]) {
              cardCountRefs.current[index] = { ref: null, count: cartItems[item.item_id]!=null?cartItems[item.item_id].count:0 };
            }
            const count = cardCountRefs.current[index].count;
            return (
              <div className="searchCard">
                <img src={item.img_url} className="searchImage" alt="Card" />
                <div className="searchCardDetails">
                <h5>{item.name}</h5>
                <p>{item.type=="non-veg"?<img width="35" height="35" src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol"/>:<img width="35" height="35" src="https://img.icons8.com/color/48/vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol"/>}{item.type}</p>
                                    
                </div>
                <div className="searchCardFooter">
                  <span style={{ fontWeight: "bold" }}>${item.price}</span>
                  {(count === 0) ? (
                    <CButton className='AddButton' style={{ backgroundColor: "red", borderRadius: "12px" }} color="danger" onClick={() => handleIncrement(index)}>Add +</CButton>
                  ) : (
                    <div style={{ color: "white", height: "40px" }} className="button-container">
                      <button style={{ backgroundColor: "transparent" }} onClick={() => handleDecrement(index)}>-</button>
                      <span>{count}</span>
                      <button style={{ backgroundColor: "transparent" }} onClick={() => handleIncrement(index)}>+</button>
                    </div>
                  )
                  }
                </div>
              </div>
            )
          })}
        </div>
    </div>
  );
}
export { FSearch }