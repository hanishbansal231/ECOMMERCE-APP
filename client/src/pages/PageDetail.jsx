import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { relatedProduct } from '../services/operations/productAPI';

function PageDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const dispatch = useDispatch();
    async function fetchProduct() {
        const res = await dispatch(relatedProduct(state._id, state.category._id));
        console.log(res);
        setProductList(res);
    }
    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <Layout>
            <div className="min-h-[80vh] w-full mx-auto max-w-[1200px]">
                <div className='flex my-10 border-b'>
                    <div>
                        <img src={state?.photo?.secure_url} />
                    </div>
                    <div className='mt-7'>
                        <h2 className='font-semibold text-2xl'>Name: {state?.name}</h2>
                        <p className='text-xl'>Description: {state?.description}</p>
                        <p className='text-xl'>Price: {state?.price}</p>
                        <p className='text-xl'>Category: {state?.category?.name}</p>
                        <div>
                            <button className="bg-blue-500 my-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add To Cart</button>
                        </div>
                    </div>
                </div>
                <div className="max-w-[1000px] m-auto">
                    <h2 className="text-center my-5 font-semibold  text-5xl font-mono">Similar Products</h2>
                    <div className='flex items-center justify-center gap-4 flex-wrap my-5'>
                        {
                            productList && (
                                productList.map((item) => (
                                    <div onClick={() => navigate(`/product/${item._id}`, { state: { ...item } })} className="cursor-pointer border rounded my-3" key={item?._id}>
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
            </div>
        </Layout>
    )
}

export default PageDetail