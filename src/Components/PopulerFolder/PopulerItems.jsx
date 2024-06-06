
import React, { useRef, useEffect, useState } from 'react';
import "./PopulerItems.css"
import { CCard, CCardImage, CCardTitle, CButton, CCardImageOverlay, CCardText } from '@coreui/react'



const FPopulerItems = ({ itemList }) => {

  const [populerList, setPopulerList] = useState([]);
  const [, setState] = useState();
  const [cartItems, setcartItems] = useState({});
  const forceUpdate = () => setState({});
  const cardCountRefs = useRef({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "https://jsonplaceholder.typicode.com/posts";


  useEffect(() => {
    setPopulerList(itemList);
    setLoading(false)
  }, [itemList]);


  useEffect(() => {
    if (populerList.length > 0) {
      cardCountRefs.current = populerList.map((_, index) => cardCountRefs.current[index] || { count: 0 });
    }
  }, [populerList]);


  const handleIncrement = (index) => {
    cardCountRefs.current[index].count += 1;
    if (cartItems.hasOwnProperty(index)) {
      cartItems[index].count++;
      setcartItems(cartItems);
    } else {
      cartItems[index] = { ...populerList[index], count: 1 };
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
  

  return (
    <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>

      {
        populerList.map((value, index) => {
          const item = value;

          if (!cardCountRefs.current[index]) {
            cardCountRefs.current[index] = { ref: null, count: 0 };
          }
          const count = cardCountRefs.current[index].count;
          return (
            <div key={index} ref={(el) => (cardCountRefs.current[index].ref = el)} style={{ borderRadius: "20px" }}>
              <CCard className="PopulerCard" style={{ borderRadius:"20px", display: "inline-block", color: 'white' }}>
                <CCardImage style={{borderRadius:"20px"}} className="PopulerCard" src={item.img_url} />
                <CCardImageOverlay style={{borderRadius:"20px",padding:"3px"}} className='CardOverlay'>
                  <div className="PopulerCardContent" >
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
                            <button style={{ backgroundColor: "transparent" }} onClick={() => handleDecrement(index)}>-</button>
                            <span>{count}</span>
                            <button style={{ backgroundColor: "transparent" }} onClick={() => handleIncrement(index)}>+</button>
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

  );
}
export { FPopulerItems }


