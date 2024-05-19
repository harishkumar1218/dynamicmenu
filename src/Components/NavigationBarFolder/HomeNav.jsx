
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { googleLogout } from '@react-oauth/google';
import { useState, useRef, useEffect } from 'react';
import { CNavbar, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react'
import { CContainer, CSidebar, CNavbarBrand, CSidebarToggler, CSidebarNav, CSidebarHeader, CSidebarBrand, CNavTitle, CAvatar } from '@coreui/react'
import { FaLocationDot } from "react-icons/fa6";
import './location.css';

const FNavbar = () => {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [samp, setSamp] = useState(null);
  const sidebarRef = useRef(null);
  const avaterRef = useRef(null);
  const currentLocation = "Tirupathi";
  const restorentName="Hotel Orian";
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!sidebarRef?.current?.contains(event.target)) {
        if (avaterRef?.current?.contains(event.target)) {
          setSidebarVisible(!sidebarVisible);
        } else {
          if (sidebarVisible) {
            setSidebarVisible(false);
          }
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarVisible]);


  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const signOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("userDetails", "");
    setSamp(null);
    googleLogout();
  };

  // const signIn = useGoogleOneTapLogin({
  //     onSuccess: credentialResponse => {

  //       const decode = jwtDecode(credentialResponse?.credential);
  //       localStorage.setItem("isLoggedIn", "true");
  //       setUserData(decode);
  //       console.log("hii");
  //       console.log(userdata);
  //     },
  //     onError: () => {
  //       console.log('Login Failed');
  //     },
  //   });

  return (
    <div>
      <div>
        <CNavbar className="bg-body-tertiary">
          <CContainer fluid>
            <div className="location-container">
              <FaLocationDot />
              <div className="current-location">{currentLocation}</div>
            </div>
            <CNavbarBrand href="#" style={{ fontFamily: 'Roboto, sans-serif' }} >{restorentName}</CNavbarBrand>
            <CAvatar ref={avaterRef} src={localStorage.getItem("userDetails") == "" ? "https://coreui.io/react/docs/static/1-34eedf58c0876517e8587997f9625944.jpg" : samp.picture} />
          </CContainer>
        </CNavbar>
      </div>
      <div>
        <CNavbar className="bg-body-tertiary " onClick={() => navigate("/search")} >
          <div className="container-fluid">
            <CInputGroup >
              <CInputGroupText id="basic-addon1" style={{ fontSize: '2em', width: "39px", height: "39px", marginRight: "2px", borderRadius: '50%', cursor: "pointer", boxShadow: "0 0 5px rgb(200, 200, 200)" }}>
                <AiOutlineSearch />
              </CInputGroupText>
              <CFormInput type="text" placeholder="Search" style={{ borderRadius: '20px' }} />
            </CInputGroup>
          </div>
        </CNavbar>
      </div>
      {
        (sidebarVisible) ?
          (
            <div>
              <CSidebar ref={sidebarRef} className="border-start show" style={{ backgroundColor: "#ededed" }}>
                <CSidebarHeader className="border-bottom">
                  <CSidebarBrand>{restorentName}</CSidebarBrand>
                </CSidebarHeader>
                <CSidebarNav style={{ paddingLeft: "20px" }} >
                  <CNavTitle>Welcome TO Orian</CNavTitle>
                  <div onClick={() => console.log(555)} >Customer Care</div>
                  {localStorage.getItem("userDetails") != "" ?
                    (<div style={{ cursor: "pointer" }} onClick={signOut()}>Logout </div>) : (<div style={{ cursor: "pointer" }} >Sign In </div>)}
                </CSidebarNav>
                <CSidebarHeader className="border-top">
                  <CSidebarToggler onClick={toggleSidebar} />
                </CSidebarHeader>
              </CSidebar>
            </div>
          )
          :
          <div></div>
      }
    </div>
  );
}
export { FNavbar }