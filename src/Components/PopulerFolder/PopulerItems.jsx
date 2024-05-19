
import React, { useRef, useState } from 'react';
import "./PopulerItems.css"
import { CCard, CCardImage, CCardTitle, CButton, CCardImageOverlay, CCardText, CPlaceholder, } from '@coreui/react'
import useCachedFetch from '../../customhooksFolder/useFetch';


const FPopulerItems = ({ img }) => {

  const [count, setCount] = useState(0);
  const cardRef=[useRef(null),useRef(null)];
  const url = "https://jsonplaceholder.typicode.com/posts";
  const { data, loading, error } = useCachedFetch(url);

  const populerList = {
    0: { catogory_id: 0, item_id: 12, name: "xyz", imgUrl: "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", price: 99, discriptcs: "chisee and spisy",count:0 },
    1: { catogory_id: 1, item_id: 15, name: "abc", imgUrl: "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", price: 99, discriptcs: "chisee and spisy",count:0 }
  };

 const cartItems={
  0: { catogory_id: 0, item_id: 12, name: "xyz", imgUrl: "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", price: 99, discriptcs: "chisee and spisy",count:1 },
 };

  const handleIncrement = (key) => {
    setCount(count + 1);
  };

  const handleDecrement = (key) => {
    if (count > 0) {
      setCount(count - 1);
    }
  };


  

  return (
    (loading) ?
      (
        <div>
          <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>
            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
          </div>
        </div>
      ) : (

        <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>
          {Object.keys(populerList).map((key) => {
            const item = populerList[key];
            return (
              <div style={{ borderRadius: "20px" }}>
                <CCard className="PopulerCard" style={{ display: "inline-block", color: 'white' }}>
                  <CCardImage className="PopulerCard" src={item.imgUrl} />
                  <CCardImageOverlay className='CardOverlay'>
                    <div className="PopulerCardContent">
                      <div className='cardName'>
                        <CCardTitle >{item.name}</CCardTitle>
                      </div>
                      <div className="cardFooter">
                        <CCardText className="leftContent" style={{ display: 'inline-block', verticalAlign: 'middle' }}>${item.price}</CCardText>
                        {
                          (count == 0) ?
                            (
                              <CButton className='button-container' style={{backgroundColor:"red", borderRadius:"12px"}} color="danger" onClick={() => setCount(count + 1)}>Add +</CButton>

                            ) : (
                              <div className="button-container">
                                <button style={{backgroundColor:"transparent"}} onClick={handleDecrement}>-</button>
                                <span>{count}</span>
                                <button style={{backgroundColor:"transparent"}} onClick={handleIncrement}>+</button>
                              </div>
                            )
                        }
                      </div>
                    </div>
                  </CCardImageOverlay>
                </CCard>
              </div>
            )
          })}
        </div>

      ));
}
export { FPopulerItems }


