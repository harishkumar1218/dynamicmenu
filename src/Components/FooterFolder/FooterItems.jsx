import { CartContext } from '../Layout';
import { useNavigate } from 'react-router-dom';
import { CFooter, CButton, CBadge } from '@coreui/react'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaHouseChimney, FaBowlRice, FaCartShopping } from "react-icons/fa6";



const FFooter = () => {
    const navigate = useNavigate();
    const [ cart, setCartItems ] = useState({});
    const [cartCount, setCartCount] = useState(0);
    const homeRef = useRef(null);
    const menuRef = useRef(null);
    const cartRef = useRef(null);

    const cartRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "cart"
    }
    useEffect(() => {
        // Function to update cart items from localStorage
        const updateCartFromLocalStorage = () => {
            const storedCart = localStorage.getItem('cart');
            if (storedCart !== null) {
                setCartItems(JSON.parse(storedCart));
            } else {
                setCartItems({});
            }
        };

        // Call the update function initially to sync with localStorage
        updateCartFromLocalStorage();

        // Function to handle localStorage change event
        const handleStorageChange = (event) => {
            if (event.key === 'cart') {
                updateCartFromLocalStorage();
            }
        };

        // Add event listener for localStorage change
        window.addEventListener('storage', handleStorageChange);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [localStorage.getItem('cart')]);



    useEffect(() => {
        setCartCount(Object.keys(cart).length);
    }, [cart])

    return (
        <CFooter className='position-fixed bottom-0 w-100  text-dark p-2' style={{ zIndex: 10, boxShadow: '0px -3px 6px rgba(0, 0, 0, 0.5)' }}>

            <CButton ref={homeRef} shape="rounded-pill" color='danger' variant="outline" onClick={() => { navigate("/home") }}>
                <FaHouseChimney />
                <span> Home </span>
            </CButton>

            <CButton ref={menuRef} shape="rounded-pill" color='danger' variant="outline" onClick={() => {navigate("/menu",{ state: { initActiveTab: 0 } })}} >
                <FaBowlRice />
                <span> Menu</span>
            </CButton>

            <div onClick={() => {navigate("/cart") }}>
                <CButton ref={cartRef} shape="rounded-pill" variant="outline" color='danger' className="position-relative" style={{ boxShadow: "0 5px 5px rgb(200, 200, 200)" }}>
                    <FaCartShopping />
                    <span> Cart</span>
                    {cartCount !== 0 ? (
                        <CBadge color="dark" position="top-start" shape="rounded-pill">
                            {cartCount}
                        </CBadge>
                    ) : null}
                </CButton>
            </div>

        </CFooter>
    );
}

export { FFooter };