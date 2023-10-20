import React, { useState } from 'react'
import { searchProduct } from '../../services/operations/productAPI';
import { useDispatch } from 'react-redux';
import { setData } from '../../Redux/Slice/searchSlice';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value,setValue] = useState('');
    // console.log(value);
    async function onFormSubmit(e){
        e.preventDefault();
        const res = await dispatch(searchProduct(value,navigate));
        dispatch(setData(res));
    }

  return (
    <div>
        <form className='flex items-center gap-1' onSubmit={onFormSubmit}>
            <div>
                <input 
                type='text'
                placeholder='Search'
                className='rounded px-3 text-black'
                onChange={(e) => setValue(e.target.value)}
                />
            </div>
            {/* <button type='submit'>Search</button> */}
        </form>
    </div>
  )
}

export default SearchInput