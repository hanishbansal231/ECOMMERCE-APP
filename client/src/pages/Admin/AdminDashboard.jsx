import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';

function AdminDashboard() {
    const { data } = useSelector((state) => state.auth);
    // console.log(data);
    return (
        <Layout>
            <div className='flex gap-3 min-h-[80vh]'>
                <div className='w-[300px]'>
                    <AdminMenu />
                </div>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard