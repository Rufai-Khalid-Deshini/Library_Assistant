import React, { useEffect, useState } from 'react'
// import { motion, useScroll } from 'motion/react'
import axios from 'axios';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import { BiCaretLeft } from 'react-icons/bi';

const AddBook = () => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [inStock, setInStock] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        axios
            .get('https://lib-backend-i000.onrender.com/users/me', { withCredentials: true})
            .then((res) => {
                const data = {
                    id: res.data.user.id
                }
                axios
                    .post('https://lib-backend-i000.onrender.com/users/get-info', data)
                    .then(res => {
                        if(res.data.role != "admin") {
                            alert("Access denied");
                            location.href = '/';
                        }
                    })
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title.toLowerCase());
        formData.append("author", author);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("image", image);
        formData.append("instock", inStock);

        axios
            .post("https://lib-backend-i000.onrender.com/admin/upload", formData)
            .then((res) => {
                alert("Book uploaded successfully");
                setLoading(false);
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
                setLoading(false);
            });
        
    }

    // const { scrollYProgress } = useScroll();

    return (
        <>
        {/* <motion.div
            style={{
                scaleX: scrollYProgress,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: 10,
                originX: 0,
                backgroundColor: "#ff0088"
            }}
        /> */}
        <div>
            <Link to='/admin/dashboard' className='flex flex-row items-center justify-start text-sky-800 m-2'>
                <BiCaretLeft size='2.3em' />
                <p className='text-lg font-semibold'>Back</p>
            </Link>
            <div className='mx-auto my-5 w-11/12 shadow-lg p-5 rounded-lg outline-1 outline outline-slate-100'>
                <h1 className='text-center font-extrabold text-2xl'>Upload a new book</h1>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center justify-between'>
                        <label className='text-lg font-semibold' htmlFor="title">Title</label>
                        <input type="text" id="title" className='w-full p-2 my-2 border border-solid border-black rounded' onChange={(e) => setTitle(e.target.value)} autoCapitalize='word' required />
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        <label className='text-lg font-semibold' htmlFor="author">Author</label>
                        <input type="text" id="author" className='w-full p-2 my-2 border border-solid border-black rounded capitalize' onChange={(e) => setAuthor(e.target.value)} required autoCapitalize='words' />
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        <label className='text-lg font-semibold' htmlFor="description">Description</label>
                        {/* <input type="text" id="description" className='w-full p-2 my-2 border border-solid border-black rounded' onChange={(e) => setDescription(e.target.value)} required /> */}
                        <textarea id="description" className='w-full p-2 my-2 border border-solid border-black rounded' onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        <label className='text-lg font-semibold' htmlFor="category">Category</label>
                        {/* <input type="text" id="category" className='w-full p-2 my-2 border border-solid border-black rounded' onChange={(e) => setCategory(e.target.value)} required /> */}
                        <select id="category" className='w-full p-2 my-2 border border-solid border-black rounded' onChange={(e) => setCategory(e.target.value)} required>
                            <option value="">Select a category</option>
                            <option value="computer-science">Computer Science</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="programming">Programming</option>
                        </select>
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        <label className='text-lg font-semibold' htmlFor="image">In Stock</label>
                        <input type="number" id="image" className='w-full p-2 my-2 border border-solid border-black rounded' onChange={(e) => setInStock(e.target.value)} min="0" required />
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        <label className='text-lg font-semibold' htmlFor="image">Cover Image</label>
                        <input type="file" id="image" className='w-full p-2 my-2 border border-solid border-black rounded' onChange={(e) => setImage(e.target.files[0])} required />
                    </div>
                    <div className='flex flex-col items-center justify-between'>
                        {loading && <Loading />}
                    </div>
                    <input className='px-4 py-2 bg-slate-500 text-white cursor-pointer w-full rounded-md mt-4 duration-300 active:bg-slate-700' type="submit" value="Upload" />
                </form>
            </div>
        </div>
        </>
    )
}

export default AddBook