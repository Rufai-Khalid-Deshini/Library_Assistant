import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import { BiCaretLeft, BiEditAlt } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';

const ViewBooks = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        axios
            .get('http://localhost:5555/books')
            .then((res) => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                alert(err)
            })
        
    }, []);

    const deleteBook = (key) => {
        let conf = confirm("Are you sure you want to delete this item? This action cannot be undone.");
        if(conf) {
            setLoading(true);
            axios
                .delete(`http://localhost:5555/books/${key}`)
                .then(res => {
                    alert(`${res.data.message}`);
                    location.reload();
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    return (
        <div>
            {loading && (
                <Loading />
            )}
            {!loading && (
                <>
                    <Link to='/admin/dashboard' className='flex flex-row items-center justify-start text-sky-800 m-2'>
                        <BiCaretLeft size='2.3em' />
                        <p className='text-lg font-semibold'>Back</p>
                    </Link>
                    <table border={2} className='m-2 border-collapse'>
                        <tr>
                            <th className='p-2 border border-solid border-blue-400 text-blue-500 w-1/5'>Title</th>
                            <th className='p-2 border border-solid border-blue-400 text-blue-500 w-1/5'>Author</th>
                            <th className='p-2 border border-solid border-blue-400 text-blue-500 w-1/5'>Rating</th>
                            <th className='p-2 border border-solid border-blue-400 text-blue-500 w-1/5'>In Stock</th>
                            <th className='p-2 border border-solid border-blue-400 text-blue-500 w-1/5'>Actions</th>
                        </tr>
                        {books.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <td className='p-1 border border-solid border-blue-400'>{item.title}</td>
                                <td className='p-1 border border-solid border-blue-400'>{item.author}</td>
                                <td className='text-right p-1 border border-solid border-blue-400'>{((item.rating).reduce((sum, num) => sum + num, 0) / (item.rating).length).toFixed(1)}</td>
                                <td className='text-right p-1 border border-solid border-blue-400'>{item.instock}</td>
                                <td className='text-right p-1 border border-solid border-blue-400'>
                                    <div className='flex flex-row items-center justify-around'>
                                        <MdDeleteForever size='2em' title='Delete' className='text-rose-600 cursor-pointer p-1' onClick={() => deleteBook(item._id)} />
                                        <BiEditAlt size='2em' title='Edit' className='text-lime-600 cursor-pointer p-1' />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </table>
                </>
            )}
        </div>
    )
}

export default ViewBooks