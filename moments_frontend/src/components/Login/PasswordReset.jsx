import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Spinner from '../LoadingSpinner/Spinner';


const StepEmail = ({ email, onChange, nextStep, loading }) => {
    return <>
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
            onClick={nextStep}
        >
            Send OTP
        </button>}

    </>
};

const StepOTP = ({ nextStep, onChange, formData, loading }) => (
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
                onChange={onChange}
                value={formData.otp}
                required
                className="w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter the OTP sent"
            />
        </div>
        {loading ? <div className='flex justify-center py-2'><Spinner /></div> : <button
            type="button"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:text-red-500 transition duration-200"
            onClick={nextStep}
        >
            Verify OTP
        </button>}
    </>
);

const StepPassword = ({ loading, password, confirmPassword, onChange, handleSubmit }) => (
    <>
        <div className="mb-6">
            <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-2"
            >
                New Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your new password"
            />
        </div>
        <div className="mb-6">
            <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600 mb-2"
            >
                Confirm New Password
            </label>
            <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Confirm your new password"
            />
        </div>
        {loading ? <div className='flex justify-center py-2'><Spinner /></div> : <button
            type='button'
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:text-red-500 transition duration-200"
            onClick={handleSubmit}
        >
            Reset Password
        </button>}

    </>
);



const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formState, setFormState] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNextStep = () => {
        setErrorMsg('')
        if (formState === 0 && !formData.email) {
            setErrorMsg('Please enter a valid email.');
            return;
        }
        if (formState === 2 && formData.password !== formData.confirmPassword) {
            setErrorMsg('Passwords do not match.');
            return;
        }
        setFormState((prev) => prev + 1);
    };

    const handleSubmit = (e) => {

        if (formData.password != formData.confirmPassword) {
            setErrorMsg('password mismatch');
            setFormData({
                ...formData,
                password: '',
                confirmPassword: ''
            })
            return;
        }
        console.log(e)
        e.preventDefault();

        setLoading(true);
        axios.post('http://localhost:8080/moments/update-password', {
            username: formData.email,
            password: formData.password
        })
            .then(response => {
                setLoading(false)
                if (response.status == 200) {
                    navigate('/login');
                }
                else {
                    setFormData({})
                }
            })
            .catch(error => {
                error.message&&setErrorMsg(error.message)
                setLoading(false)
                console.log(error)
            })
    }


    const sendOTP = () => {
        setLoading(true)
        axios.get(`http://localhost:8080/moments/reset-password/send-otp?username=${formData.email}`)
            .then(response => {
                setLoading(false)
                if (response.status === 200) {
                    handleNextStep();
                }
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
                if(error.response){
                    setErrorMsg(error.response?.data)
                }
                else{
                    error.message?setErrorMsg(error.message):''
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
                if (response.status === 200) {
                    setLoading(false)
                    handleNextStep();
                }
            })
            .catch(error => {
                setLoading(false)
                console.log("test", error.response.data)
                setErrorMsg(error.response.data)
                setFormData({
                    ...formData,
                    otp: ''
                })
            })
    }



    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form onSubmit={(e) => {
                e.preventDefault();
            }} className="w-full max-w-sm bg-white px-[5%] py-[4%] rounded-lg shadow-lg">
                <h2 className="text-3xl mb-[30%] text-center font-bold text-center text-black">
                    Reset Password
                </h2>

                {formState === 0 && (
                    <StepEmail
                        email={formData.email}
                        onChange={handleChange}
                        nextStep={sendOTP}
                        loading={loading}
                    />
                )}
                {formState === 1 && <StepOTP loading={loading} nextStep={validateOTP} onChange={handleChange} formData={formData} />}
                {formState === 2 && (
                    <StepPassword
                        password={formData.password}
                        confirmPassword={formData.confirmPassword}
                        onChange={handleChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                )}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Remember your password?{' '}
                    <a href="/login" className="text-red-500 hover:underline">
                        Login
                    </a>
                </p>
                <p className='text-sm text-red-600'>{errorMsg}</p>

            </form>
        </div>
    );
};

export default ForgotPassword;
