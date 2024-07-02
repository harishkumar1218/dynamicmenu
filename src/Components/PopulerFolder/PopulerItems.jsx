
import React, { useRef, useEffect, useState } from 'react';
import "./PopulerItems.css"
import { CCard, CCardImage, CCardTitle, CButton, CCardImageOverlay, CCardText } from '@coreui/react'



const FPopulerItems = ({ itemList }) => {

  const [populerList, setPopulerList] = useState([]);
  const [, setState] = useState();
  const [cartItems, setCartItems] = useState({});
  const forceUpdate = () => setState({});
  const cardCountRefs = useRef({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "https://jsonplaceholder.typicode.com/posts";

  useEffect(()=>(setCartItems(window.localStorage.getItem('cart')!=null? JSON.parse(window.localStorage.getItem('cart')):{})),[window.localStorage.getItem('cart')])


  useEffect(() => {
    setPopulerList(itemList);
    setLoading(false)
  }, [itemList]);


  const handleIncrement = (index,ind ) => {
    cardCountRefs.current[index].count += 1;
    if (cartItems.hasOwnProperty(index)) {
      cartItems[index].count++;
      setCartItems(cartItems);
    } else {
      cartItems[index] = { ...populerList[ind], count: 1 };
    }
    window.localStorage.setItem("cart",JSON.stringify(cartItems));
    forceUpdate();
  };


  const handleDecrement = (index,ind) => {
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
  

  return (
    <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>

      {
        populerList.map((value, index) => {
          const item = value;
          if (!cardCountRefs.current[item.item_id]) {
            cardCountRefs.current[item.item_id] = { ref: null, count: cartItems[item.item_id]!=null?cartItems[item.item_id].count:0};
        }
        const count = cardCountRefs.current[item.item_id].count;

          return (
            <div key={index} ref={(el) => (cardCountRefs.current[item.item_id].ref = el)} style={{ borderRadius: "20px" }}>
              <CCard className="PopulerCard" style={{ borderRadius:"20px", display: "inline-block", color: 'white' }}>
                <CCardImage style={{borderRadius:"20px"}} className="PopulerCard" src={item.img_url} />
                <CCardImageOverlay style={{borderRadius:"20px",padding:"3px"}} className='CardOverlay'>
                  <div className="PopulerCardContent" >
                    <div className='cardName'>
                      <CCardTitle><h5>{item?.name}</h5></CCardTitle>
                    </div>
                    <div className="cardFooter">
                      <CCardText className="leftContent" style={{ display: 'inline-block', verticalAlign: 'middle' }}><h5>{item.type=="non-veg"?<img width="35" height="35" src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol"/>:<img width="35" height="35" src="https://img.icons8.com/color/48/vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol"/>}  ${item?.price}</h5></CCardText>
                      {
                        (count === 0) ? (
                          <CButton className='button-container' style={{ backgroundColor: "red", borderRadius: "12px" }} color="danger" onClick={() => handleIncrement(item.item_id,index)}>Add +</CButton>
                        ) : (
                          <div className="button-container">
                            <button style={{ backgroundColor: "transparent" }} onClick={() => handleDecrement(item.item_id,index)}>-</button>
                            <span>{count}</span>
                            <button style={{ backgroundColor: "transparent" }} onClick={() => handleIncrement(item.item_id,index)}>+</button>
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


