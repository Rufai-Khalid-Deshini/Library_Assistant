import React, { useState } from 'react'
import Loading from '../components/Loading';
import axios from 'axios';
import BookDisplay from '../components/BookDisplay';
import { Link } from 'react-router-dom';

const SearchPage = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = () => {

        setLoading(true);

        axios
            .get(`https://lib-backend-i000.onrender.com/admin/search/${searchTerm.toLowerCase()}`)
            .then(res => {
                setResults(res.data);
                setLoading(false)
                console.log(res)
            })
            .catch(err => {
                if(err.response) {
                    alert(err.response.data.message)
                }else {
                    alert(err)
                }
                setLoading(false)
            })

    }

    return (
        <div className='bg-sky-50 p-5 min-h-screen'>
            <div className='flex flex-row items-center justify-center gap-2 w-11/12 mx-auto'>
                <input className='border border-solid border-slate-400 p-2 rounded-sm w-9/12 outline-none' onChange={(e) => setSearchTerm(e.target.value)} type="search" name="search" id="search" placeholder='Search for books...' />
                <button className='text-yellow-50 bg-sky-500 p-2 duration-300 hover:bg-sky-700 active:bg-sky-600' onClick={search}>Search</button>
            </div>

            {loading && (
                <Loading />
            )}

            {/* {!loading &&  (
                <p>{results.response.data.message}</p>
            )} */}

            {!loading && (
                results.map((result, i) => {
                    return (
                        <Link to={`/students/book/${result._id}`} className='w-full'>
                            <BookDisplay key={result._id} {...result} id={result._id} ye={result.ye} />
                        </Link>
                    )
                })
            )}
        </div>
    )
}

export default SearchPage