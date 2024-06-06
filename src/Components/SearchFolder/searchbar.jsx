
import React, { useEffect, useRef, useState } from 'react';
import { FaIndianRupeeSign, FaSearchengin } from "react-icons/fa6";
import { CNavbar, CInputGroup, CSpinner, CFormInput, CButton } from '@coreui/react'

import './Search.css'
import useCachedFetch from '../../customhooksFolder/useFetch';



const FSearch = () => {

  const [searchQueue, setSearchQueue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const suggetionList = ["Biryani", "Panipuri", "Pizza"];
  const [searchResult, setSearch] = useState([]);
  const [, setState] = useState();
  const [cartItems, setcartItems] = useState({});
  const forceUpdate = () => setState({});
  const cardCountRefs = useRef({});

  const searchRequest = {
    inputs:
    {
      restaurant_id: "66378cd6bed0587fd82cabb3",
      user: "hari"
    },
    action: "search"
  }

  const { data: searchData, loading: searchLoading, error: searchError } = useCachedFetch("data", searchRequest);
  useEffect(() => {
    if (searchData) setSearch(searchData);
  }, [searchData]);


  useEffect(() => {
    if (searchQueue) {
      setLoading(true);
      fetch(`https://api.example.com/search?q=${searchQueue}`)
        .then(response => response.json())
        .then(data => {
          setLoading(false);
          console.log(data);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error fetching data:', error);
        });
    }

  }, [searchQueue]);


  const handleIncrement = (index) => {
    cardCountRefs.current[index].count += 1;
    if (cartItems.hasOwnProperty(index)) {
      cartItems[index].count++;
      setcartItems(cartItems);
    } else {
      cartItems[index] = { ...searchResult[index], count: 1 };
    }
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
        setcartItems(cartItems);
      }
      forceUpdate();
    }

  };

  const handleInputChange = (e) => {
    setSearchQueue(e.target.value);
  };


  return (
    <div>
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
              cardCountRefs.current[index] = { ref: null, count: 0 };
            }
            const count = cardCountRefs.current[index].count;
            return (
              <div className="searchCard">
                <img src={item.img_url} className="searchImage" alt="Card" />
                <div className="searchCardDetails">
                  <h3>{item.name}</h3>
                  <p>{item.type}</p>
                </div>
                <div className="searchCardFooter">
                  <span style={{ fontWeight: "bold" }}><FaIndianRupeeSign />{item.price}</span>
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
  );
}
export { FSearch }