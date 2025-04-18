import React, { useEffect, useState } from 'react';
import { GiBookshelf } from 'react-icons/gi';
// import { IoMdPerson } from 'react-icons/io'
import { Link } from 'react-router-dom';
import Underline from '../Underline';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {

    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        axios
            .get('https://lib-backend-i000.onrender.com/users/me', { withCredentials: true})
            .then((res) => {
                setVerified(true);

                const data = {
                    id: res.data.user.id
                }
                axios
                    .post('https://lib-backend-i000.onrender.com/users/get-info', data)
                    .then(res => {
                        setUser(res.data.fullname);
                        if(res.data.role === "admin") {
                            setIsAdmin(true);
                        }
                    })
                    .catch(err =>  {
                        if(err.response) {
                            console.log(err.response.data.message);
                        }else {
                            console.log(err)
                        }
                    })
            })
            .catch(err => {
                if(err.response) {
                    console.log(err.response.data.message);
                }else {
                    console.log(err)
                }
            })
    }, [])

    return (
        <div className='p-2 bg-slate-900 flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center justify-center gap-2'>
                <GiBookshelf size='3.5em' color='white' />
                <p className='text-xl text-white font-bold hidden sm:block'>Library</p>
            </div>
            <div className='text-white flex flow-row items-center justify-between font-semibold text-base'>
                <Link to='/' onClick={() => localStorage.clear("nav")} className='p-2'>Home{!localStorage.getItem("nav")? <Underline /> : ""}</Link>
                {/* <Link to='/students/categories' onClick={() => localStorage.setItem("nav", "cat")} className='p-2'>Categories{localStorage.getItem("nav") == "cat" ? <Underline /> : ""}</Link> */}
                <Link to='/students/search' onClick={() => localStorage.setItem("nav", "cat")} className='p-2'>Search{localStorage.getItem("nav") == "cat" ? <Underline /> : ""}</Link>
                {isAdmin && (
                    <Link to='/admin/dashboard' onClick={() => localStorage.setItem("nav", "admin")} className='p-2'>Admin{localStorage.getItem("nav") == "admin" ? <Underline /> : ""}</Link>
                )}
                {verified && (
                    <Link to='/profile' onClick={() => localStorage.setItem("nav", "profile")} className='p-2'>Profile{localStorage.getItem("nav") == "profile" ? <Underline /> : ""}</Link>
                )}
                {!verified && (
                    <Link to='/login' onClick={() => localStorage.setItem("nav", localStorage.getItem("nav"))} className='p-2'>Login{localStorage.getItem("nav") == "login" ? <Underline /> : ""}</Link>
                )}
                
            </div>
            <div className='flex flex-row items-center justify-between gap-1 text-white'>
                {verified && (
                    // <Link to='/profile' onClick={() => localStorage.setItem("nav", "profile")} className='flex flex-row items-center justify-center'>
                    //     <IoMdPerson size='1.5em' />
                    //     <p className='w-24 line-clamp-1 text-ellipsis sm:w-full'>{user}</p>
                    // </Link>

                    <Link to='/notifications' title='Notification' className='flex flex-col items-center justify-center'>
                        <FaBell size='1.5em' />
                        <p className='text-xs'>Notifications</p>
                    </Link>
                )}
                {!verified && (
                    <Link to='/login' className='bg-cyan-600 px-4 py-2 rounded duration-300 active:bg-cyan-400'>Login</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar