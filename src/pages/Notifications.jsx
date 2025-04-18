import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiMessage } from 'react-icons/bi';
import { FaCaretLeft } from 'react-icons/fa';
import { GiEmptyHourglass } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Notifications = () => {

    const [notifs, setNotifs] = useState([]);
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        axios
            .get('https://lib-backend-i000.onrender.com/users/me', { withCredentials: true })
            .then(res => {
                setId(res.data.user.id)
            })
            .catch(err => {
                alert(err.response.data.message);
            })

        axios
            .post('https://lib-backend-i000.onrender.com/users/get-info', { id: id })
            .then(res => {
                setNotifs(res.data.notifications);
                setLoading(false);
            })
            .catch(err => {
                alert(err.response.data.message)
            })
    }, [id])
    return (
        <div className='bg-cyan-50 min-h-screen font-[Montserrat]'>
            <Link to='/' className='text-blue-500 flex flex-row items-center justify-start p-2 w-24'>
                <FaCaretLeft size='1.4em' />
                <span>Back</span>
            </Link>
            <h1 className='font-extrabold text-2xl px-4 text-slate-800'>Notifications</h1>
            {loading && (
                <Loading />
            )}
            {!loading && notifs.length > 0 && (
                <>
                    {notifs.map((notif, i) => {
                        return (
                            <div className='bg-white w-11/12 mx-auto my-6 flex flex-col md:flex-row items-center justify-start gap-3 p-8 rounded-md shadow-md cursor-pointer'>
                                <BiMessage size='2em' />
                                <p className='text-lg'>{notif}</p>
                            </div>
                        )
                    })}
                </>
            )}
            {!loading && notifs.length === 0 && (
                <div className='bg-white w-11/12 mx-auto my-6 flex flex-col items-center justify-center gap-3 p-8 rounded-md shadow-md'>
                    <GiEmptyHourglass size='4em' className='text-slate-600' />
                    <p className='text-lg font-semibold'>You currently have no notifications</p>
                </div>
            )}
        </div>
    )
}

export default Notifications