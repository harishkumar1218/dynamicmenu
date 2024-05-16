import Bill from './Bill';
import { CartContext } from './Layout';
import React,{useContext,useState} from 'react';
import { FaIndianRupeeSign, FaCartShopping } from "react-icons/fa6";
import { CNavbar, CCard, CCol, CContainer, CCardImage, CCardImageOverlay, CCardBody, CNavbarBrand, CButton } from '@coreui/react';

import './SearchFolder/Search.css'

const FCart = () => {
    const cartitems={150:{name:"biryani",discrption:"afsafasedsf",cost:55,count:1},151:{name:"pizza",discrption:"srgdss",cost:80,count:1}};
    const {cartData,setCartData}=useContext(CartContext);
    console.log(cartData);
    const [count, setCount] = useState(0);
    const name = "afaf";
    const img = "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png";
    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    return (
        <div  style={{ backgroundColor:"#ededed",paddingBottom: 70}}>
            <CNavbar className="bg-body-tertiary">
                <CContainer breakpoint="md">
                    <CNavbarBrand style={{fontSize:"22px"}}> <FaCartShopping color='red'/> Cart</CNavbarBrand>
                </CContainer>
            </CNavbar>
            <div>
                <div className="searchCard">
                    <img src={"https://b.zmtcdn.com/data/pictures/0/20572180/8c4d071479d92fb0e80dbaa13236e9d4_o2_featured_v2.jpg?output-format=webp"} className="searchImage" alt="Card" />
                    <div className="searchCardDetails">
                        <h3>Biryani</h3>
                        <p>jahjashuaj ah</p>
                    </div>
                    <div className="searchCardFooter">
                        <span style={{fontWeight:"bold"}}><FaIndianRupeeSign />55</span>
                        {count == 0 ? (
                            <button className='AddButton' style={{ backgroundColor: "red" }} onClick={() => setCount(count + 1)}>Add</button>
                        ) : (
                            <div className="button-container">
                                <button onClick={handleDecrement}>-</button>
                                <span>{count}</span>
                                <button onClick={handleIncrement}>+</button>
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className="searchCard">
                    <img src={"	https://www.dominos.co.in/store-location/img/image1.jpg"} className="searchImage" alt="Card" />
                    <div className="searchCardDetails">
                        <h3>Biryani</h3>
                        <p>Veg with panner</p>
                    </div>
                    <div className="searchCardFooter">
                        <span><FaIndianRupeeSign />55</span>
                        {count == 0 ? (
                            <button className='AddButton' style={{ backgroundColor: "red" }} onClick={() => setCount(count + 1)}>Add</button>
                        ) : (
                            <div className="button-container">
                                <button onClick={handleDecrement}>-</button>
                                <span>{count}</span>
                                <button onClick={handleIncrement}>+</button>
                            </div>
                        )
                        }
                    </div>
                </div>
               
            </div>
            <div style={{fontFamily: '"Times New Roman", serif',display:"flex",justifyContent:"center"}}>
                    <h4>Frequently Bought Together</h4>
                </div> 
            <div className="scroll-container" style={{backgroundColor:"white",borderRadius:"20px 0px 0px 20px", whiteSpace: "wrap", paddingTop: "10px", paddingLeft: "10px", marginLeft:"8px"}}>
                <CCol xs style={{ height: "auto" }}>
                    <CCard style={{ border:"0px", padding: "0px", width: '155px', height: "auto" }}>
                        <CCardImage className="CartcardImage" orientation="top" src={"https://d1rgpf387mknul.cloudfront.net/category/Home/web/1x_web_20240410063942722493_114x101png"} />
                        <CCardImageOverlay className='card-footer' style={{ padding: "0px",alignItems:"flex-end" }}>
                            <div style={{ paddingBottom: "70px", whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems:"flex-end", paddingLeft: "10px", width: "100%", height: "auto" }}>
                                <div style={{ color: "white", fontWeight: "bold", wordWrap: 'break-word', width: "100%"}}>Pepsi dessert</div>
                            </div>
                        </CCardImageOverlay>
                        <CCardBody style={{ whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "3px 0px 0px 3px", width: "100%", height: "auto" }}>
                            <div style={{ fontWeight: "bold", wordWrap: 'break-word', width: "50%" }}><FaIndianRupeeSign />999  </div>
                            <CButton style={{ marginBottom: "5px", fontWeight: "bold", boxShadow: "0 4px 6px rgb(150, 150, 150)", color: "white", width: "40%", height: "100%", backgroundColor: "red" }} >Add</CButton>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs style={{ height: "auto" }}>
                    <CCard style={{border:"0px", padding: "0px", width: '155px', height: "auto" }}>
                        <CCardImage className="CartcardImage" orientation="top" src={"https://rp-media.faasos.io/catalog/images/3163VF6CATFX.jpeg?d=375&tr:w-0.5,h-0.5"} />
                        <CCardImageOverlay className='card-footer' style={{ padding: "0px",alignItems:"flex-end"}}>
                            <div style={{ paddingBottom: "70px", whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems: "end", paddingLeft: "10px", width: "100%", height: "auto" }}>
                                <div style={{ color: "white", fontWeight: "bold", wordWrap: 'break-word', width: "100%" }}>Pepsi dessert</div>
                            </div>
                        </CCardImageOverlay>
                        <CCardBody style={{ whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "3px 0px 0px 3px", width: "100%", height: "auto" }}>
                            <div style={{ fontWeight: "bold", wordWrap: 'break-word', width: "50%" }}><FaIndianRupeeSign />999  </div>
                            <CButton style={{ marginBottom: "5px", fontWeight: "bold", boxShadow: "0 4px 6px rgb(150, 150, 150)", color: "white", width: "40%", backgroundColor: "red" }} >Add</CButton>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs style={{ height: "auto" }}>
                    <CCard style={{border:"0px", padding: "0px", width: '155px', height: "auto" }}>
                        <CCardImage className="CartcardImage" orientation="top" src={"https://rp-media.faasos.io/catalog/images/69TUQBMAY0MW.jpeg?d=375&tr:w-0.5,h-0.5"} />
                        <CCardImageOverlay className='card-footer' style={{ padding: "0px",alignItems:"flex-end" }}>
                            <div style={{ paddingBottom: "70px", whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems: "end", paddingLeft: "10px", width: "100%", height: "auto" }}>
                                <div style={{ color: "white", fontWeight: "bold", wordWrap: 'break-word', width: "100%" }}>Pepsi dessert</div>
                            </div>
                        </CCardImageOverlay>
                        <CCardBody style={{ whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "3px 0px 0px 3px", width: "100%", height: "auto" }}>
                            <div style={{ fontWeight: "bold", wordWrap: 'break-word', width: "50%" }}><FaIndianRupeeSign />999  </div>
                            <CButton style={{ marginBottom: "5px", fontWeight: "bold", boxShadow: "0 4px 6px rgb(150, 150, 150)", color: "white", width: "40%", backgroundColor: "red" }} >Add</CButton>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs style={{ height: "auto" }}>
                    <CCard style={{border:"0px", padding: "0px", width: '155px', height: "auto" }}>
                        <CCardImage className="CartcardImage" orientation="top" src={"https://d1rgpf387mknul.cloudfront.net/category/Home/web/1x_web_20240410063942722493_114x101png"} />
                        <CCardImageOverlay className='card-footer' style={{ padding: "0px",alignItems:"flex-end" }}>
                            <div style={{ paddingBottom: "70px", whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems: "end", paddingLeft: "10px", width: "100%", height: "auto" }}>
                                <div style={{ color: "white", fontWeight: "bold", wordWrap: 'break-word', width: "100%" }}>Pepsi dessert</div>
                            </div>
                        </CCardImageOverlay>
                        <CCardBody style={{ whiteSpace: "wrap", display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "3px 0px 0px 3px", width: "100%", height: "auto" }}>
                            <div style={{ fontWeight: "bold", wordWrap: 'break-word', width: "50%" }}><FaIndianRupeeSign />999  </div>
                            <CButton style={{ marginBottom: "5px", fontWeight: "bold", boxShadow: "0 4px 6px rgb(150, 150, 150)", color: "white", width: "40%", backgroundColor: "red" }} >Add</CButton>
                        </CCardBody>
                    </CCard>
                </CCol>
            </div>
            <div>
                <div style={{ ffontFamily: '"Times New Roman", serif',padding:"10px",display:"flex",justifyContent:"center"}}>
                    <h5>BILL SUMMRY</h5>
                </div>
                <Bill />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <CButton style={{ color: "white", backgroundColor: "red", width: "90%", height: "50px", borderRadius: "10px", border: "10px" }} >Payment</CButton>
            </div>

        </div>
    );
}
export { FCart }