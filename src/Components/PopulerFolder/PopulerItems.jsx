
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import "./PopulerItems.css"
import { CCard, CCardImage, CCardTitle, CButton, CCardImageOverlay, CCardText, CPlaceholder, } from '@coreui/react'
import userEvent from '@testing-library/user-event';


const FPopulerItems = ( {itemList} ) => {
  console.log("pop");
  console.log(itemList);

  const [populerList, setpopulerList] = useState({});
  const [, setState] = useState();
  const [cartItems, setcartItems] = useState({});
  const forceUpdate = () => setState({});
  const cardCountRefs = useRef([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "https://jsonplaceholder.typicode.com/posts";
  

  useLayoutEffect(() => {
    setpopulerList(itemList);
    if(populerList){
      setLoading(false);
    }
  },[populerList]);
  useLayoutEffect(() => {
    if(populerList){
    cardCountRefs.current = Object.keys(populerList).map((key, index) => cardCountRefs.current[index] || { count: 0 });
    
    }
  }, [populerList, cartItems]);


  console.log(populerList);

  const handleIncrement = (index, key) => {
    cardCountRefs.current[index].count += 1;
    if (cartItems.hasOwnProperty(index)) {
      cartItems[index].count++;
      setcartItems(cartItems);
    } else {
      cartItems[index] = { ...populerList[index], count: 1 };
    }
    forceUpdate();


  };

  const handleDecrement = (index, key) => {
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


  return (
    (loading && populerList==null ) ?
      (
        <div>
          <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>
            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
          </div>
        </div>
      ) : (

        <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>

          {Object.keys(populerList).map((key, index) => {
            const item = populerList[key];
            if (!cardCountRefs.current[index]) {
              cardCountRefs.current[index] = { ref: null, count: 0 };
            }
            const count = cardCountRefs.current[index].count;
            return (
              <div key={index} ref={(el) => (cardCountRefs.current[index].ref = el)} style={{ borderRadius: "20px" }}>
                <CCard className="PopulerCard" style={{ display: "inline-block", color: 'white' }}>
                  <CCardImage className="PopulerCard" src={item?.imgUrl} />
                  <CCardImageOverlay className='CardOverlay'>
                    <div className="PopulerCardContent">
                      <div className='cardName'>
                        <CCardTitle>{item?.name}</CCardTitle>
                      </div>
                      <div className="cardFooter">
                        <CCardText className="leftContent" style={{ display: 'inline-block', verticalAlign: 'middle' }}>${item?.price}</CCardText>
                        {
                          (count === 0) ? (
                            <CButton className='button-container' style={{ backgroundColor: "red", borderRadius: "12px" }} color="danger" onClick={() => handleIncrement(index)}>Add +</CButton>
                          ) : (
                            <div className="button-container">
                              <button style={{ backgroundColor: "transparent" }} onClick={() => handleDecrement(index, key)}>-</button>
                              <span>{count}</span>
                              <button style={{ backgroundColor: "transparent" }} onClick={() => handleIncrement(index, key)}>+</button>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </CCardImageOverlay>
                </CCard>
              </div>
            );
          })}
        </div>

      ));
}
export { FPopulerItems }


