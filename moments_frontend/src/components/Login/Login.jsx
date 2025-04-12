import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Spinner from '../LoadingSpinner/Spinner';
import { AppContext } from './../AppContext';
const Login = () => {
    const [loading, setLoading] = useState(false)
    const { setUserDetails, setLogin, userLogin, userDetails } = useContext(AppContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    console.log(location)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMsg, setErrorMsg] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        const encodedCredentials = btoa(formData.username + ":" + formData.password);
        axios.post("http://localhost:8080/user/login", {}, {
            headers: {
                "Authorization": `Basic ${encodedCredentials}`
            }
        }
        )
            .then((response) => {

                console.log("response", response);
                setUserDetails({
                    ...response.data,
                    password: formData.password,
                    encodedCredentials: encodedCredentials
                })
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                setErrorMsg("server error! try again later")
                if (error.status === 401) {
                    setFormData({
                        username: "",
                        password: ""
                    })
                    setErrorMsg(prev => "invalid credentials");
                }
            });

    };
    useEffect(() => {
        if (userDetails.username && userDetails.password) {
            userLogin(); // Trigger userLogin after userDetails is updated
            setLogin(true);
            navigate(from, {
                state: location.state
            });
        }
    }, [userDetails]);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <form
                className="w-full  max-w-sm bg-white py-[4%] px-[4.5%] rounded-lg shadow-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Welcome Back!
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type=""
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter your password"
                    />
                </div>
                {
                    loading ? <div className='flex justify-center'><Spinner/></div> : <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md font-semibold hover:text-red-600"
                    >
                        Login
                    </button>
                }

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{' '}
                    <a
                        href="/register"
                        className="text-red-500 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
                <p className="text-sm text-red-600">
                    {errorMsg && (
                        <>

                            {errorMsg.length > 0 && (
                                <>
                                    <p className='text-gray-400 text-sm text-right mt-1'>
                                        Forgot password?  <a className='text-blue-600 underline' href="/reset-password">reset password</a>
                                    </p>
                                </>
                            )}
                            <p className='text-left mt-5'>{errorMsg}</p>
                        </>
                    )}
                </p>

            </form>
        </div>
    );
};

export default Login;
