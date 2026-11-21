import axios from 'axios';
import React, { useEffect } from 'react'
import DashboardSide from '../../components/librarian/DashboardSide';
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlinePending, MdOutlinePendingActions } from 'react-icons/md';
import { BiBookAdd } from 'react-icons/bi';
import { CiViewList } from 'react-icons/ci';
import { useState } from 'react';
import Loading from '../../components/Loading';

const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://lib-backend-i000.onrender.com/users/me/${localStorage.getItem("id")}`, { withCredentials: true})
            .then(res => {
                if(res.data.role != "admin") {
                    alert("Access denied");
                    navigation("/");
                }

                setLoading(false);
            })
            .catch(err => {
                alert("Something went wrong. Kindly try relogging in and try again.");
                navigation("/");
            })


        // old code before the pathetic approach to local storage
        /* axios
            .get('https://lib-backend-i000.onrender.com/users/me', { withCredentials: true})
            .then((res) => {
                const data = {
                    id: localStorage.getItem("id")
                }
                
                axios
                    .post('https://lib-backend-i000.onrender.com/users/get-info', data)
                    .then(res => {
                        if(res.data.role != "admin") {
                            alert("Access denied");
                            navigation("/");
                        }

                        setLoading(false);
                    })
            })
            .catch(err => {
                alert("Something went wrong. Kindly try relogging in and try again.");
                navigation("/");
            }) */
    }, []);

    return (
        <div className='flex flex-row items-start justify-start'>
            {loading && <Loading />}
            {!loading && 
                <>
                    <DashboardSide />
                    <div className='p-3 flex flex-row items-start justify-start gap-3 bg-blue-50 w-full flex-wrap'>
                        <Link to='/admin/dashboard/add-book' className='flex flex-grow flex-col items-center justify-center p-3 rounded bg-white shadow w-11/12 md:w-1/5'>
                            <BiBookAdd size='4em' />
                            <p>Add Book</p>
                        </Link>
                        <Link to='/admin/dashboard/all-books' className='flex flex-grow flex-col items-center justify-center p-3 rounded bg-white shadow w-11/12 md:w-1/5'>
                            <CiViewList size='4em' />
                            <p>View All Books</p>
                        </Link>
                        <Link to='/admin/dashboard/pending-requests' className='flex flex-grow flex-col items-center justify-center p-3 rounded bg-white shadow w-11/12 md:w-1/5'>
                            <MdOutlinePending size='4em' />
                            <p>Pending Borrow Requests</p>
                        </Link>
                        <Link to='/admin/dashboard/borrowed-books' className='flex flex-grow flex-col items-center justify-center p-3 rounded bg-white shadow w-11/12 md:w-1/5'>
                            <MdOutlinePendingActions size='4em' />
                            <p>Borrowed Books</p>
                        </Link>
                        <Link to='/admin/dashboard/overdue-books' className='flex flex-grow flex-col items-center justify-center p-3 rounded bg-white shadow w-11/12 md:w-1/5'>
                            <MdOutlinePendingActions size='4em' />
                            <p>Overdue Books</p>
                        </Link>
                    </div>
                </>
            }
        </div>
    )
}

export default Dashboard