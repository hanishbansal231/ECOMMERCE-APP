import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { logout } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
function ProfileDropDown() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.auth);
    const [openBox, setOpenBox] = useState(false);
    async function  handelLogout(){
        await dispatch(logout(navigate));
    }
    return (
        <div className='relative'>
            <div 
            className='cursor-pointer h-[30px] w-[30px]'
            onClick={() => setOpenBox((prev) => !prev)}
            >
                <img
                    src={data?.image?.secure_url}
                    alt={data?.name}
                    className='h-full w-full rounded-full'
                />
            </div>
            {
                openBox && (
                    <div className='absolute bg-white left-[-70px] top-[40px] w-[200px] p-2 shadow-[0_0_10px_black] pb-4 rounded-sm'>
                        <h2 className='font-mono font-bold text-lg text-red-600'> Hey</h2>
                        <p className='capitalize border-b border-red-400'>{data?.name}</p>
                        <button className='border-b border-red-200 text-lg w-full flex items-center gap-3 py-3 cursor-pointer'>
                            <BiUserCircle className='text-2xl text-red-300' />
                            <span>
                                Profile
                            </span>
                        </button>
                        <button onClick={handelLogout} className='border-b border-red-200 text-lg w-full flex items-center gap-3 py-3 cursor-pointer'>
                            <RiLogoutBoxRLine className='text-2xl text-red-300' />
                            <span>
                                Logout
                            </span>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ProfileDropDown;