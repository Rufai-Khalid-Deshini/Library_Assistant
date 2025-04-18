import React, { useState } from 'react'
import Loading from '../components/Loading';
import axios from 'axios';

const SearchPage = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = () => {

        setLoading(true);

        axios
            .get(`http://localhost:5555/admin/search/${searchTerm}`)
            .then(res => {
                setResults(res.data);
            })
            .catch(err => {
                alert(err)
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

            {!loading && (
                results.map((result, i) => {
                    return (
                        <div key={i}>
                            <p>{result}</p>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default SearchPage