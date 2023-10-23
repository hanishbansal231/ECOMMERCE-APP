import React from 'react'
import Layout from '../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { removeCart } from '../Redux/Slice/cartSlice';

function Cart() {
    const dispatch = useDispatch();
    const { cartData, totalItem, amount } = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    return (
        <Layout>
            <div className="min-h-[80vh] w-[1200px] m-auto">
                <div className='text-center'>
                    <h2 className='font-mono font-semibold text-3xl'>{`Hello Hanish`}</h2>
                    <p className='text-xl'>
                        {
                            totalItem === 0 
                            ? 
                            (<span>{'Cart Empty'}</span>) 
                            : 
                            (<span>{`You Have ${totalItem} items in your cart ${token ? '' : 'please login to checkout !'}`}</span>)
                        }
                    </p>
                </div>
                <div className='flex gap-4'>
                    <div className='w-[60%] '>
                        {
                            cartData && (
                                cartData.map((cartItem, idx) => (
                                    <div key={idx} className='border my-3'>
                                        <div className='flex gap-2'>
                                            <div className='w-[220px] h-[170px] border-r'>
                                                <img className='w-full h-full' src={cartItem?.photo?.secure_url} alt="" />
                                            </div>
                                            <div className='p-3'>
                                                <h3>{cartItem?.name}</h3>
                                                <p>{cartItem?.description}</p>
                                                <p>{`Price: ${cartItem?.price}`}</p>
                                                <div className='mt-4'>
                                                    <button onClick={() => {
                                                        dispatch(removeCart(cartItem._id))
                                                    }} className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-1 px-2 rounded">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                    {
                        totalItem !== 0 && (
                            <div className='w-[40%]'>
                                <div className='text-center border-b border-gray-300'>
                                    <h2 className='font-semibold text-4xl'>Cart Summary</h2>
                                    <p className='text-lg my-2'>Total | Checkout | Payment</p>
                                </div>
                                <div>
                                    <p className='text-center text-xl'>Total: {amount}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Cart