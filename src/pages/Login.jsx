import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import SnackbarComponent from '../components/SnackbarComponent';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackar] = useState({
        open: false,
        message: "",
        severity: ""
    })

    const handleClose = () => {
        setSnackar({...snackbar, open: false})
    }

    const login = () => {
        if(email.length === 0 || password.length === 0) {
            alert("Fill in all required details to login")
            return;
        }

        setLoading(true);
        const formData = {
            "email": email,
            "password": password
        }

        axios
            .post("https://lib-backend-i000.onrender.com/users/login", formData, { withCredentials: true })
            .then((res) => {
                if(res.data.role == "admin") {
                    setSnackar({
                        open: true,
                        message: "Login successful",
                        severity: "success"
                    })
                    setTimeout(() => {
                        location.href = "/admin/dashboard";
                    }, 2000)
                }else {
                    setSnackar({
                        open: true,
                        message: "Login successful",
                        severity: "success"
                    })
                    setTimeout(() => {
                        location.href = "/";
                    }, 2000)
                }
                setLoading(false);
            })
            .catch((err) => {
                setSnackar({
                    open: true,
                    message: "Login failed, check username or password and retry",
                    severity: "error"
                })
                setLoading(false);
            })
        
    }

    return (
        <div className='bg-gradient-to-r from-teal-200 to-lime-200 h-screen pt-40 font-[Montserrat]'>
            <div className='flex flex-col items-center justify-center gap-5 shadow-md w-full rounded-t-3xl h-full m-auto p-8 bg-white'>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold'>Welcome Back</h1>
                    <p className='font-medium'>Enter your details below</p>
                </div>

                <SnackbarComponent
                    handleClose={handleClose}
                    open={snackbar.open}
                    message={snackbar.message}
                    severity={snackbar.severity}
                />

                <div>
                    {loading && (
                        <Loading />
                    )}
                </div>

                <div className={email.length == 0 ? 'outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12' : 'outline-1 outline outline-gray-200 shadow-inner rounded p-1 flex flex-col items-center justify-center w-11/12'}>
                        {email.length != 0 && (
                            <label htmlFor="email" className='self-start text-gray-400 w-full'>*Email</label>
                        )}
                        <input type="email" name="email" id="email" placeholder='*Email' className='w-full outline-none border-none' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={password.length == 0 ? 'outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12' : 'outline-1 outline outline-gray-200 shadow-inner rounded p-1 flex flex-col items-center justify-center w-11/12'}>
                        {password.length != 0 && (
                            <label htmlFor="pwd" className='self-start text-gray-400 w-full'>*Password</label>
                        )}
                        <input type="password" name="pwd" id="pwd" placeholder='*Password' className='w-full outline-none border-none' onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button onClick={login} className='bg-gradient-to-r from-teal-600 to-lime-600 active:from-teal-500 active:to-lime-500 text-white rounded duration-500 hover:bg-gradient-to-t w-11/12 py-3 font-bold'>Login</button>

                
                <p>Don't have an account? <Link className='text-lime-700 underline p-1' to='/signup'>Create an account here.</Link></p>
            </div>
        </div>
    )
}

export default Login