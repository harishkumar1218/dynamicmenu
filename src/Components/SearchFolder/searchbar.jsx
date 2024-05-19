
import React, { useEffect, useRef, useState } from 'react';
import { FaSearchengin } from "react-icons/fa6";
import { CNavbar, CInputGroup, CSpinner, CFormInput, CButton } from '@coreui/react'

import './Search.css'



const FSearch = () => {
  const [count, setCount] = useState(0);
  const [searchQueue, setSearchQueue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const suggetionList = ["Biryani", "Panipuri", "Pizza"];
  const searchResultList = {
    0: { catogory_id: 0, item_id: 12, name: "xyz", imgUrl: "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", price: 99, discriptcs: "chisee and spisy" },
    1: { catogory_id: 1, item_id: 15, name: "abc", imgUrl: "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", price: 99, discriptcs: "chisee and spisy" }
  };

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


  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
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
          ) : null
      }

      {
       Object.keys(searchResultList).map((key) => {
          const item = searchResultList[key];
          return (
            <div className="searchCard">
              <img src={"https://rp-media.faasos.io/catalog/images/HNYSDPDQZPKU.jpeg?d=375&tr:w-0.5,h-0.5"} className="searchImage" alt="Card" />
              <div className="searchCardDetails">
                <h5>{item.name}</h5>
                <p>{item.discriptcs}</p>
              </div>
              <div className="searchCardFooter">
                <span>${item.price}</span>
                {
                  (count == 0) ?
                    (
                      <button className='AddButton' style={{ backgroundColor: "red" }} onClick={() => setCount(count + 1)}>Add</button>
                    ) : (
                      <div className="button-container">
                        <button onClick={handleDecrement}>-</button>
                        <span>{count}</span>
                        <button onClick={handleIncrement}>+</button>
                      </div>
                    )
                }
              </div>
            </div>)
        })};
    </div>
  );
}
export { FSearch }