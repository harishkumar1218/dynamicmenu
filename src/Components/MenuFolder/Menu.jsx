import React, { createRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FaSearchengin } from "react-icons/fa6";
import { useRef, useState, useEffect } from "react";
import { CNavbar, CContainer, CNavbarBrand, CCard, CCardImage, CNavLink, CButton, CCardImageOverlay, CCardTitle, CCardText, CNav, CNavItem } from '@coreui/react'

import '../CategoryFolder/Category.css';
import './menu.css'
const catogorys = {
    0: { id: 0, name: "Veg Pizza" },
    1: { id: 1, name: "Non-Veg Pizza" },
    2: { id: 2, name: "Recommendation" },
    3: { id: 3, name: "Biryani" }
}
const items = {
    0: { catogory_id: 0, item_id: 12, name: "xyz", imgUrl: "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", price: 99 },
    1: { catogory_id: 1, item_id: 15, name: "abc", imgUrl: "https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg", price: 99 }
};

const FMenuNav = () => {

    // const [items, setItems] = useState(initialItems);
    let sectionRefs = [useRef(null),useRef(null),useRef(null),useRef(null)]
    const [activeTab, setActiveTab] = useState(0);
    const navigationRef = useRef(null);
    const navigate = useNavigate();
    const MenuNavHeight = document.querySelector(".Menu-nev")?.getBoundingClientRect().height;
    const navigationBar = navigationRef?.current;
    const navItem = navigationBar?.children[activeTab];


    if (navItem) {
        navigationBar.scrollTo({
            left: navItem.offsetLeft - navigationBar.clientWidth / 2 + navItem.clientWidth / 2,
            behavior: 'smooth'
        });
    }

    const scrollHandler = (sectionIndex) => {
        console.log(sectionIndex);
        const section = sectionRefs[sectionIndex].current;
        if (section) {
            const scrollPosition = section.offsetTop - MenuNavHeight;
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            setActiveTab(sectionIndex);
        }

    }


    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1,
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(parseInt(entry.target.dataset.index, 10));
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        sectionRefs.map((ref, index) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);


    return (
        <div className="Menu" style={{ paddingBottom: 60 }}>
            <div className="Menu-nev" style={{ zIndex: 1, boxShadow: '0px -3px 6px rgba(0, 0, 0, 0.5)' }}>
                <CNavbar className="bg-body-tertiary">
                    <CContainer fluid>
                        <CNavbarBrand href="#">Hotel Orion</CNavbarBrand>
                        <CButton type="submit" color="light" onClick={() => navigate("/search")} style={{ borderRadius: '50%', boxShadow: "0 0 10px rgb(200, 200, 200)" }} >
                            <FaSearchengin />
                        </CButton>
                    </CContainer>
                </CNavbar>

                <div className="scroll-container bg-body-tertiary" style={{ padding: "5px", backgroundColor: "white" }}>
                    <CButton color="light" style={{ boxShadow: "0 0 10px rgb(200, 200, 200)", marginRight: "10px" }}>Veg</CButton>
                    <CButton color="danger" style={{ boxShadow: "0 0 10px rgb(200, 200, 200)", marginRight: "10px" }}>Non Veg</CButton>
                    <CButton color="light" style={{ boxShadow: "0 0 10px rgb(200, 200, 200)", marginRight: "10px" }}>Sort</CButton>
                </div>
                <div>
                    <CNav variant="underline-border" style={{ backgroundColor: "white", color: "black", cursor: "pointer" }}>
                        <CNavItem className="MenuScrollContainer" ref={navigationRef}>
                            {Object.keys(catogorys).map((key) => {
                                const category = catogorys[key];
                                return (
                                    <CNavLink
                                        key={category.id}
                                        onClick={() => {
                                            setActiveTab(category.id);
                                            scrollHandler(category.id);
                                        }}
                                        style={{ color: activeTab === category.id ? 'red' : 'black' }}
                                        active={activeTab === category.id}
                                    >
                                        {category.name}
                                    </CNavLink>
                                );
                            })}
                        </CNavItem>
                    </CNav>
                </div>
            </div>

            <div className="menu-content" >
                {/* {Object.keys(catogorys).map((key, index) => {
                    const category = catogorys[key];
                    return (
                        <div key={category.id} ref={sectionRefs.current[index]} data-index={index}>
                            <div style={{ textAlign: 'center' }}>
                                ------------{category.name}------------
                            </div>
                            <div>

                            </div>
                        </div>
                    );
                })} */}
                <div ref={sectionRefs[0]} data-index={0}>
                    <div style={{ textAlign: 'center' }}>------------Veg Pizza------------</div>
                    <div>
                        <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
                            <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg"} />
                            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
                                <div className="Populer-card-content">
                                    <div className='card-name'><CCardTitle >xyz</CCardTitle></div>
                                    <div className="card-footer">
                                        <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                                        <CButton color="danger" href="#" className="right-content">Add +</CButton>
                                    </div>
                                </div>
                            </CCardImageOverlay>
                        </CCard>
                    </div>
                    <div>
                        <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
                            <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/0/3990/38c826ebd2d9f339e499da120bfd5f93_featured_v2.jpg"} />
                            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
                                <div className="Populer-card-content">
                                    <div className='card-name'><CCardTitle >abc</CCardTitle></div>
                                    <div className="card-footer">
                                        <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                                        <CButton color="danger" href="#" className="right-content">Add +</CButton>
                                    </div>
                                </div>
                            </CCardImageOverlay>
                        </CCard>
                    </div>
                </div>
                <div ref={sectionRefs[1]} data-index={1}>
                    <div style={{ textAlign: 'center' }}>------------Non-Veg Pizza------------</div>
                    <div>
                        <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
                            <CCardImage className="Populer-card" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/rfnuftx62h1urssssipi"} />
                            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
                                <div className="Populer-card-content">
                                    <div className='card-name'>
                                        <CCardTitle >bfs</CCardTitle>
                                    </div>
                                    <div className="card-footer">
                                        <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                                        <CButton color="danger" href="#" className="right-content">Add +</CButton>
                                    </div>
                                </div>
                            </CCardImageOverlay>
                        </CCard>
                    </div>
                    <div >
                        <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
                            <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/0/3990/38c826ebd2d9f339e499da120bfd5f93_featured_v2.jpg"} />
                            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
                                <div className="Populer-card-content">
                                    <div className='card-name'>
                                        <CCardTitle >ifn</CCardTitle>
                                    </div>
                                    <div className="card-footer">
                                        <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                                        <CButton color="danger" href="#" className="right-content">Add +</CButton>
                                    </div>
                                </div>
                            </CCardImageOverlay>
                        </CCard>
                    </div>

                </div>
                <div ref={sectionRefs[2]} data-index={2}>
                    <div style={{ textAlign: 'center' }}>------------Recommendation------------</div>
                    <div>
                        <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
                            <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg"} />
                            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
                                <div className="Populer-card-content">
                                    <div className='card-name'>
                                        <CCardTitle >uwhfie</CCardTitle>
                                    </div>
                                    <div className="card-footer">
                                        <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                                        <CButton color="danger" href="#" className="right-content">Add +</CButton>
                                    </div>
                                </div>
                            </CCardImageOverlay>
                        </CCard>
                    </div>
                    <div>
                        <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
                            <CCardImage className="Populer-card" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/rfnuftx62h1urssssipi"} />
                            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
                                <div className="Populer-card-content">
                                    <div className='card-name'>
                                        <CCardTitle >kuhf</CCardTitle>
                                    </div>
                                    <div className="card-footer">
                                        <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                                        <CButton color="danger" href="#" className="right-content">Add +</CButton>
                                    </div>
                                </div>
                            </CCardImageOverlay>
                        </CCard>
                    </div>
                </div>
                <div ref={sectionRefs[3]} data-index={3}>
                    <div style={{ textAlign: 'center' }}>------------Biryani------------</div>
                    <div>
                        <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
                            <CCardImage className="Populer-card" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/rfnuftx62h1urssssipi"} />
                            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
                                <div className="Populer-card-content">
                                    <div className='card-name'>
                                        <CCardTitle >Biryani</CCardTitle>
                                    </div>
                                    <div className="card-footer">
                                        <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                                        <CButton color="danger" href="#" className="right-content">Add +</CButton>
                                    </div>
                                </div>
                            </CCardImageOverlay>
                        </CCard>
                    </div>
                    <div>
                        <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
                            <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg"} />
                            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
                                <div className="Populer-card-content">
                                    <div className='card-name'>
                                        <CCardTitle >Biryani</CCardTitle>
                                    </div>
                                    <div className="card-footer">
                                        <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                                        <CButton color="danger" href="#" className="right-content">Add +</CButton>
                                    </div>
                                </div>
                            </CCardImageOverlay>
                        </CCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FMenuNav };