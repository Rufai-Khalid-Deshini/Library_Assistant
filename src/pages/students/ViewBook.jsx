import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../components/Loading';
import { FaCaretLeft, FaCheck, FaRegStar, FaStar } from 'react-icons/fa'
import Alert from '@mui/material/Alert'
import SnackbarComponent from '../../components/SnackbarComponent';

const ViewBook = () => {

    // Book id
    const { id } = useParams();

    // Variable to keep book information
    const [book, setBook] = useState({});

    // Keep track of loading state
    const [loading, setLoading] = useState(false);

    // Track loading when placing borrow request
    const [loading2, setLoading2] = useState(false);

    // Value determines rating modal view or hide
    const [rate, setRate] = useState(false);

    // Value determines rating modal view or hide
    const [sendRequest, setSendRequest] = useState(false);

    // Keep track of return date chosen by user
    const [date, setDate] = useState('');

    // Keep track of user id
    const [userId, setUserId] = useState('');

    const [snackbar, setSnackar] = useState({
        message: "",
        severity: "error",
        open: false
    })

    const handleClose = () => {
        setSnackar({...snackbar, open: false})
    }

    // Checks whether the user is logged in on page load
    useEffect(() => {
        setLoading(true);

        axios
            .get('http://localhost:5555/users/me', { withCredentials: true})
            .then(res => {
                setUserId(res.data.user.id);
            })
            .catch(err => {
                // alert(err.response.data.message);
                setSnackar({
                    open: true,
                    severity: "error",
                    message: "Login to view this page"
                })
                setTimeout(() => {
                    location.href = "/";
                }, 1000)
            })

        axios
            .get(`http://localhost:5555/books/find/${id}`)
            .then((res) => {
                setBook(res.data);
                setRatings(res.data.rating)
                setLoading(false);
            })
            .catch((error) => {
                alert(error.response.data.message);
                setLoading(false);
            })
    }, [])

    // Check for correct date chosen
    const confirm = (date) => {
        const dateNow = new Date;
        const year = dateNow.getFullYear();
        const month = dateNow.getMonth();
        const dateCurr = dateNow.getDate();

        const chosen = date.split("-");

        /**
         * ** Algorithm **
         * 1. The chosen year must be greater this year
         * 2. But if the year is same year, the chosen month must be greater
         * 3. But if the month is same month, the chosen day must be greater
         * 4. Else the date is invalid
         */
        if(year >= chosen[0]) {
            if(year > chosen[0]) {
                return false;
            }else if(year == chosen[0]) {
                if((month+1) >= chosen[1]) {
                    if((month+1) > chosen[1]) {
                        return false;
                    }else if((month+1) == chosen[1]) {
                        if(dateCurr >= chosen[2]) {
                            return false;
                        }else {
                            return true;
                        }
                    }else {
                        return true;
                    }
                }else {
                    return true;
                }
            }
        }else {
            return true;
        }
    }

    // Send a borrow request to admin
    const request = () => {
        
        if(date.length === 0) {
            alert("Select date you plan to return the book to continue")
        }else if(date.length > 0 && !confirm(date)) {
            alert("Date of return cannot be today or days prior")
        }else {
            const data = {
                userId: userId,
                bookId: id,
                date: date
            }
            axios
                .post('http://localhost:5555/users/send-request', data)
                .then(res => {
                    alert(res.data.message)
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
        }

    }

    // Ratings from database
    const [ratings, setRatings] = useState([]);

    // Rating user will give
    const [rating, setRating] = useState(1);

    const [stars, setStars] = useState({
        star1: true,
        star2: false,
        star3: false,
        star4: false,
        star5: false
    })

    const submitRating = () => {
        setLoading2(true);
        const item = {
            rate: rating
        }
        axios
            .put(`http://localhost:5555/books/rate/${id}`, item)
            .then(res => {
                alert(res.data.message + "\nRated: " + rating + " stars");
                setLoading2(false);
            })
            .catch(err => {
                alert(err.response.data.message);
                setLoading2(false);
            })
    }

    return (
        <div className='p-2 font-[Montserrat] bg-blue-50 min-h-screen'>
            <Link to='/' className='text-blue-500 flex flex-row items-center justify-start'>
                <FaCaretLeft size='1.7em' />
                <span className='text-lg'>Back</span>
            </Link>
            {!loading && (
                <>
                    <div className='flex flex-col items-center justify-center mt-3 bg-white w-11/12 m-auto p-4 rounded-md'>
                        <a href={`http://localhost:5555/uploads/${book.image}`}>
                            <img src={`http://localhost:5555/uploads/${book.image}`} alt={book.title} className='w-28 h-36 mr-2' />
                        </a>

                        <SnackbarComponent
                            open={snackbar.open}
                            handleClose={handleClose}
                            message={snackbar.message}
                            severity={snackbar.severity}
                        />
                        
                        <div className='mt-4'>
                            <div className='flex flex-col items-center justify-center'>
                                <p className="text-lime-600 font-bold text-lg">Title</p>
                                <p>{book.title}</p>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <p className="text-lime-600 font-bold text-lg">Category</p>
                                <p><span className='capitalize'>{book.category}</span></p>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <p className="text-lime-600 font-bold text-lg">Rating</p>
                                <p><span className='capitalize'>{(ratings.reduce((sum, num) => sum + num, 0) / ratings.length).toFixed(1)}<FaStar color='gold' /></span></p>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <p className="text-lime-600 font-bold text-lg">Left in Stock</p>
                                <p>{book.instock}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <button className='duration-300 bg-blue-500 hover:bg-blue-600 text-white w-11/12 font-bold py-2 px-4 mt-4' onClick={() => setSendRequest(!sendRequest)}>Request To Borrow</button>
                        {sendRequest && (
                            <div className='bg-white w-11/12 my-3 p-5 flex flex-col items-center justify-center gap-2'>
                                <label htmlFor="return" className='cursor-pointer'>Kindly select date you wish to return the book</label>
                                <input type="date" name="return" id="return" onChange={(e) => {setDate(e.target.value)}} />
                                <button className='p-2 bg-lime-600 text-white' onClick={request}>Send Request</button>
                            </div>
                        )}
                        <button className='p-2 duration-300 bg-yellow-500 hover:bg-yellow-600 text-white w-11/12' onClick={() => setRate(!rate)}>Leave a Rating</button>
                    </div>
                    
                    {rate && (
                        <div className='flex flex-col items-center justify-center gap-1'>
                            
                            <div className='flex flex-row items-center justify-center'>
                                <p className='font-semibold text-lg'>Leave a rating:&nbsp;</p>
                                
                                <div className='flex flow-row items-center justify-center'>
                                    {stars.star1 == true && (
                                        <FaStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: false, star3: false, star4: false, star5: false}); setRating(1)}} />
                                    )}
                                    {stars.star2 == true && (
                                        <FaStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: true, star3: false, star4: false, star5: false}); setRating(2)}} />
                                    )}
                                    {stars.star3 == true && (
                                        <FaStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: true, star3: true, star4: false, star5: false}); setRating(3)}} />
                                    )}
                                    {stars.star4 == true && (
                                        <FaStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: true, star3: true, star4: true, star5: false}); setRating(4)}} />
                                    )}
                                    {stars.star5 == true && (
                                        <FaStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: true, star3: true, star4: true, star5: true}); setRating(5)}} />
                                    )}
                                    
                                    {stars.star1 == false && (
                                        <FaRegStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: false, star3: false, star4: false, star5: false}); setRating(1)}} />
                                    )}
                                    {stars.star2 == false && (
                                        <FaRegStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: true, star3: false, star4: false, star5: false}); setRating(2)}} />
                                    )}
                                    {stars.star3 == false && (
                                        <FaRegStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: true, star3: true, star4: false, star5: false}); setRating(3)}} />
                                    )}
                                    {stars.star4 == false && (
                                        <FaRegStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: true, star3: true, star4: true, star5: false}); setRating(4)}} />
                                    )}
                                    {stars.star5 == false && (
                                        <FaRegStar size='1.2em' className='text-yellow-400' onClick={() => {setStars({...stars, star1: true, star2: true, star3: true, star4: true, star5: true}); setRating(5)}} />
                                    )}
                                </div>
                            </div>

                            {stars.star1 == true && (
                                <>
                                    {loading2 && (
                                        <button className='animate-pulse bg-lime-400 text-white px-2 py-1 m-2 rounded cursor-not-allowed'>Submit</button>
                                    )}
                                    {!loading2 && (
                                        <button className='bg-lime-500 text-white px-2 py-1 m-2 rounded' onClick={submitRating}>Submit</button>
                                    )}
                                </>
                            )}
                            

                        </div>
                    )}
                    

                </>
            )}
            {loading && (
                <Loading />
            )}
        </div>
    )
}

export default ViewBook