import Bill from './Bill';
import React, { useState, useRef, useEffect } from 'react';
import { FaIndianRupeeSign, FaCartShopping } from "react-icons/fa6";
import { CNavbar, CCard, CCol, CContainer, CCardImage, CCardBody, CNavbarBrand, CButton } from '@coreui/react';

import './SearchFolder/Search.css'
import useCachedFetch from '../customhooksFolder/useFetch';

const FCart = () => {
    const [cart, setCart] = useState([]);
    const [recomendedDeeserts, setRecommendedDesserts] = useState([]);
    const [, setState] = useState();
    const [cartItems, setCartItems] = useState({});
    const forceUpdate = () => setState({});
    const cardCountRefs = useRef({});


    const cartRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "cart"
    }
    const recommendedRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "cart_recommend"
    }


    const { data: cartData, loading: populerLoading, error: populerError } = useCachedFetch("home", cartRequest);
    useEffect(() => {
        if (cartData) setCart(cartData);
    }, [cartData]);

    const { data: recomendedData, loading: recomendedDataLoading, error: recomendedDataError } = useCachedFetch("home", recommendedRequest);
    useEffect(() => {
        if (recomendedData) setRecommendedDesserts(recomendedData);
    }, [recomendedData]);



    const handleIncrement = (index, key) => {
        console.log(index);
        console.log(cardCountRefs);
        cardCountRefs.current[index].count += 1;
        if (cartItems.hasOwnProperty(index)) {
            cartItems[index].count++;
            setCartItems(cartItems);
        } else {
            cartItems[index] = { ...cart[index], count: 1 };
        }
        forceUpdate();
    };


    const handleDecrement = (index, key) => {
        if (cardCountRefs.current[index]) {
            cardCountRefs.current[index].count -= 1;
            const newCartItems = { ...cartItems };

            if (newCartItems[index]) {
                newCartItems[index].count--;

                if (newCartItems[index].count <= 0) {
                    const newcart = [...cart];
                    newcart.splice(key, 1);
                    setCart(newcart);
                    delete newCartItems[index];
                    console.log(newCartItems);
                } else {

                    const newCart = cart.map((item) =>
                        item.item_id === index ? { ...item, count: item.count - 1 } : item
                    );

                    setCart(newCart);
                }
                setCartItems(newCartItems);
            }
        }
    };


    console.log(cartItems);


    const handleIncrementBeverages = (index, value, ind) => {
        const newCartItems = { ...cartItems };

        if (newCartItems.hasOwnProperty(index)) {
            newCartItems[index.toString()].count++;
        } else {
            newCartItems[index.toString()] = { ...value, count: 1 };
        }
        setCartItems(newCartItems);

        setCart((prevCart) => {
            console.log(prevCart);
            const itemInCart = prevCart?.find(item => item?.item_id === index);
            if (itemInCart) {
                return prevCart.map(item =>
                    item.id === index ? { ...item, count: item.count + 1 } : item
                );
            }
            return [...prevCart, { ...value, count: 1 }];
        });

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
                    cart.map((value, index) => {
                        const item = value;
                        if (!cardCountRefs.current[item.item_id.toString()]) {
                            cardCountRefs.current[item.item_id.toString()] = { ref: null, count: 0 };
                        }
                        const count = cartItems[item.item_id.toString()]?.count | 0;
                        return (
                            <div className="searchCard">
                                <img src={item.img_url} className="searchImage" alt="Card" />
                                <div className="searchCardDetails">
                                    <h3>{item.name}</h3>
                                    <p>{item.type}</p>
                                </div>
                                <div className="searchCardFooter">
                                    <span style={{ fontWeight: "bold" }}><FaIndianRupeeSign />{item.price}</span>
                                    {(count == 0) ? (
                                        <CButton className='AddButton' style={{ backgroundColor: "red", borderRadius: "12px" }} color="danger" onClick={() => handleIncrement(item.item_id.toString(), index)}>Add +</CButton>
                                    ) : (
                                        <div style={{ color: "white", height: "40px" }} className="button-container">
                                            <button style={{ backgroundColor: "transparent" }} onClick={() => handleDecrement(item.item_id.toString(), index)}>-</button>
                                            <span>{count}</span>
                                            <button style={{ backgroundColor: "transparent" }} onClick={() => handleIncrement(item.item_id.toString(), index)}>+</button>
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
                    if (!cardCountRefs.current[recomendedItem.item_id.toString()]) {
                        cardCountRefs.current[recomendedItem.item_id.toString()] = { ref: null, count: 0 };
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
                                    <div style={{ fontWeight: "bold", wordWrap: 'break-word', width: "50%" }}><FaIndianRupeeSign />{recomendedItem.price}  </div>

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