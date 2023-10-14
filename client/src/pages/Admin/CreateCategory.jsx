import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allCategory, createCategory, deleteCategory, updateCategory } from '../../services/operations/categoryAPI';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
function CreateCategory() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [categoryName, setCategoryName] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [categorys, setCategorys] = useState([]);
    const [edit, setEdit] = useState(false);

    async function onFormSubmit(e) {
        e.preventDefault();
        if (edit) {
            const res = await dispatch(updateCategory(categoryID, categoryName, token));
            setEdit(false);
            setCategoryName('');
            fetchCategory();
        } else {
            await dispatch(createCategory(categoryName, token));
            fetchCategory();
            setCategoryName('');
        }
    }

    const fetchCategory = useCallback(async () => {
        const res = await dispatch(allCategory(token));
        setCategorys(res);
    }, [dispatch, token, setCategorys])

    async function handelDeleteCategory(id) {
        await dispatch(deleteCategory(id, token));
        fetchCategory();
    }

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    return (
        <div className='p-4 max-w-[800px] m-auto'>
            <div className='border p-3 rounded'>
                <form onSubmit={onFormSubmit}>
                    <h2 className='font-mono font-semibold text-2xl border-b border-red-500'>
                        {
                            edit ? 'Edit Category' : 'Create Category'
                        }
                    </h2>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg my-2' htmlFor="name">Category Name</label>
                        <input
                            className='border px-1 py-3 outline-none'
                            type='text'
                            placeholder='Enter Your Name'
                            id='name'
                            name='name'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-end gap-3 mt-4'>
                        <button
                            type='submit'
                            className='bg-red-400 text-white px-5 py-1 rounded text-lg font-semibold hover:bg-red-500 transition-all duration-200 ease-out'
                        >
                            {
                                edit ? 'Edit' : 'Create'
                            }
                        </button>
                    </div>
                </form>
            </div>
            {
                categorys.length !== 0 && (
                    <div className='border p-3 rounded my-5'>
                        <div>
                            <div className='flex justify-between border-b border-red-600 uppercase font-semibold text-2xl font-mono mb-3'>
                                <h3>Categorys</h3>
                                <h3 className='mr-8'>Actions</h3>
                            </div>
                            <div>
                                <ul>
                                    {
                                        categorys &&
                                        (
                                            categorys.map((category, idx) => (
                                                <li key={category._id} className='flex justify-between border-b border-red-300 text-xl my-3 px-3'>
                                                    {category.name}
                                                    <div className='flex gap-1 items-center'>
                                                        <button onClick={() => {
                                                            setEdit((prev) => !prev);
                                                            setCategoryID(category._id);
                                                        }} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><AiFillEdit /></button>
                                                        <button onClick={() => handelDeleteCategory(category._id)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><AiOutlineDelete /></button>
                                                    </div>
                                                </li>
                                            ))
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CreateCategory