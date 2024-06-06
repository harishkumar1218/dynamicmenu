import React, { useLayoutEffect, useState } from 'react';
import './Authantication.css';
import { Link, useNavigate} from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa6';
import useCachedFetch from '../../customhooksFolder/useFetch';
import axios from 'axios';


function SignUpPage() {

    const navigator = useNavigate()
    const [populerList, setPopulerList] = useState([]);

    const signupRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "auth_signup"
    }
      
    
    const { data: populerData, loading: populerLoading, error: populerError } = useCachedFetch("home", signupRequest);
    useLayoutEffect(() => {
        if (populerData) setPopulerList(populerData);
    }, [populerData]);

    // if(populerData){
    //     navigator("/home");
    // }

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

            const response =  await axios.post('https://dynamicmenu.onrender.com/auth', formData, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              console.log(response);

            if (response.status==200) {
                console.log('User registered successfully');
                localStorage.setItem("isLoggedIn", "true");
                navigator("/home")
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
               
                // Handle registration error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div className='authBody'>
        <div className="containerAuthFluid">

            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12">

                    <div style={{borderRadius:"25px"}}  className="card bg-dark text-white my-5 mx-auto custom-card">
                        <div className="cardAuthBody p-5 d-flex flex-column align-items-center mx-auto w-100">

                            <h2 className="fwAuthBold mb-2 text-uppercase">Register</h2>
                            <p className="text-white-50 mb-2">Please enter your Details!</p>

                            <div className="formAuthContainer">
                                <div className="formAuthGroup">
                                    <label htmlFor="firstName">Name</label>
                                    <input onChange={handleChange} className="form-control" name="name" type="text" />
                                </div>
                                <div className="formAuthGroup">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input onChange={handleChange} className="form-control" name="phoneNumber" type="text" />
                                </div>
                            </div>


                            <button onClick={handleSubmit} style={{ marginTop: "10px", borderRadius: "7px", height: "30px", width: "80px", color: "black", backgroundColor: "white" }} >
                                Sign Up
                            </button>

                            <div className="d-flex flex-row mt-3 mb-5">
                                <a href="#!" className="btn btn-link m-3" style={{ color: 'white' }}>
                                     <FaGoogle onClick={()=>login()} />
                                </a>
                            </div>

                            <div>
                                <p className="mb-0">Already have an account? <Link to="/" className="text-white-50 fw-bold">Log In</Link></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    );
}

export default SignUpPage;
