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


const FMenuNav = ({ name = 'Default Name'}) => {
    const location = useLocation();
    const { initActiveTab = 0 } = location.state || {};
    const sectionRefs = useRef([]);
    const [activeTab, setActiveTab] = useState(initActiveTab | 0);
    const [activeButton, setActiveButton] = useState("all");
    const navigationRef = useRef(null);
    const navigationBar = navigationRef?.current;
    const navItem = navigationBar?.children[initActiveTab | 0];
    const navigate = useNavigate();
    const MenuNavHeight = document.querySelector(".MenuNev")?.getBoundingClientRect().height;
    const [populerList, setPopulerList] = useState([]);
    const [catogory, setCatogory] = useState([]);
    const [cartItems, setcartItems] = useState({});
    const [, setState] = useState();
    const forceUpdate = () => setState({});
    const cardCountRefs = useRef({});

    const populerRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "populer"
    }
    const catogoryRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "catogorys"

    }
    const { data: populerData, loading: populerLoading, error: populerError } = useCachedFetch("home", populerRequest);
    useEffect(() => {
        if (populerData) setPopulerList(populerData);
    }, [populerData]);

    const { data: catogoryData, loading: catogoryLoading, error: catogoryError } = useCachedFetch("home", catogoryRequest);
    useEffect(() => {
        if (catogoryData) setCatogory(catogoryData);
    }, [catogoryData]);
    

    useEffect(() => {
        if (catogory.length > 0) {   
            sectionRefs.current = catogory.map((_, index) => sectionRefs.current[index] || createRef());
        }
    }, [catogory]);

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



    useEffect(()=>{
        if (navItem) {
            navigationBar.scrollTo({
                left: navItem.offsetLeft - navigationBar.clientWidth / 2 + navItem.clientWidth / 2,
                behavior: 'smooth'
            });
        }
    },[navItem])


    const scrollHandler = (sectionIndex) => {
      
        const section = sectionRefs.current[sectionIndex].current;
        console.log(navItem);
        if (section) {
            console.log(section);
            const scrollPosition = section.offsetTop - MenuNavHeight;
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            setActiveTab(sectionIndex);
        }

    }


    const initialMount = useRef(true);

    useEffect(() => {
     if(initialMount.current){
        if(catogory.length > 0 && sectionRefs.current.length > 0 && sectionRefs.current[initActiveTab].current){
            initialMount.current=false;
            scrollHandler(parseInt(initActiveTab));            
        }
    }
      
    }, [catogory,initialMount,sectionRefs]);

    

      
    const handleButtonClick = (button) => {
        setActiveButton(activeButton === button ? null : button);
    };



    const handleSortClick = async() => {

        const sortRequest = {
            input: {
                FoodType: activeButton,
            },
            action: "sort"
        };
        try {
            const response = await axios.post("http://localhost:5000/home", sortRequest, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const newData = response.data;
            if (newData) setPopulerList(newData);
            console.log("sort");
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
                        onClick={() => handleButtonClick('nonveg')}
                        color={activeButton === 'nonveg' ? "danger" : "light"}
                        style={{ boxShadow: "0 0 10px rgb(200, 200, 200)", marginRight: "10px" }}
                    >
                        Non Veg
                    </CButton>

                    <CButton variant="outline" onClick={() =>handleSortClick()} color="danger" style={{ boxShadow: "0 0 10px rgb(200, 200, 200)", marginRight: "10px" }}>Sort</CButton>
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
                                        active={activeTab === catogoryIndex }
                                    >
                                        {catogoryValue}
                                    </CNavLink>
                                );

                            })}


                        </CNavItem>
                    </CNav>
                </div>

            </div>

            <div className="menuContent" >

                {catogory.map((catogoryValue, catogoryIndex) => {
            
                    return (
                        <div key={catogoryIndex} ref={sectionRefs.current[catogoryIndex]} data-index={catogoryIndex}>

                            <div style={{ textAlign: 'center' }}>------------{catogoryValue}------------</div>
                            {
                                populerList.map((value, index) => {
                                    const item = value;

                                    if (!cardCountRefs.current[index]) {
                                        cardCountRefs.current[index] = { ref: null, count: 0 };
                                    }
                                    const count = cardCountRefs.current[index].count;
                                    return (
                                        <div key={index} ref={(el) => (cardCountRefs.current[index].ref = el)} style={{ borderRadius: "20px" }}>
                                            <CCard className="PopulerCard" style={{ borderRadius: "20px", display: "inline-block", color: 'white' }}>
                                                <CCardImage style={{ borderRadius: "20px" }} className="PopulerCard" src={item.img_url} />
                                                <CCardImageOverlay style={{ borderRadius: "20px", padding: "3px" }} className='CardOverlay'>
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
                                                                        <button style={{ backgroundColor: "transparent" }} onClick={() => { handleDecrement(index) }}>-</button>
                                                                        <span>{count}</span>
                                                                        <button style={{ backgroundColor: "transparent" }} onClick={() => { handleIncrement(index) }}>+</button>
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