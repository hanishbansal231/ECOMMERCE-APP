import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { filterProducts, listProduct, totalProduct } from "../services/operations/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { allCategory } from "../services/operations/categoryAPI";
import { Prices } from "../components/prices";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../components/hook/useCategory";
import { setCartData } from "../Redux/Slice/cartSlice";
function Home() {
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [categorys, setCategorys] = useCategory();
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    async function fetchProduct() {
        // const res = await dispatch(allProduct(token));
        setLoading(true);
        const res = await dispatch(listProduct(page));
        setLoading(false);
        setProductList(res);
    }

    async function handelFilter() {
        const res = await dispatch(filterProducts(checked, radio));
        setProductList(res);
    }

    async function totalCount() {
        const res = await dispatch(totalProduct());
        setTotal(res);
    }
    useEffect(() => {
        totalCount();
    }, []);
    useEffect(() => {
        if (!checked.length || !radio.length) fetchProduct();
    }, [checked.length, radio.length, page]);

    useEffect(() => {
        if (checked.length || radio.length) handelFilter();
    }, [checked, radio]);

    function handelRadio(value) {
        let result = [value];
        // result.push(value);
        setRadio(result);
    }
    function filterProduct(value, id) {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
        console.log(all); // Log the updated state value
    }

    return (
        <Layout>
            <div className="flex min-h-[80vh] w-full">
                <div className="border-r border-gray-300 w-[300px]">
                    <div>
                        <h2 className="text-center my-4 text-2xl font-semibold font-mono">Filter By Category</h2>
                        {
                            categorys && (

                                categorys?.map((item, idx) => (
                                    <div key={item._id} className="max-w-[200px] m-auto">
                                        <form className="flex items-center gap-2">
                                            <input onChange={(e) => filterProduct(e.target.value, item._id)} type="checkbox" />
                                            <label htmlFor="">{item.name}</label>
                                        </form>
                                    </div>
                                ))
                            )
                        }
                    </div>
                    <div>
                        <h2 className="text-center my-4 text-2xl font-semibold font-mono">Filter By Price</h2>

                        <div className="max-w-[200px] m-auto">
                            <form className="flex flex-col gap-2">
                                {
                                    Prices && (

                                        Prices?.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <input

                                                    value={item.array}
                                                    onChange={(e) => handelRadio(e.target.value)}
                                                    id={item._id}
                                                    name="selectedItem"
                                                    type="radio"
                                                //    checked={selectedItems.includes(item._id)}
                                                />
                                                <label htmlFor={item._id}>{item.name}</label>
                                            </div>
                                        ))
                                    )
                                }
                            </form>
                        </div>
                        <div className="flex justify-center my-5">
                            <button onClick={() => window.location.reload()} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Reset Filter</button>
                        </div>

                    </div>
                </div>
                <div className="max-w-[1000px] m-auto">
                    <h2 className="text-center my-5 font-semibold  text-5xl font-mono">All Products</h2>
                    <div className='flex items-center justify-center gap-4 flex-wrap my-5'>
                        {
                            productList && (
                                productList.map((item) => (
                                    <div className="cursor-pointer border rounded my-3" key={item?._id}>
                                        <div className="">
                                            <img src={item?.photo?.secure_url} alt={item.name} className='w-[300px] h-[250px] border' />
                                            <div className='p-5'>
                                                <h3 className='capitalize text-lg font-semibold'>{item?.name}</h3>
                                                <p className='capitalize text-md'>{item?.description}</p>
                                                <p className='capitalize text-md'>{item?.price}</p>
                                                <div className="mt-3">
                                                    <button onClick={() => {
                                                        dispatch(setCartData(item));
                                                        navigate('/cart');
                                                    }} className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded">
                                                        Add To Cart
                                                    </button>
                                                    <button onClick={() => navigate(`/product/${item._id}`, { state: { ...item } })} className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded">
                                                        More Info
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                    <div className="flex justify-center mb-4">
                        {productList && productList.length < total && productList.length !== 0 &&
                            (
                                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={(e) => {
                                    e.preventDefault();
                                    setPage((prev) => prev + 1);
                                }}>
                                    {
                                        loading ? (<div className="flex items-center gap-1">Loading<div className="custom-loader"></div></div>) : (<div className="flex items-center justify-center gap-1">Load More <AiOutlineReload /></div>)
                                    }
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home;