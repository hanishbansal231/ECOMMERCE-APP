import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { allProduct, filterProducts } from "../services/operations/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { allCategory } from "../services/operations/categoryAPI";
import { Prices } from "../components/prices";

function Home() {
    const { token } = useSelector((state) => state.auth);
    const [productList, setProductList] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([]);
    const dispatch = useDispatch();

    async function fetchProduct() {
        const res = await dispatch(allProduct(token));
        setProductList(res);
    }

    async function handelFilter() {
        const res = await dispatch(filterProducts(checked, radio));
        setProductList(res);
    }

    useEffect(() => {
        if (!checked.length || !radio.length) fetchProduct();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) handelFilter();
    }, [checked, radio]);

    const fetchCategory = useCallback(async () => {
        const res = await dispatch(allCategory(token));
        setCategorys(res);
    }, [dispatch, token, setCategorys])

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    function handelRadio(value){
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
                            <button onClick={() => window.location.reload()}  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Reset Filter</button>
                        </div>

                    </div>
                </div>
                <div className="max-w-[1000px] m-auto">
                    <h2 className="text-center my-5 font-semibold  text-5xl font-mono">All Products</h2>
                    <div className='flex items-center justify-between flex-wrap my-5'>
                        {
                            productList && (
                                productList.map((item) => (
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
            </div>
        </Layout>
    )
}

export default Home;