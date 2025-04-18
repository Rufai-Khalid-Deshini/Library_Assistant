import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import SnackbarComponent from '../components/SnackbarComponent';

const Signup = () => {

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [page, setPage] = useState(0);

    const [faculty, setFaculty] = useState("");
    const [department, setDepartment] = useState("");
    const [level, setLevel] = useState("");
    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackar] = useState({
        open: false,
        message: "",
        severity: ""
    });

    const handleClose = () => {
        setSnackar({...snackbar, open: false})
    }

    const createUser = (e) => {
        if(username.length == 0 || fullName.length == 0 || password.length == 0 || email.length == 0 || phone.length == 0 || faculty.length == 0 || department.length == 0 || level.length == 0) {
            setSnackar({
                open: true,
                message: "Kindly fill out all fields to create your account",
                severity: "error"
            })
            return;
        }
        e.preventDefault();
        setLoading(true);

        const info = {
            username: username,
            fullname: fullName,
            password: password,
            email: email,
            phone: phone,
            faculty: faculty,
            department: department,
            level: level,
        }

        axios
            .post("http://localhost:5555/users", info)
            .then((res) => {
                setSnackar({
                    open: true,
                    message: "Account created successfully. You can now proceed to login.",
                    severity: "success"
                })
                setTimeout(() => {
                    location.href = "/login"
                })
                setLoading(false);
            })
            .catch((err) => {
                let error = err.response.data.message
                setSnackar({
                    open: true,
                    message: err.response.data.message || "There was an error creating your account kindly try again.",
                    severity: "error"
                })
                setLoading(false);
            });
    }

    return (
        <div className='bg-gradient-to-r from-teal-200 to-lime-200 h-screen pt-40 font-[Montserrat]'>
            <div className='flex flex-col items-center justify-center gap-5 shadow-md w-full rounded-t-3xl h-full m-auto p-8 bg-white'>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold'>Get Started</h1>
                    <p className='font-medium'>Create an account here to enjoy this app</p>
                </div>
                <div>
                    {loading && (
                        <Loading />
                    )}
                </div>
                <SnackbarComponent
                    open={snackbar.open}
                    severity={snackbar.severity}
                    handleClose={handleClose}
                    message={snackbar.message}
                />
                {page == 0 && (
                    <>
                        <div className='w-full flex flex-col items-center justify-center gap-3'>
                            <h2 className='text-center font-bold text-sky-700'>Part 1: Personal Details</h2>
                            <div className={username.length == 0 ? 'outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12' : 'outline-1 outline outline-gray-200 shadow-inner rounded p-1 flex flex-col items-center justify-center w-11/12'}>
                                {username.length != 0 && (
                                    <label htmlFor="uname" className='self-start text-gray-400 w-full'>*Username</label>
                                )}
                                <input type="text" name="uname" id="uname" placeholder='*Username' className='w-full outline-none border-none' onChange={(e) => setUsername(e.target.value)} value={username} />
                            </div>
                            <div className={fullName.length == 0 ? 'outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12' : 'outline-1 outline outline-gray-200 shadow-inner rounded p-1 flex flex-col items-center justify-center w-11/12'}>
                                {fullName.length != 0 && (
                                    <label htmlFor="fname" className='self-start text-gray-400 w-full'>*Full Name</label>
                                )}
                                <input type="text" name="fname" id="fname" placeholder='*Full Name' className='w-full outline-none border-none' onChange={(e) => setFullName(e.target.value)} value={fullName} />
                            </div>
                            <div className={password.length == 0 ? 'outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12' : 'outline-1 outline outline-gray-200 shadow-inner rounded p-1 flex flex-col items-center justify-center w-11/12'}>
                                {password.length != 0 && (
                                    <label htmlFor="pwd" className='self-start text-gray-400 w-full'>*Password</label>
                                )}
                                <input type="password" name="pwd" id="pwd" placeholder='*Password' className='w-full outline-none border-none' onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>

                            <button className='bg-gradient-to-r from-teal-600 to-lime-600 active:from-teal-500 active:to-lime-500 text-white rounded duration-500 hover:bg-gradient-to-t w-11/12 py-3 font-bold' onClick={() => setPage(1)}>Next</button>
                        </div>
                    </>
                )}
                {page == 1 && (
                    <>
                        <div className='w-full flex flex-col items-center justify-center gap-3'>
                            <h2 className='text-center font-bold text-yellow-600'>Part 2: Contact Info</h2>
                            <div className={email.length == 0 ? 'outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12' : 'outline-1 outline outline-gray-200 shadow-inner rounded p-1 flex flex-col items-center justify-center w-11/12'}>
                                {email.length != 0 && (
                                    <label htmlFor="email" className='self-start text-gray-400 w-full'>*Email Address</label>
                                )}
                                <input type="text" name="email" id="email" placeholder='*Email Address' className='w-full outline-none border-none' onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className={phone.length == 0 ? 'outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12' : 'outline-1 outline outline-gray-200 shadow-inner rounded p-1 flex flex-col items-center justify-center w-11/12'}>
                                {phone.length != 0 && (
                                    <label htmlFor="phone" className='self-start text-gray-400 w-full'>*Phone Number</label>
                                )}
                                <input type="text" name="phone" id="phone" placeholder='*Phone Number' className='w-full outline-none border-none' onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>

                            <div className='flex flow-row items-center justify-center w-11/12 gap-3'>
                                <button className='w-4/12 bg-gradient-to-r from-rose-600 to-red-600 active:from-rose-500 active:to-red-500 text-white rounded duration-500 hover:bg-gradient-to-t py-3 font-bold' onClick={() => setPage(0)}>Previous</button>
                                <button className='w-8/12 bg-gradient-to-r from-teal-600 to-lime-600 active:from-teal-500 active:to-lime-500 text-white rounded duration-500 hover:bg-gradient-to-t py-3 font-bold' onClick={() => setPage(2)}>Next</button>
                            </div>
                        </div>
                    </>
                )}

                {page == 2 && (
                    <>
                        <div className='w-full flex flex-col items-center justify-center gap-3'>
                            <h2 className='text-center font-bold text-green-700'>Part 3: School Info</h2>
                            {/* <div className={email.length == 0 ? 'outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12' : 'outline-1 outline outline-gray-200 shadow-inner rounded p-1 flex flex-col items-center justify-center w-11/12'}>
                                {email.length != 0 && (
                                    <label htmlFor="email" className='self-start text-gray-400 w-full'>*Email Address</label>
                                )}
                                <input type="text" name="email" id="email" placeholder='*Email Address' className='w-full outline-none border-none' onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className={phone.length == 0 ? 'outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12' : 'outline-1 outline outline-gray-200 shadow-inner rounded p-1 flex flex-col items-center justify-center w-11/12'}>
                                {phone.length != 0 && (
                                    <label htmlFor="phone" className='self-start text-gray-400 w-full'>*Phone Number</label>
                                )}
                                <input type="text" name="phone" id="phone" placeholder='*Phone Number' className='w-full outline-none border-none' onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div> */}
                            
                            <select onChange={(e) => {setFaculty(e.target.value); setDepartment("")}} name="faculty" id="faculty" className='outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12'>
                                <option value="">Select Faculty</option>
                                <option value="biosciences">Faculty of Biosciences</option>
                                <option value="physical and computational science">Faculty of Physical And Computational Sciences</option>
                            </select>
                            
                            {faculty == "physical and computational science" && (
                                <select onChange={(e) => setDepartment(e.target.value)} name="faculty" id="faculty" className='outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12'>
                                    <option value="">Select Department</option>
                                    <option value="computer science">Computer Science</option>
                                    <option value="mathematics">Mathematics</option>
                                    <option value="physics">Physics</option>
                                    <option value="chemistry">Chemistry</option>
                                    <option value="statistics and acturial science">Statistics and Acturial Science</option>
                                    <option value="meteorology and climate change">Meteorology And Climate Change</option>
                                </select>
                            )}

                            {faculty == "biosciences" && (
                                <select onChange={(e) => setDepartment(e.target.value)} name="faculty" id="faculty" className='outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12'>
                                    <option value="">Select Department</option>
                                    <option value="biochemistry and biotechnology">Biochemistry and Biotechnology</option>
                                    <option value="food science and technology">Food Science And Technology</option>
                                    <option value="theoretical and applied biology">Theoretical And Applied Biology</option>
                                    <option value="environmental Science">Environmental Science</option>
                                    <option value="optometry and visual science">Optometry And Visual Science</option>
                                </select>
                            )}

                            <select onChange={(e) => setLevel(e.target.value)} name='level' id='level' className='outline-1 outline outline-gray-200 shadow-inner rounded py-4 px-1 flex flex-col items-center justify-center w-11/12'>
                                <option value="">Select Level</option>
                                <option value="100">100 Level</option>
                                <option value="200">200 Level</option>
                                <option value="300">300 Level</option>
                                <option value="400">400 Level</option>
                                <option value="500">500 Level</option>
                                <option value="600">600 Level</option>
                            </select>

                            <div className='flex flow-row items-center justify-center w-11/12 gap-3'>
                                <button className='w-4/12 bg-gradient-to-r from-rose-600 to-red-600 active:from-rose-500 active:to-red-500 text-white rounded duration-500 hover:bg-gradient-to-t py-3 font-bold' onClick={() => setPage(1)}>Previous</button>
                                <button className='w-8/12 bg-gradient-to-r from-teal-600 to-lime-600 active:from-teal-500 active:to-lime-500 text-white rounded duration-500 hover:bg-gradient-to-t py-3 font-bold' onClick={createUser}>Create Account</button>
                            </div>
                        </div>
                    </>
                )}
                
                <p>Already have an account? <Link className='text-lime-700 underline p-1' to='/login'>Sign in here.</Link></p>
            </div>
        </div>
    )
}

export default Signup