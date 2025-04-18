import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiCaretLeft } from 'react-icons/bi';
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

const PendingRequests = () => {

    const [info, setInfo] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios
            .get('https://lib-backend-i000.onrender.com/admin/pending')
            .then(res => {
                setInfo(res.data);
                setLoading(false);
            })
            .catch(err => {
                alert(err.response.data.message);
                setLoading(false);
            })
    }, []);

    // Accept and send notification
    const accept = (id, bId, due, pId) => {

        setLoading2(true);

        const data = {
            message: "Your book request have been approved. Kindly come to the library with this message to pick up book."
        };

        axios
            .put(`https://lib-backend-i000.onrender.com/admin/send-notif/${id}`, data)
            .then(res => {
                alert(res.data.message)
            })
            .catch(errr => {
                alert(errr.response.data.message)
            });

        axios
            .delete(`https://lib-backend-i000.onrender.com/admin/remove/${pId}`)
            .catch(err => {
                if(err.response) {
                    alert(err.response.data.message);
                }else {
                    alert(err);
                }
            });

        const transaction = {
            userId: id,
            bookId: bId,
            dueDate: due
        };
        axios
            .post('https://lib-backend-i000.onrender.com/admin/add-transaction', transaction)
            .then(res => {
                alert(res.data.message)
                setLoading2(false);
            })
            .catch(err => {
                if(err.response) {
                    alert(err.response.data.message)
                }else {
                    alert(err)
                }
                setLoading2(false);
            })

        location.reload();
    }

    // Decline and send notif
    const decline = (id, pId) => {

        setLoading2(true);
        const data = {
            message: `Your book request have been declined. \nReason: ${prompt("Reason for declining: ")}`
        };

        axios
            .put(`https://lib-backend-i000.onrender.com/admin/send-notif/${id}`, data)
            .then(res => {
                alert(res.data.message)
            })
            .catch(errr => {
                alert(errr.response.data.message)
            });

        axios
            .delete(`https://lib-backend-i000.onrender.com/admin/remove/${pId}`)
            .then(res => {
                setLoading2(false);
            })
            .catch(err => {
                if(err.response) {
                    alert(err.response.data.message);
                }else {
                    alert(err);
                }
                setLoading2(false);
            });

        location.reload();
    }

    return (
        <div className='p-1 bg-sky-50 min-h-screen'>
            {loading && (
                <Loading />
            )}
            {!loading && (
                <>
                    <Link to='/admin/dashboard' className='flex flex-row items-center justify-start text-sky-800 m-2'>
                        <BiCaretLeft size='2.3em' />
                        <p className='text-lg font-semibold'>Back</p>
                    </Link>
                    {!loading && info.length > 0 && (

                        <>
                            {info.map((item, i) => {
                                return (
                                    <div className='flex flex-col sm:flex-row items-center justify-start gap-3 bg-white w-11/12 rounded-md shadow-md mx-auto p-2 sm:p-0 my-5'>
                                        <img src={`https://lib-backend-i000.onrender.com/pictures/${item.user.picture}`} alt={item.user.username} className='w-44 h-52 sm:h-full' style={{ objectFit: "cover"}} />
                                        {/* <div className='w-48 h-full bg-lime-500'></div> */}
                                        <div className="flex flex-col items-center sm:items-start justify-center gap-1">
                                            <div className='flex flex-col sm:flex-row sm:flex-wrap items-center justify-start gap-1'>
                                                <p className='font-bold text-lg'>Full Name:</p>
                                                <p>{item.user.fullname}</p>
                                            </div>
                                            <div className='flex flex-col sm:flex-row sm:flex-wrap items-center justify-start gap-1'>
                                                <p className='font-bold text-lg'>Level:</p>
                                                <p>{item.user.level}</p>
                                            </div>
                                            <div className='flex flex-col sm:flex-row sm:flex-wrap items-center justify-start gap-1'>
                                                <p className='font-bold text-lg'>Book Requested:</p>
                                                <p className='text-center sm:text-start'>{item.book.title} by <span>{item.book.author}</span></p>
                                            </div>
                                            <div className='flex flex-col sm:flex-row sm:flex-wrap items-center justify-start gap-1'>
                                                <p className='font-bold text-lg'>Request Date:</p>
                                                <p>{item.createdAt.slice(0, item.createdAt.indexOf("T"))}</p>
                                            </div>
                                            <div className='flex flex-col sm:flex-row sm:flex-wrap items-center justify-start gap-1'>
                                                <p className='font-bold text-lg'>Return Date:</p>
                                                <p>{item.durationRequested.slice(0, item.durationRequested.indexOf("T"))}</p>
                                            </div>

                                            <div className='self-center m-2 w-11/12 flex flex-row'>
                                                {!loading2 && (
                                                    <>
                                                        <button className='bg-lime-500 duration-300 hover:bg-lime-600 text-white p-2 flex-1 flex flex-row items-center justify-center gap-2' onClick={() => accept(item.user._id, item.book._id, item.durationRequested, item._id)}>
                                                            <span>Accept</span>
                                                            <FaCheck />
                                                        </button>
                                                        <button className='bg-rose-500 duration-300 hover:bg-rose-600 text-white p-2 flex-1 flex flex-row items-center justify-center gap-2' onClick={() => decline(item.user._id, item._id)}>
                                                            <span>Decline</span>
                                                            <FaTimes />
                                                        </button>
                                                    </>
                                                )}
                                                {loading2 && (
                                                    <>
                                                        <button className='bg-lime-500 duration-300 hover:bg-lime-600 text-white p-2 flex-1 flex flex-row items-center justify-center gap-2 cursor-not-allowed'>
                                                            <span>Accept</span>
                                                            <FaCheck />
                                                        </button>
                                                        <button className='bg-rose-500 duration-300 hover:bg-rose-600 text-white p-2 flex-1 flex flex-row items-center justify-center gap-2 cursor-not-allowed'>
                                                            <span>Decline</span>
                                                            <FaTimes />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>

                        // <table className='my-2 mx-auto md:w-11/12 font-[Montserrat]'>
                        //     <tr>
                        //         <th className='border-1 border border-sky-500 p-1'>Student Name</th>
                        //         <th className='border-1 border border-sky-500 p-1'>Level</th>
                        //         <th className='border-1 border border-sky-500 p-1'>Book Requested</th>
                        //         <th className='border-1 border border-sky-500 p-1'>Date Requested</th>
                        //         <th className='border-1 border border-sky-500 p-1'>Return Date Requested</th>
                        //         <th className='border-1 border border-sky-500 p-1'>Actions</th>
                        //     </tr>
                        //     {info.map((item, i) => {
                        //         return (
                        //             <tr>
                        //                 <td className='border-1 border border-sky-500 p-1'>{item.user.fullname}</td>
                        //                 <td className='border-1 border border-sky-500 p-1'>{item.user.level}</td>
                        //                 <td className='border-1 border border-sky-500 p-1'>{item.book.title}</td>
                        //                 <td className='border-1 border border-sky-500 p-1'>{item.createdAt.slice(0, item.createdAt.indexOf("T"))}</td>
                        //                 <td className='border-1 border border-sky-500 p-1'>{item.durationRequested.slice(0, item.createdAt.indexOf("T"))}</td>
                        //                 <td className='border-1 border border-sky-500 p-1'>
                        //                     <div className='flex flex-row items-center justify-around'>
                        //                         <FaCheck className='p-1 cursor-pointer' size='2em' color='green' title='Accept' onClick={() => accept(item.user._id)} />
                        //                         <FaTimes className='p-1 cursor-pointer' size='2em' color='red' title='Decline' />
                        //                     </div>
                        //                 </td>
                        //             </tr>
                        //         )
                        //     })}
                        // </table>
                    )}
                    {!loading && info.length === 0 && (
                        <div className='bg-slate-100 w-11/12 m-auto p-4 rounded'>
                            <p className='font-[Montserrat] text-lg text-center'>There are currently no pending borrow requests</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default PendingRequests