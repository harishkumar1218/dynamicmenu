import React, { createRef, useLayoutEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaL, FaSearchengin } from "react-icons/fa6";
import { useRef, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { CNavbar, CContainer, CNavbarBrand, CCard, CCardImage, CNavLink, CButton, CCardImageOverlay, CCardTitle, CCardText, CNav, CNavItem } from '@coreui/react'
import "./menu.css";
import "../CategoryFolder/Category.css";
import useCachedFetch from "../../customhooksFolder/useFetch";
import axios from "axios";


const FMenuNav = ({ name = 'Default Name' }) => {

    const location = useLocation();
    const { initActiveTab = 0 } = location.state || {};

    const [activeTab, setActiveTab] = useState(initActiveTab | 0);
    const [activeButton, setActiveButton] = useState("all");

    const [menu, setMenu] = useState({});
    const [originalMenu, setOriginalMenu] = useState({});
    const [catogory, setCatogory] = useState([]);

    const [cartItems, setCartItems] = useState({});
    useEffect(() => (setCartItems(localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : {})), [localStorage.getItem('cart')])

    const sectionRefs = useRef([]);
    const cardCountRefs = useRef({});


    const [, setState] = useState();
    const forceUpdate = () => setState({});


    const navigationRef = useRef(null);
    const navigationBar = navigationRef?.current;
    const navItem = navigationBar?.children[initActiveTab | 0];


    const navigate = useNavigate();
    const MenuNavHeight = document.querySelector(".MenuNev")?.getBoundingClientRect().height;

    const menuRequest = {
        inputs:
        {
            restaurant_id: "6637aca14bfa08cf9527bfe5",
            user: "hari",
            sort_by: "",
            sequence: "low-high",
            filter_by: "veg"
        },
        action: "menu"
    }



    const { data: menuData, loading: menuLoading, error: menuError } = useCachedFetch("home", menuRequest);

    useEffect(() => {
        if (menuData) {
            setMenu(menuData);
            setOriginalMenu(JSON.parse(JSON.stringify(menuData))); //deep copying to original menu
        }
    }, [menuData]);

    useEffect(() => {

        const array = []
        if (menuData) Object.keys(menuData).map((key) => (array.push(key.toString())));
        setCatogory(array);
    }, [menuData]);


    useEffect(() => {
        if (catogory.length > 0) {
            sectionRefs.current = catogory.map((_, index) => sectionRefs.current[index] || createRef());
        }
    }, [catogory]);

    const handleIncrement = (catogoryName, itemIndex, index) => {
        cardCountRefs.current[index].count += 1;
        if (cartItems.hasOwnProperty(index)) {
            cartItems[index].count++;
            setCartItems(cartItems);
            localStorage.setItem("cart", JSON.stringify(cartItems));
        } else {
            cartItems[index] = { ...menu[catogoryName][itemIndex], count: 1 };
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
        forceUpdate();
    };


    const handleDecrement = (catogoryName, itemIndex, index) => {
        if (cardCountRefs.current[index].count > 0) {
            cardCountRefs.current[index].count -= 1;
            if (index in cartItems) {
                cartItems[index].count--;
                if (cartItems[index].count <= 0) {
                    delete cartItems[index];
                }
                setCartItems(cartItems);
                localStorage.setItem("cart", JSON.stringify(cartItems));
            }
            forceUpdate();
        }
    };



    useEffect(() => {
        if (navItem) {
            navigationBar.scrollTo({
                left: navItem.offsetLeft - navigationBar.clientWidth / 2 + navItem.clientWidth / 2,
                behavior: 'smooth'
            });
        }
    }, [navItem])


    const scrollHandler = (sectionIndex) => {

        const section = sectionRefs.current[sectionIndex].current;

        if (section) {

            const scrollPosition = section.offsetTop - MenuNavHeight;
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            setActiveTab(sectionIndex);
        }

    }



    const initialMount = useRef(true);

    useEffect(() => {
        if (initialMount.current) {
            if (catogory.length > 0 && sectionRefs.current.length > 0 && sectionRefs.current[initActiveTab].current) {
                initialMount.current = false;
                scrollHandler(parseInt(initActiveTab));
            }
        }

    }, [catogory, initialMount, sectionRefs]);



    const handleButtonClick = (type) => {
        setActiveButton(activeButton === type ? null : type);

        if (type == "veg" || type == "non-veg") {

            for (let category in originalMenu) {
                if (originalMenu.hasOwnProperty(category) && Array.isArray(originalMenu[category])) {
                    menu[category] = originalMenu[category].filter(item => item.type === type);
                }
            }
        }
        if (type == "all") {
            for (let category in menu) {
                if (menu.hasOwnProperty(category) && Array.isArray(menu[category])) {
                    menu[category] = [...originalMenu[category]];
                }
            }
        }

    };



    const handleSortClick = async () => {

        const sortRequest = {
            input: {
                FoodType: activeButton,
            },
            action: "sort"
        };
        try {
            const response = await axios.post("https://dynamicmenu.onrender.com/home", sortRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const newData = response.data;
            if (newData) setMenu(newData);

        } catch (error) {
            console.log(error);
        }
        forceUpdate();


    };




    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(parseInt(entry.target.dataset.index, 10));
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        sectionRefs.current.forEach((ref, index) => {

            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [sectionRefs.current]);


    return (
        <div className="Menu" style={{ paddingBottom: 60 }}>

            <div className="MenuNev" style={{ zIndex: 1, boxShadow: '0px -3px 6px rgba(0, 0, 0, 0.5)' }}>

                <CNavbar className="bg-body-tertiary">
                    <CContainer fluid>
                        <CNavbarBrand href="#">Hotel Orion</CNavbarBrand>
                        <CButton type="submit" color="light" onClick={() => navigate("/search")} style={{ borderRadius: '50%', boxShadow: "0 0 10px rgb(200, 200, 200)" }} >
                            <FaSearchengin />
                        </CButton>
                    </CContainer>
                </CNavbar>

                <div className="scroll-container bg-body-tertiary" style={{ padding: "5px", backgroundColor: "white" }}>
                    <CButton
                        onClick={() => handleButtonClick('all')}
                        color={activeButton === 'all' ? "danger" : "light"}
                        style={{ boxShadow: "0 0 10px rgb(200, 200, 200)", marginRight: "10px" }}
                    >
                        All
                    </CButton>
                    <CButton
                        onClick={() => handleButtonClick('veg')}
                        color={activeButton === 'veg' ? "danger" : "light"}
                        style={{ boxShadow: "0 0 10px rgb(200, 200, 200)", marginRight: "10px" }}
                    >
                        Veg
                    </CButton>
                    <CButton
                        onClick={() => handleButtonClick('non-veg')}
                        color={activeButton === 'non-veg' ? "danger" : "light"}
                        style={{ boxShadow: "0 0 10px rgb(200, 200, 200)", marginRight: "10px" }}
                    >
                        Non Veg
                    </CButton>

                    <CButton variant="outline" onClick={() => handleSortClick()} color="danger" style={{ boxShadow: "0 0 10px rgb(200, 200, 200)", marginRight: "10px" }}>Sort</CButton>
                </div>

                <div>
                    <CNav variant="underline-border" style={{ backgroundColor: "white", color: "black", cursor: "pointer" }}>
                        <CNavItem className="MenuScrollContainer" ref={navigationRef}>

                            {catogory.map((catogoryValue, catogoryIndex) => {
                                return (
                                    <CNavLink
                                        key={catogoryIndex}
                                        onClick={() => {
                                            setActiveTab(catogoryIndex);
                                            scrollHandler(catogoryIndex);
                                        }}
                                        style={{ color: activeTab === catogoryIndex ? 'red' : 'black' }}
                                        active={activeTab === catogoryIndex}
                                    >
                                        {catogoryValue != "Others" ? catogoryValue : "Side Dish"}
                                    </CNavLink>
                                );

                            })}


                        </CNavItem>
                    </CNav>
                </div>

            </div>

            <div className="menuContent" >

                {Object.keys(menu).map((catogoryValue, catogoryIndex) => {

                    return (
                        <div key={catogoryIndex} ref={sectionRefs.current[catogoryIndex]} data-index={catogoryIndex}>

                            <div style={{ textAlign: 'center' }}>-------------{catogoryValue != "Others" ? catogoryValue : "Side Dish"}-------------</div>
                            {
                                menu[catogoryValue].map((value, index) => {
                                    const item = value;

                                    if (!cardCountRefs.current[item.item_id]) {
                                        cardCountRefs.current[item.item_id] = { ref: null, count: cartItems[item.item_id] != null ? cartItems[item.item_id].count : 0 };
                                    }
                                    const count = cardCountRefs.current[item.item_id].count;

                                    return (
                                        <div key={index} ref={(el) => (cardCountRefs.current[item.item_id].ref = el)} style={{ borderRadius: "20px" }}>
                                            <CCard className="PopulerCard" style={{ borderRadius: "20px", display: "inline-block", color: 'white' }}>
                                                <CCardImage style={{ borderRadius: "20px" }} className="PopulerCard" src={item.img_url} />
                                                <CCardImageOverlay style={{ borderRadius: "20px", padding: "3px" }} className='CardOverlay'>
                                                    <div className="PopulerCardContent">
                                                        <div className='cardName'>
                                                            <CCardTitle><h5>{item?.name}</h5></CCardTitle>
                                                        </div>
                                                        <div className="cardFooter">
                                                            <CCardText className="leftContent" style={{ display: 'inline-block', verticalAlign: 'middle' }}><h5>{item.type == "non-veg" ? <img width="35" height="35" src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol" /> : <img width="35" height="35" src="https://img.icons8.com/color/48/vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol" />} ${item?.price}</h5></CCardText>
                                                            {
                                                                (count === 0) ? (
                                                                    <CButton className='button-container' style={{ backgroundColor: "red", borderRadius: "12px" }} color="danger" onClick={() => handleIncrement(catogoryValue, index, item.item_id)}>Add +</CButton>
                                                                ) : (
                                                                    <div className="button-container">
                                                                        <button style={{ backgroundColor: "transparent" }} onClick={() => { handleDecrement(catogoryValue, index, item.item_id) }}>-</button>
                                                                        <span>{count}</span>
                                                                        <button style={{ backgroundColor: "transparent" }} onClick={() => { handleIncrement(catogoryValue, index, item.item_id) }}>+</button>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </CCardImageOverlay>
                                            </CCard>
                                        </div>
                                    );
                                })
                            }
                        </div>

                    )
                })}

            </div>


        </div>
    );
};

export { FMenuNav };