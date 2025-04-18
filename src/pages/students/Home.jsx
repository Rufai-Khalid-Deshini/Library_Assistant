import React, { useEffect, useState } from 'react'
import Navbar from '../../components/student/Navbar'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import Loading from '../../components/Loading'
import BookDisplay from '../../components/BookDisplay'
import { Link } from 'react-router-dom'
import { BiDiamond } from 'react-icons/bi'
import { MdOutlineVerified } from 'react-icons/md'

const Home = () => {

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5555/books')
            .then((res) => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch((err) => {
                alert(err.response.data.message);
                setLoading(false);
            })
    }, []);

    return (
        <div className='font-[Montserrat]'>
            <Navbar />
            
            {loading && <Loading />}

            {!loading && (
                <div className='ml-6 flex flex-row items-center justify-start'>
                    <BiDiamond className='text-yellow-500' size='1.3em' />
                    <h2 className='font-extrabold text-lg'>Top Picks</h2>
                </div>
            )}
            {books.map((book) => (
                <Link to={`/students/book/${book._id}`} className='w-full'>
                    <BookDisplay key={book._id} {...book} id={book._id} ye={book.ye} />
                </Link>
            ))}

            {/* <div className='ml-6 flex flex-row items-center justify-start'>
                <MdOutlineVerified className='text-yellow-500' size='1.3em' />
                <h2 className='font-extrabold text-lg'>Recommended</h2>
            </div> */}
        </div>
    )
}

export default Home