import Bill from './Bill';
import React, { useState, useRef, useEffect } from 'react';
import { FaIndianRupeeSign, FaCartShopping } from "react-icons/fa6";
import { CNavbar, CCard, CCol, CContainer, CCardImage, CCardBody, CNavbarBrand, CButton } from '@coreui/react';

import './SearchFolder/Search.css'
import useCachedFetch from '../customhooksFolder/useFetch';

const FCart = () => {
    const [recomendedDeeserts, setRecommendedDesserts] = useState([]);
    const [, setState] = useState();
    const [cartItems, setCartItems] = useState({});
    const forceUpdate = () => setState({});
    const cardCountRefs = useRef({});

    useEffect(() => (setCartItems(localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : {})), [localStorage.getItem('cart')])


    const uploadCartRequest = {
        inputs:
        {
            restaurant_id: "6637aca14bfa08cf9527bfe5",
            user: "hari"
        },
        action: "cart"
    }
    const recommendedRequest = {
        inputs:
        {
            restaurant_id: "6637aca14bfa08cf9527bfe5",
            user: "hari"
        },
        action: "cart_recommend"
    }


    const { data: recomendedData, loading: recomendedDataLoading, error: recomendedDataError } = useCachedFetch("home", recommendedRequest);
    useEffect(() => {
        if (recomendedData) {
            const tempCart = []
            recomendedData.map((val) => {
                if (!(val.item_id in cartItems)) { tempCart.push(val);}
            })
            setRecommendedDesserts(tempCart);
        };
    }, [recomendedData]);



    const handleIncrement = (index, key) => {

        cardCountRefs.current[index].count += 1;
        if (cartItems.hasOwnProperty(index)) {
            cartItems[index].count++;
            setCartItems(cartItems);
            localStorage.setItem("cart", JSON.stringify(cartItems));

        }
        // else {
        //     cartItems[index] = { ...cart[key], count: 1 };
        //     localStorage.setItem("cart",JSON.stringify(cartItems));
        // }
        forceUpdate();
    };


    const handleDecrement = (index, key) => {
        const updatedCartItems = { ...cartItems };
        if (cardCountRefs.current[index].count > 0) {
            cardCountRefs.current[index].count -= 1;
        }
        if (updatedCartItems[index] && updatedCartItems[index].count > 0) {
            updatedCartItems[index].count -= 1;

            if (updatedCartItems[index].count === 0) {
                delete updatedCartItems[index];
            }
            setCartItems(updatedCartItems);
            localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        }
        forceUpdate();
    };



    const handleIncrementBeverages = (index, value, ind) => {
        const newCartItems = { ...cartItems };

        if (newCartItems.hasOwnProperty(index)) {
            newCartItems[index.toString()].count++;
        } else {
            newCartItems[index.toString()] = { ...value, count: 1 };
        }
        setCartItems(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));

        setRecommendedDesserts((prevDesserts) =>
            prevDesserts.filter((_, i) => i !== ind)
        );

    };



    return (
        <div style={{ backgroundColor: "#ededed", paddingBottom: 70 }}>
            <CNavbar className="bg-body-tertiary">
                <CContainer breakpoint="md">
                    <CNavbarBrand style={{ fontSize: "22px" }}> <FaCartShopping color='red' /> Cart</CNavbarBrand>
                </CContainer>
            </CNavbar>
            <div>
                {
                    Object.keys(cartItems).map((key, index) => {
                        const item = cartItems[key];
                        if (!cardCountRefs.current[item.item_id]) {
                            cardCountRefs.current[item.item_id] = { ref: null, count: cartItems[item.item_id] != null ? cartItems[item.item_id].count : 0 };
                        }
                        const count = cartItems[item.item_id]?.count | 0;
                        return (
                            <div className="searchCard">
                                <img src={item.img_url} className="searchImage" alt="Card" />
                                <div className="searchCardDetails">
                                    <h5>{item.name}</h5>
                                    <p>{item.type=="non-veg"?<img width="35" height="35" src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol"/>:<img width="35" height="35" src="https://img.icons8.com/color/48/vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol"/>}{item.type}</p>
                                    
                                </div>
                                <div className="searchCardFooter">
                                    <span style={{ fontWeight: "bold" }}>${item.price}</span>
                                    {(count == 0) ? (
                                        <CButton className='AddButton' style={{ backgroundColor: "red", borderRadius: "12px" }} color="danger" onClick={() => handleIncrement(item.item_id.toString(), index)}>Add +</CButton>
                                    ) : (
                                        <div style={{ color: "white", height: "40px" }} className="button-container">
                                            <button style={{ backgroundColor: "transparent" }} onClick={() => handleDecrement(item.item_id, index)}>-</button>
                                            <span>{count}</span>
                                            <button style={{ backgroundColor: "transparent" }} onClick={() => handleIncrement(item.item_id, index)}>+</button>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {recomendedDeeserts.length > 0 ?
                <div style={{ fontFamily: '"Times New Roman", serif', display: "flex", justifyContent: "center" }}>
                    <h4>Frequently Bought Together</h4>
                </div> : null
            }
            <div className="scroll-container" style={{ backgroundColor: "white", borderRadius: "20px 0px 0px 20px", whiteSpace: "wrap", paddingTop: "10px", paddingLeft: "10px", marginLeft: "8px" }}>
                {recomendedDeeserts.map((value, index) => {
                    const recomendedItem = value;
                    if (!cardCountRefs.current[recomendedItem.item_id]) {
                        cardCountRefs.current[recomendedItem.item_id] = { ref: null, count: 0 };
                    }
                    const count = 0;
                    return (
                        <CCol xs style={{ height: "auto" }}>
                            <CCard style={{ border: "0px", padding: "0px", width: '155px', height: "auto" }}>
                                <CCardImage style={{ borderRadius: "20px" }} className="CartcardImage" orientation="top" src={recomendedItem.img_url} />
                                <div className='cardFooter' style={{ padding: "0px", alignItems: "flex-end" }}>
                                    <div style={{ whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingLeft: "10px", width: "100%" }}>
                                        <div style={{ color: "black", fontWeight: "bold", wordWrap: 'break-word', width: "100%" }}>{recomendedItem.name}</div>
                                    </div>
                                </div>
                                <CCardBody style={{ whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "3px 0px 0px 3px", width: "100%", height: "auto" }}>
                                    <div style={{ fontWeight: "bold", wordWrap: 'break-word', width: "50%" }}>${recomendedItem.price}  </div>

                                    {(count === 0) ? (
                                        <CButton style={{ marginBottom: "5px", fontWeight: "bold", boxShadow: "0 4px 6px rgb(150, 150, 150)", color: "white", width: "40%", height: "100%", backgroundColor: "red" }} onClick={() => handleIncrementBeverages(recomendedItem.item_id, value, index)} >Add</CButton>
                                    ) : null
                                    }
                                </CCardBody>
                            </CCard>
                        </CCol>
                    )
                })}
            </div>
            <div>
                <div style={{ ffontFamily: '"Times New Roman", serif', padding: "10px", display: "flex", justifyContent: "center" }}>
                    <h5>BILL SUMMRY</h5>
                </div>
                <Bill />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <CButton style={{ color: "white", backgroundColor: "red", width: "90%", height: "50px", borderRadius: "10px", border: "10px" }} >Payment</CButton>
            </div>

        </div >
    );
}
export { FCart }