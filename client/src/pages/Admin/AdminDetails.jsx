import React from 'react'
import { useSelector } from 'react-redux'
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
function AdminDetails() {
    const { data } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    console.log(data);
    return (
        <div className='p-5 flex flex-col gap-4'>
            <div className='border p-4 flex justify-between items-center'>
                <div className='w-40 flex items-center gap-4'>
                    <img src={data?.image?.secure_url} className='h-full w-full rounded-full' />
                    <div>
                        <h3 className='uppercase'>
                            {data?.name}
                        </h3>
                        <p>
                            {data?.email}
                        </p>
                    </div>
                </div>
                <div>
                    <button
                     onClick={() => navigate(`/dashboard/${data?.role === 1 ? 'admin' : 'user'}/setting`)}
                        className='bg-red-400 text-white px-6 py-2 text-xl font-semibold rounded flex items-center gap-2'
                    >
                        <FiEdit />
                        Edit
                    </button>
                </div>
            </div>
            <div className='border p-4'>
                <h2 className='text-2xl font-mono border-b border-red-300'>
                    Personal Details
                </h2>
                <div className='py-4 flex flex-col gap-4'>
                    <h3 className='text-xl'>
                        Name: {" "}
                        <span className='capitalize'>
                            {data?.name}
                        </span>
                    </h3>
                    <h3 className='text-xl'>
                        Email: {" "}
                        <span>
                            {data?.email}
                        </span>
                    </h3>
                    <h3 className='text-xl'>
                        Address: {" "}
                        <span>
                            {data?.address}
                        </span>
                    </h3>
                    <h3 className='text-xl'>
                        Contact: {" "}
                        <span>
                            {data?.phone}
                        </span>
                    </h3>
                </div>
                <div className='flex justify-end'>
                    <button
                    onClick={() => navigate(`/dashboard/${data?.role === 1 ? 'admin' : 'user'}/setting`)}
                        className='bg-red-400 text-white px-6 py-2 text-xl font-semibold rounded flex items-center gap-2'
                    >
                        <FiEdit />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminDetails