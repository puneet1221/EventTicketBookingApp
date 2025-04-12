import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Spinner from '../LoadingSpinner/Spinner';
const StepEmail = ({ email, onChange, sendOTP, loading }) => (
    <>
        <div className="mb-4">
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
            >
                Enter Your Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your email"
            />
        </div>
        {loading ? <div className='flex justify-center py-2'><Spinner /></div> : <button
            type="button"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:text-red-500 transition duration-200"
            onClick={sendOTP}
        >
            Register
        </button>}
    </>
);

const StepOTP = ({ otp, onChange, validateOTP,loading}) => (
    <>
        <div className="mb-6">
            <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-600 mb-2"
            >
                OTP
            </label>
            <input
                id="otp"
                name="otp"
                type="number"
                required
                className="w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter the OTP sent"
                onChange={onChange}
                value={otp}
            />
        </div>
        {loading?<div className='flex justify-center py-2'><Spinner/></div>: <button
            type="button"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:text-red-500 transition duration-200"
            onClick={validateOTP}
        >
            Verify OTP
        </button>}
    </>
);

const StepPassword = ({loading, password, confirmPassword, onChange, handleSubmit }) => (
    <>
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
                value={password}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your password"
            />
        </div>
        <div className="mb-6">
            <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600 mb-2"
            >
                Confirm Password
            </label>
            <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Confirm your password"
            />
        </div>
        {loading?<div className='flex justify-center py-2'><Spinner/></div>: <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:text-red-500 transition duration-200"
            onClick={handleSubmit}
        >
            Submit
        </button>}
       
    </>
);

const Register = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [formState, setFormState] = useState(0);
    const [errorMsg, setErrorMsg] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        otp: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNextStep = () => {
        setErrorMsg('')
        if (formState === 0 && !formData.email) {
            return;
        }
        if (formState === 2 && formData.password !== formData.confirmPassword) {
            return;
        }
        setFormState((prev) => prev + 1);
    };

    const sendOTP = () => {
        setLoading(true)
        axios.get(`http://localhost:8080/moments/validate-email?username=${formData.email}`)
            .then(response => {
                setLoading(false)
                if (response.status === 200) {
                    handleNextStep();
                }
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                if(error.response){
                    setErrorMsg(error.response?.data)
                }else{
                    setErrorMsg(error.message)
                }
                
                setFormData({
                    ...formData,
                    email: ''
                })
            })
    }

    const validateOTP = () => {
        setLoading(true)
        axios.post('http://localhost:8080/moments/verify-otp', {
            username: formData.email,
            otp: formData.otp
        })
            .then(response => {
                setLoading(false)
                if (response.status === 200) {
                    handleNextStep();
                }
            })
            .catch(error => {
                setLoading(false)
                setErrorMsg(error.response.data)
                setFormData({
                    ...formData,
                    otp: ''
                })
            })
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        console.log("testting")
        axios.post('http://localhost:8080/moments/register', {
            username: formData.email,
            password: formData.password
        })
            .then(response => {
                setLoading(false)
                if (response.status == 201) {
                    alert('registered successful')
                    navigate('/login');


                }

            })
            .catch(error => {
                setLoading(false)
                alert('error-->check console')
                console.log(error)
                //redirect to erro page with a specific message
                //later implementatiom
            })
    }

    return (
        <div className="flex items-center justify-center h-screen  bg-gray-200 ">
            <form className="w-full max-w-sm bg-white px-[5%] py-[4%]  rounded-lg shadow-lg">
                <h2 className="text-3xl  mb-[30%] text-center font-bold text-center text-black">
                    Sign Up!
                </h2>

                {formState === 0 && (
                    <StepEmail
                        loading={loading}
                        email={formData.email}
                        onChange={handleChange}
                        sendOTP={sendOTP}
                    />
                )}
                {formState === 1 && <StepOTP loading={loading} onChange={handleChange} otp={formData.otp} validateOTP={validateOTP} />}
                {formState === 2 && (
                    <StepPassword loading={loading}
                        password={formData.password}
                        confirmPassword={formData.confirmPassword}
                        onChange={handleChange}
                        handleSubmit={handleSubmit}

                    />
                )}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already a member?{' '}
                    <a
                        href="/login"
                        className="text-red-500 hover:underline"
                    >
                        Login
                    </a>
                </p>
                <p className='text-sm text-red-600'>{errorMsg}</p>
            </form>
        </div>
    );
};

export default Register;
