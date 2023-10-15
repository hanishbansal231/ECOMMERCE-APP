import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FcSettings} from 'react-icons/fc';
import { useSelector } from 'react-redux';
function AdminMenu() {
    const {edit} = useSelector((state) => state.product);
    const navigate = useNavigate();
    return (
        <div className=' border-r h-full'>
            <div className='flex flex-col'>
                <h2 className='text-center pb-3 font-mono text-3xl mt-4 border-b'>Admin Panel</h2>
                <div className='flex flex-col border-b'>
                    <Link to={'/dashboard/admin/create-category'} className='text-xl p-2 bg-red-400 text-white'>Create Category</Link>
                    <Link to={`/dashboard/admin/${edit ? 'edit-product' : 'create-product'}`} className='text-xl p-2'>
                        {
                            edit ? 'Edit Product' : 'Create Product'
                        }
                    </Link>
                    <Link to={'/dashboard/admin/products'} className='text-xl p-2'>Product</Link>
                    <Link to={'/dashboard/admin/profile'} className='text-xl p-2'>Profile</Link>
                </div>
                <div onClick={() => navigate('/dashboard/admin/setting')}>
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