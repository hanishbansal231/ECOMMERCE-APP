import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allProduct, deleteProduct } from '../../services/operations/productAPI';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import { setEdit, setProduct } from '../../Redux/Slice/productSlice';
import { useNavigate } from 'react-router-dom';

function Products() {
  const { token } = useSelector((state) => state.auth);
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function fetchProduct() {
    const res = await dispatch(allProduct(token));
    setProductList(res);
  }

  async function handelDeleteProduct(id) {
    await dispatch(deleteProduct(id, token));
    fetchProduct();
  }

  function handelUpdateproduct(data){
    dispatch(setEdit(true));
    dispatch(setProduct(data));
    navigate('/dashboard/admin/edit-product');
  }

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className='max-w-[1220px] m-auto my-5'>
      <h2 className='text-3xl font-mono text-center'>
        {
          productList.length !== 0 && ' Product List'
        }
      </h2>
      <div className='flex items-center justify-between flex-wrap my-5'>
        {
          productList.length !== 0 ? (
            productList.map((item) => (
              <div className="border rounded my-3" key={item?._id}>
                <div className="">
                  <img src={item?.photo?.secure_url} alt={item.name} className='w-[300px] h-[250px] border' />
                  <div className='p-5'>
                    <h3 className='capitalize text-lg font-semibold'>{item?.name}</h3>
                    <p className='capitalize text-md'>{item?.description}</p>
                  </div>
                  <div className='flex gap-1 justify-center items-center'>
                    <button onClick={() => handelUpdateproduct(item)} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><AiFillEdit /></button>
                    <button onClick={() => handelDeleteProduct(item._id)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><AiOutlineDelete /></button>
                  </div>
                </div>
              </div>
            ))
          )
            :
            (
              <div className='flex w-full h-[70vh] text-5xl font-mono items-center justify-center'>Product Not Found</div>
            )
        }
      </div>
    </div>
  )
}

export default Products