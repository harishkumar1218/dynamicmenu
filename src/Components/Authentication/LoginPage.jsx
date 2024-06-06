import React, { useLayoutEffect, useState } from 'react';
import './Authantication.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa6";
import useCachedFetch from '../../customhooksFolder/useFetch';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

function LoginPage() {
    const nav = useNavigate();
    const [populerList, setPopulerList] = useState({});

    const populerRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "auth_login"
    }
      
    
    const { data: populerData, loading: populerLoading, error: populerError } = useCachedFetch("home", populerRequest);

    useLayoutEffect(() => {
        if (populerData) setPopulerList(populerData);
    }, [populerData]);

    if(Object.keys(populerList).length>0 && !populerList.verifyed){
        nav("/home");
    }
    console.log(populerList);

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e?.target.name]: e?.target.value });
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        console.log(formData);
        try {

            const response =  await axios.post('http://localhost:5000/auth', formData, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              console.log(response);

            if (response.status==200) {
                console.log('User registered successfully');
                localStorage.setItem("isLoggedIn", "true");
                nav("/home")
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };


    const login = useGoogleLogin({
          onSuccess: async (tokenResponse) => {
            try {
              const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              });
      
              const userProfile = userInfoResponse.data;

              const response =  await axios.post('http://localhost:5000/auth', userProfile, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              if (response.status==200) {
                console.log('User registered successfully');
                localStorage.setItem("isLoggedIn", "true");
                nav("/home")

            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
            }
            
            } catch (error) {
              console.error('Failed to fetch user profile', error);
            }
          },
          scope: 'profile email',
        });
      


    return (
        <div className='authBody'>
        <div className="containerAuthFluid">

            <div  className="row d-flex justify-content-center align-items-center h-100">
                <div  className="col-12">

                    <div style={{borderRadius:"25px"}} className="card bg-dark text-white my-5 mx-auto customAuthCard">
                        <div className="cardAuthBody p-5 d-flex flex-column align-items-center mx-auto w-100">

                            <h2 className="fwAuthBold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Please enter your Name and Number!</p>

                            <div className="formAuthContainer">
                                <div className="formAuthGroup">
                                    <label htmlFor="email">Name</label>
                                    <input onChange={handleChange} className="form-control" name="name" type="text" />
                                </div>
                                <div className="formAuthGroup">
                                    <label htmlFor="password">Phone Number</label>
                                    <input onChange={handleChange} className="form-control" type='text' name="phoneNumber" />
                                </div>
                            </div>

                            <button onClick={handleSubmit} style={{marginTop:"20px", borderRadius: "7px", height: "30px", width: "80px", color: "black", backgroundColor: "white" }}>
                                Log In
                            </button>

                            <div className="d-flex flex-row mt-3 mb-5">
                                <a href="#!" className="btn btn-link m-3" style={{ color: 'white' }}>

                                    <FaGoogle onClick={()=>login()} />
                                </a>
                            </div>

                            <div>
                                <p className="mb-0">Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    );
}

export default LoginPage;
