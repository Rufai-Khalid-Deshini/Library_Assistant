import React, { useEffect, useState } from 'react'
import Navbar from '../../components/student/Navbar'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import Loading from '../../components/Loading'
import BookDisplay from '../../components/BookDisplay'
import { Link } from 'react-router-dom'
import { BiDiamond } from 'react-icons/bi'
import { MdOutlineVerified } from 'react-icons/md'
import SnackbarComponent from '../../components/SnackbarComponent'

const Home = () => {

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: ""
    });

    const [err, setErr] = useState(false);

    const handleClose = () => {
        setSnackbar({...snackbar, open: false})
    }

    useEffect(() => {
        axios.get('http://localhost:5555/books')
            .then((res) => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if(err.response) {
                    setSnackbar({
                        open: true,
                        message: err.response.data.message,
                        severity: "error"
                    })
                }else {
                    setSnackbar({
                        open: true,
                        message: "Something went wrong. Kindly check your network connection and try again.",
                        severity: "error"
                    })
                }
                setErr(true);
                setLoading(false);
            })
    }, []);

    return (
        <div className='font-[Montserrat]'>
            <Navbar />
            
            {loading && <Loading />}

            {!loading && books.length > 0 && (
                <div className='ml-6 flex flex-row items-center justify-start'>
                    <BiDiamond className='text-yellow-500' size='1.3em' />
                    <h2 className='font-extrabold text-lg'>Top Picks</h2>
                </div>
            )}
            
            {!loading && !err && books.length > 0 && (
                <>
                    {books.map((book) => (
                        <Link to={`/students/book/${book._id}`} className='w-full'>
                            <BookDisplay key={book._id} {...book} id={book._id} ye={book.ye} />
                        </Link>
                    ))}
                </>
            )}

            {!loading && !err && books.length === 0 && (
                <>
                    <p className='text-center m-3 text-lg font-bold'>No books availabe yet.</p>
                </>
            )}

            {!loading && err && books.length === 0 && (
                <>
                    <p className='text-center m-3 text-lg'>Something went wrong. Kindly <span className='text-slate-800 underline font-bold cursor-pointer' onClick={() => location.reload()}>reload</span> to try again.</p>
                </>
            )}

            <SnackbarComponent
                handleClose={handleClose}
                message={snackbar.message}
                open={snackbar.open}
                severity={snackbar.severity}
            />

            {/* <div className='ml-6 flex flex-row items-center justify-start'>
                <MdOutlineVerified className='text-yellow-500' size='1.3em' />
                <h2 className='font-extrabold text-lg'>Recommended</h2>
            </div> */}
        </div>
    )
}

export default Home