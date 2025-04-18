import React from 'react'
import Navbar from '../../components/student/Navbar'
import { FaCode, FaComputer } from 'react-icons/fa6'
import { BiMath } from 'react-icons/bi'
import { SlChemistry } from 'react-icons/sl'
import { MdOutlineRocket } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Category = () => {
    return (
        <div>
            <Navbar />

            <div className='flex flex-row items-center justify-between gap-3 flex-wrap p-2'>
                <Link to='computer-science' className='border border-solid border-slate-700 flex flex-col items-center justify-between gap-2 flex-grow'>
                    <FaComputer className='m-2' size='3.5em' />
                    <p className='bg-slate-700 text-white text-center w-full p-2'>Computer Science</p>
                </Link>
                <Link to='mathemetics' className='border border-solid border-slate-700 flex flex-col items-center justify-between gap-2 flex-grow'>
                    <BiMath className='m-2' size='3.5em' />
                    <p className='bg-slate-700 text-white text-center w-full p-2'>Mathematics</p>
                </Link>
                <Link to='programming' className='border border-solid border-slate-700 flex flex-col items-center justify-between gap-2 flex-grow'>
                    <FaCode className='m-2' size='3.5em' />
                    <p className='bg-slate-700 text-white text-center w-full p-2'>Programming</p>
                </Link>
                <Link to='physics' className='border border-solid border-slate-700 flex flex-col items-center justify-between gap-2 flex-grow'>
                    <MdOutlineRocket className='m-2' size='3.5em' />
                    <p className='bg-slate-700 text-white text-center w-full p-2'>Physics</p>
                </Link>
                <Link to='chemistry' className='border border-solid border-slate-700 flex flex-col items-center justify-between gap-2 flex-grow'>
                    <SlChemistry className='m-2' size='3.5em' />
                    <p className='bg-slate-700 text-white text-center w-full p-2'>Chemistry</p>
                </Link>
            </div>
        </div>
    )
}

export default Category