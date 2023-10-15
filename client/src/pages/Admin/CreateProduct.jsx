import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allCategory } from '../../services/operations/categoryAPI';
import { createProduct, updateProduct } from '../../services/operations/productAPI';
import { useNavigate } from 'react-router-dom';
function CreateProduct() {
    const {edit} = useSelector((state) => state.product);
    const {productData} = useSelector((state) => state.product);
    console.log(productData);
    const [courseId,setCourseId] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: '',
        photo: '',
    });
    // setPreviewImage(productData.photo.secure_url);
    const [categorys, setCategorys] = useState(null);
    const dispatch = useDispatch();
    async function fetchCategory() {
        const res = await dispatch(allCategory());
        setCategorys(res);
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    function handelUserInput(e) {
        const { name, value } = e.target;

        setUserInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handelImage(e) {
        e.preventDefault();
        const uploadFile = e.target.files[0];
        if (uploadFile) {
            setUserInput((prev) => ({
                ...prev,
                photo: uploadFile
            }));

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadFile);
            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            })
        }
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if (edit) {
            setUserInput({
                name: productData.name,
                description: productData.description,
                price: productData.price,
                category: productData.category,
                quantity: productData.quantity,
            });
            const formData = new FormData();

            formData.append('name', userInput.name);
            formData.append('description', userInput.description);
            formData.append('price', userInput.price);
            formData.append('category', userInput.category);
            formData.append('quantity', userInput.quantity);
            formData.append('photo', userInput.photo);

            await dispatch(updateProduct(formData, token, setLoading));
            navigate('/dashboard/admin/products');
            setUserInput({
                name: '',
                description: '',
                price: '',
                category: '',
                quantity: '',
                photo: '',
            });
            setPreviewImage('');

        } else {
            try {
                const formData = new FormData();

                formData.append('name', userInput.name);
                formData.append('description', userInput.description);
                formData.append('price', userInput.price);
                formData.append('category', userInput.category);
                formData.append('quantity', userInput.quantity);
                formData.append('photo', userInput.photo);

                await dispatch(createProduct(formData, token, setLoading));
                navigate('/dashboard/admin/products');
                setUserInput({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    quantity: '',
                    photo: '',
                });
                setPreviewImage('');
            } catch (error) {
                console.error('Error during form submission:', error);
            }
        }
    }
    return (
        <div className={`${loading ? 'h-[70vh] flex items-center justify-center' : 'p-4 max-w-[800px] m-auto'}`}>
            {
                loading
                    ?
                    (
                        <div className="shapes"></div>
                    )
                    :
                    (
                        <div className='border p-3 rounded'>
                            <form onSubmit={onFormSubmit}>
                                <h2 className='font-mono font-semibold text-2xl border-b border-red-500'>
                                    {
                                        edit ? 'Edit Product' : 'Create Product'
                                    }
                                </h2>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-lg mt-5' htmlFor="name"> Name</label>
                                    <input
                                        className='border px-1 py-3 outline-none'
                                        type='text'
                                        placeholder='Enter Your Name'
                                        id='name'
                                        name='name'
                                        value={userInput.name}
                                        onChange={handelUserInput}
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-lg mt-5' htmlFor="description">Description</label>
                                    <textarea
                                        className='border px-1 py-3 outline-none h-[80px] resize-none'
                                        type='text'
                                        placeholder='Enter Your Description'
                                        id='description'
                                        name='description'
                                        value={userInput.description}
                                        onChange={handelUserInput}
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-lg mt-5' htmlFor="price">Price</label>
                                    <input
                                        className='border px-1 py-3 outline-none'
                                        type='text'
                                        placeholder='Enter Your Price'
                                        id='price'
                                        onChange={handelUserInput}
                                        value={userInput.price}
                                        name='price'
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-lg mt-5' htmlFor="category"> Category</label>
                                    <select defaultValue="" id='category' onChange={handelUserInput} name='category' className='border px-1 py-3 outline-none'>
                                        <option value="" disabled>
                                            Choose a Category
                                        </option>
                                        {
                                            categorys && categorys.map?.((category, idx) => (
                                                <option key={category._id} value={`${category._id}`}>
                                                    {category.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-lg mt-5' htmlFor="quantity"> Quantity</label>
                                    <input
                                        className='border px-1 py-3 outline-none'
                                        type='text'
                                        placeholder='Enter Your Quantity'
                                        id='quantity'
                                        name='quantity'
                                        value={userInput.quantity}
                                        onChange={handelUserInput}
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    {
                                        previewImage ?
                                            (<div className='border mt-5 p-3'>
                                                <img src={previewImage} alt={'ProductImage'} />
                                            </div>)
                                            :
                                            (
                                                <>
                                                    <label className='text-lg mt-5 border flex items-center justify-center min-h-[300px]' htmlFor="photo"> Select Photo</label>
                                                    <input
                                                        className='hidden'
                                                        type='file'
                                                        id='photo'
                                                        name='photo'
                                                        // value={userInput.photo}
                                                        onChange={handelImage}
                                                    />
                                                </>
                                            )
                                    }
                                </div>
                                <div className='flex justify-end gap-3 mt-4'>
                                    <button
                                        type='submit'
                                        className='bg-red-400 text-white px-5 py-1 rounded text-lg font-semibold hover:bg-red-500 transition-all duration-200 ease-out'
                                    >
                                        {
                                            edit ? 'Edit Product' : 'Create Product'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div >
                    )
            }
        </div >
    )
}

export default CreateProduct