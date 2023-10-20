import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../components/Layout/Layout';

function Search() {
    const { loading } = useSelector((state) => state.search);
    const { data } = useSelector((state) => state.search);
    return (
        <Layout>
            <div className="flex min-h-[80vh] w-full">
                {
                    loading
                        ?
                        (<div className='shapes'></div>)
                        :
                        (
                            <div className="max-w-[1000px] m-auto">
                                <h2 className="text-center my-5 font-semibold  text-5xl font-mono">Search Products</h2>
                                <div className='flex items-center justify-center gap-4 flex-wrap my-5'>
                                    {
                                        data && (
                                            data.map((item) => (
                                                <div className="border rounded my-3" key={item?._id}>
                                                    <div className="">
                                                        <img src={item?.photo?.secure_url} alt={item.name} className='w-[300px] h-[250px] border' />
                                                        <div className='p-5'>
                                                            <h3 className='capitalize text-lg font-semibold'>{item?.name}</h3>
                                                            <p className='capitalize text-md'>{item?.description}</p>
                                                            <p className='capitalize text-md'>{item?.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        </Layout>
    )
}

export default Search