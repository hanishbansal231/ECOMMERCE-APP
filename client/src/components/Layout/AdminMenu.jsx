import React from 'react'
import { Link } from 'react-router-dom'
import {FcSettings} from 'react-icons/fc';
function AdminMenu() {
    return (
        <div className=' border-r h-full'>
            <div className='flex flex-col'>
                <h2 className='text-center pb-3 font-mono text-3xl mt-4 border-b'>Admin Panel</h2>
                <div className='flex flex-col border-b'>
                    <Link className='text-xl p-2 bg-red-400 text-white'>Create Category</Link>
                    <Link className='text-xl p-2'>Create Product</Link>
                    <Link className='text-xl p-2'>Profile</Link>
                </div>
                <div>
                <Link className='text-xl p-2 flex items-center gap-2'>
                    <FcSettings />
                    Setting
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminMenu