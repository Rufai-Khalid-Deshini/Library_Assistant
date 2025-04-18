import React, { useEffect, useState } from 'react'
import Navbar from '../../components/student/Navbar'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoMdAdd, IoMdPerson } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import SnackbarComponent from '../../components/SnackbarComponent';

const Profile = () => {

    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState({});

    const [image, setImage] = useState("");

    const [update, setUpdate] = useState(false);

    const [snackbar, setSnackar] = useState({
        open: false,
        severity: "",
        message: ""
    });

    const handleClose = () => {
        setSnackar({...snackbar, open: false});
    }

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
                        setUser(res.data);
                    })
                setVerified(true);
            })
    }, []);

    const logout = async () => {
        axios
        .post('https://lib-backend-i000.onrender.com/users/logout', {}, { withCredentials: true })
        .then(res => {
            location.href = "/";
        });

        
    }

    const updatePicture = () => {

        if(image.length == 0) {
            alert("Select a picture to proceed");
        }else {

            const formData = new FormData();
            formData.append("image", image);
            axios
                .put(`https://lib-backend-i000.onrender.com/users/update-picture/${user._id}`, formData)
                .then(res => {
                    setUpdate(false);
                    setSnackar({
                        open: true,
                        message: "Profile picture updated successfully",
                        severity: "success"
                    })
                    setTimeout(() => {
                        location.reload();
                    }, 2000)
                })
                .catch(err => {
                    setSnackar({
                        open: true,
                        message: "Couldn't update profile picture. Kindly try again later.",
                        severity: "error"
                    })
                })
        }
        
    }

    return (
        <div>
            {verified && (
                <>
                    <Navbar />
                    <div className='font-[Montserrat] flex flex-col items-center justify-center gap-2 p-4'>
                        {user.picture && (
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <img src={`https://lib-backend-i000.onrender.com/pictures/${user.picture}`} alt={user.username} className='w-52 h-52 rounded-full' style={{ objectFit: "cover"}} />
                                <button className='flex flex-row items-center justify-center gap-2 p-1 bg-sky-600 rounded-lg text-white' onClick={() => setUpdate(true)}><MdEdit />Edit Picture</button>
                            </div>
                        )}
                        {!user.picture && (
                            <>
                                <div className='bg-green-600 w-40 h-40  rounded-full flex flex-col items-center justify-center'>
                                    <IoMdPerson size='5em' />
                                    <button className='flex flex-row items-center justify-center underline text-white' onClick={() => setUpdate(true)}><IoMdAdd />Add Picture</button>
                                </div>
                            </>
                        )}

                        {/** Modal for selecting profile picture */}
                        {update && (
                            <form className='rounded shadow-md w-10/12 m-auto p-5 outline-1 outline outline-gray-200 flex flex-col items-center justify-center gap-4'>
                                <p className='text-center text-lg font-bold text-green-500'>Select Profile Picture</p>
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                                <input type="button" value="Update" className='bg-blue-400 text-white py-2 px-5 rounded cursor-pointer' onClick={updatePicture} />
                            </form>
                        )}
                        <SnackbarComponent
                            open={snackbar.open}
                            handleClose={handleClose}
                            message={snackbar.message}
                            severity={snackbar.severity}
                        />
                        <p className='capitalize'>faculty: {user.faculty}</p>
                        <p className='capitalize'>Department: {user.department}</p>
                        <p className='capitalize'>level: {user.level}</p>
                        <button onClick={logout} className='bg-green-700 text-white px-3 py-2 rounded-sm'>Logout</button>
                    </div>

                    
                </>
            )}
            {!verified && (
                <>
                    <p className='text-center p-3 m-3'><Link to='/login' className='text-blue-800 p-2'>Login</Link> to view your profile</p>
                </>
            )}
        </div>
    )
}

export default Profile