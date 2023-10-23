import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { relatedProduct } from '../services/operations/productAPI';
import { buyProduct } from '../services/operations/paymentAPI';

function PageDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = useParams();
    const { token, data } = useSelector((state) => state.auth);
    const [productList, setProductList] = useState([]);

    async function fetchProduct() {
        const res = await dispatch(relatedProduct(state._id, state.category._id));
        setProductList(res);
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    const handelBuyProduct = () => {
        if (token) {
            buyProduct(token, [id], data, navigate, dispatch);
        }
    }

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
                        <div className='flex items-center gap-3'>
                            <button className="bg-blue-500 my-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add To Cart</button>
                            <button onClick={() => handelBuyProduct()} className='bg-red-500 text-white rounded py-2 px-4'>Buy Now</button>

                        </div>
                    </div>
                </div>
                {
                    productList.length !== 0 && (
                        <div className="max-w-[1000px] m-auto">
                            <h2 className="text-center my-5 font-semibold  text-5xl font-mono">Similar Products</h2>
                            <div className='flex items-center justify-center gap-4 flex-wrap my-5'>
                                {
                                    productList && (
                                        productList.map((item) => (
                                            <div className="cursor-pointer border rounded my-3" key={item?._id}>
                                                <div onClick={() => navigate(`/product/${item._id}`, { state: { ...item } })} className="">
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

export default PageDetail