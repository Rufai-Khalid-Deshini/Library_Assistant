import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { GoPerson, GoPersonFill } from "react-icons/go";
import { RiSettingsLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import axios from 'axios';

const DashboardSide = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        axios
            .get('https://lib-backend-i000.onrender.com/users/me', { withCredentials: true})
            .then((res) => {
                const data = {
                    id: res.data.user.id
                }
                axios
                    .post('https://lib-backend-i000.onrender.com/users/get-info', data)
                    .then(res => {
                        setUser(res.data);
                    })
            })
    }, []);

    const logout = async () => {
        axios
            .post('https://lib-backend-i000.onrender.com/users/logout', {}, { withCredentials: true })
            .then(res => {
                location.href = "/";
            });

        
    }

    return (
        <div className='shadow-lg outline-1 outline outline-gray-300 h-screen py-6 px-2 font-[Montserrat] flex flex-col items-center justify-start gap-6'>
            <Link to='/admin/dashboard' className='flex flex-col items-center justify-center gap-2'>
                <MdOutlineDashboard size='3em' color='white' className='flex flex-col items-center justify-center bg-blue-500 shadow-md shadow-blue-300 rounded p-3' />
                <p className='text-sm font-bold text-blue-400'>Dashboard</p>
            </Link>

            <Link to='/profile' className='flex flex-col items-center justify-center gap-2' onClick={() => localStorage.setItem("nav", "profile")}>
                <GoPersonFill size='3em' className='flex flex-col items-center justify-center text-blue-500 bg-blue-50 shadow-sm shadow-blue-300 rounded p-3' />
                <p className='text-sm font-bold text-slate-500'>Profile</p>
            </Link>

            {!user.picture && (
                <>
                    <div to='' className='flex flex-col items-center justify-center gap-2 absolute bottom-28'>
                        <GoPerson size='3em' className='flex flex-col items-center justify-center text-blue-500 bg-blue-50 shadow-sm shadow-blue-300 rounded p-3' />
                        <p className='text-sm font-bold text-slate-500 line-clamp-1'>{user.fullname}</p>
                    </div>
                </>
            )}
            {user.picture && (
                <>
                    <div className='flex flex-col items-center justify-center gap-2 absolute bottom-28'>
                        <img src={`https://lib-backend-i000.onrender.com/pictures/${user.picture}`} className='flex flex-col items-center justify-center text-blue-500 rounded-lg w-16 h-20 outline-1 outline shadow-md shadow-blue-300' style={{ objectFit: "cover" }} />
                        <p className='text-sm font-bold text-slate-500 line-clamp-1'>{user.fullname}</p>
                    </div>
                </>
            )}

            <div onClick={logout} className='flex flex-col items-center justify-center gap-2 absolute bottom-2 cursor-pointer'>
                <CiLogout size='3em' className='flex flex-col items-center justify-center text-blue-500 bg-blue-50 shadow-sm shadow-blue-300 rounded p-3' />
                <p className='text-sm font-bold text-slate-500 line-clamp-1'>Logout</p>
            </div>
        </div>
    )
}

export default DashboardSide