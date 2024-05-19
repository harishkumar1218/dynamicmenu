import React, { useState } from 'react';
import './Authantication.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa6';


function SignUpPage() {

    const nav = useNavigate()
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

            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('User registered successfully');

            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                nav.push("/home")

            }
        } catch (error) {
            console.error('Error:', error);

        }
    };
    return (

        <div className="container-fluid">

            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12">

                    <div style={{borderRadius:"25px"}}  className="card bg-dark text-white my-5 mx-auto custom-card">
                        <div className="card-body p-5 d-flex flex-column align-items-center mx-auto w-100">

                            <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                            <p className="text-white-50 mb-2">Please enter your Details!</p>

                            <div className="form-container">
                                <div className="form-group">
                                    <label htmlFor="firstName">Name</label>
                                    <input onChange={handleChange} className="form-control" name="name" type="text" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input onChange={handleChange} className="form-control" name="phoneNumber" type="text" />
                                </div>
                            </div>


                            <button onClick={handleSubmit} style={{ marginTop: "10px", borderRadius: "7px", height: "30px", width: "80px", color: "black", backgroundColor: "white" }} >
                                Sign Up
                            </button>

                            <div className="d-flex flex-row mt-3 mb-5">
                                <a href="#!" className="btn btn-link m-3" style={{ color: 'white' }}>
                                    <FaGoogle />
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
    );
}

export default SignUpPage;
