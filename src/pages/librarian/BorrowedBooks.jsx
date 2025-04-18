import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import { BiCaretLeft } from 'react-icons/bi';
import SnackbarComponent from '../../components/SnackbarComponent';

const BorrowedBooks = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: ""
    })
    
    const handleClose = () => {
        setSnackbar({...snackbar, open: false})
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://lib-backend-i000.onrender.com/transaction')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setSnackbar({
                    open: true,
                    message: "Couldn't load data. Kindly refresh or try again later",
                    severity: "error"
                })
            })
    }, [])

    const markReturned = (id, userId) => {

        setLoading2(true);

        axios
            .put(`https://lib-backend-i000.onrender.com/transaction/${id}`)
            .then(res => {
                setSnackbar({
                    open: true,
                    message: "Book successfully marked as returned",
                    severity: "success"
                })
            })
            .catch(err => {
                setSnackbar({
                    open: true,
                    message: "Book couldn't be marked as returned",
                    severity: "error"
                })
            })

        setTimeout(() => {
            const transId = {
                transactionId: id
            }
            axios
                .put(`https://lib-backend-i000.onrender.com/transaction/add-to-borrowed/${userId}`, transId)
                .then(res => {
                    setLoading2(false);
                    setSnackbar({
                        open: true,
                        message: "Book added to user's borrowed books history",
                        severity: "success"
                    })
                })
                .catch(err => {
                    setLoading2(false);
                    alert(userId + " : " + id)
                    setSnackbar({
                        open: true,
                        message: "An error occured trying to add book to borrowed books history",
                        severity: "error"
                    })
                })
        }, 2000)


        setTimeout(() => {
            location.reload();
        }, 5000)
    }
    return (
        <div className='bg-sky-50 min-h-screen'>
            <Link to='/admin/dashboard' className='flex flex-row items-center justify-start text-sky-800 '>
                <BiCaretLeft size='2.3em' />
                <p className='text-lg font-semibold'>Back</p>
            </Link>
            {loading && (
                <Loading />
            )}
            {!loading && (
                <>
                    <SnackbarComponent
                        open={snackbar.open}
                        message={snackbar.message}
                        severity={snackbar.severity}
                    />
                    {data.map((item, i) => {
                        return (
                            <>
                                {item.status == "borrowed" && (
                                    <div key={item._id} className='bg-white shadow w-11/12 mx-auto mb-3 rounded flex flex-col sm:flex-row items-center justify-center sm:justify-start sm:gap-2 p-2 sm:p-0 font-[Montserrat]'>
                                        <img src={`https://lib-backend-i000.onrender.com/uploads/${item.bookId.image}`} alt={item.username} className='w-32 h-40' style={{ objectFit: "cover"}} />
                                        <div className='sm:flex sm:flex-col sm:items-start sm:justify-center'>
                                            <div className='flex flex-col sm:flex-row items-center justify-center sm:gap-2'>
                                                <p className='text-lg font-bold text-sky-800'>Borrowed By:</p>
                                                <p className='text-lg capitalize'>{item.userId.fullname}</p>
                                            </div>
                                            <div className='flex flex-col sm:flex-row items-center justify-center sm:gap-2'>
                                                <p className='text-lg font-bold text-sky-800'>Status:</p>
                                                <p className='text-lg capitalize'>{item.status}</p>
                                            </div>
                                            <div className='flex flex-col sm:flex-row items-center justify-center sm:gap-2'>
                                                <p className='text-lg font-bold text-sky-800'>Due Date:</p>
                                                <p className='text-lg capitalize'>{item.dueDate.slice(0, item.dueDate.indexOf("T"))}</p>
                                            </div>
                                            {!loading2 && (
                                                <button className='bg-green-500 text-white p-2 rounded-sm duration-300 hover:bg-green-700' onClick={() => markReturned(item._id, item.userId._id)}>Mark As Returned</button>
                                            )}
                                            {loading2 && (
                                                <button className='animate-pulse bg-green-500 text-white p-2 rounded-sm duration-300 hover:bg-green-700'>Returning...</button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default BorrowedBooks