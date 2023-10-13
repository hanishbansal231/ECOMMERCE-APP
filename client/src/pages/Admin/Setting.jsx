import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword, changeProfilePicture, deleteAccount, updateProfile } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
function Setting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { data } = useSelector((state) => state.auth);
    const [imageUpload, setImageUpload] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(null);
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [passwordUpdate, setPasswordUpdate] = useState({
        oldPassword: '',
        newPassword: '',
    })
    function handelImageUpload(e) {
        e.preventDefault();
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            setImage(uploadImage);
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            });
        }
    }
    console.log(imageUpload)
    async function onFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        try {
            const res = await dispatch(changeProfilePicture(formData, data?.token, navigate, setImageUpload));
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    function handelInput(e) {
        const { name, value } = e.target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function inputSubmit(e) {
        e.preventDefault();
        await dispatch(updateProfile(userInput, data?.token, navigate));
    }
    function handelPassword(e) {
        const { name, value } = e.target;
        setPasswordUpdate((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    async function handelUserPassword(e) {
        e.preventDefault();
        console.log(data?.token);
        await dispatch(changePassword(passwordUpdate, token, navigate));
    }
    async function handleDeleteAccount(e){
        e.preventDefault();

        await dispatch(deleteAccount(token,navigate));
    }
    return (
        <div className='p-4 max-w-[800px] m-auto'>
            <div className='border p-3 rounded'>
                <div className=' flex items-center gap-4'>
                    <img src={!previewImage ? data?.image?.secure_url : previewImage} className='h-full w-40 rounded-full' />
                    <div className=''>
                        <p>
                            Change Profile Picture
                        </p>
                        <div>
                            <form onSubmit={onFormSubmit} className='flex items-center mt-4 gap-4'>
                                <div className=''>
                                    <label className='bg-red-400 text-white px-5 py-1 text-lg font-semibold rounded flex items-center gap-2 cursor-pointer' htmlFor="image">Select</label>
                                    <input
                                        type='file'
                                        className='hidden'
                                        id='image'
                                        onChange={handelImageUpload}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='bg-red-400 text-white px-5 py-1 text-lg font-semibold rounded flex items-center gap-2'
                                >
                                    {
                                        imageUpload ? 'Uploading...' : 'Upload'
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border my-4 p-4 rounded'>
                <form
                    noValidate
                    onSubmit={inputSubmit}
                >
                    <h2 className='uppercase font-semibold text-2xl font-mono'>Update Profile</h2>
                    <div className='flex flex-col p-2'>
                        <label className='text-lg my-2' htmlFor="name">Name</label>
                        <input
                            className='border px-1 py-3'
                            type='text'
                            placeholder='Enter Your Name'
                            id='name'
                            name='name'
                            onChange={handelInput}
                        />
                    </div>
                    <div className='flex flex-col p-2'>
                        <label className='text-lg my-2' htmlFor="email">Email</label>
                        <input
                            className='border px-1 py-3'
                            type='text'
                            placeholder='Enter Your Email'
                            id='email'
                            name='email'
                            onChange={handelInput}
                        />
                    </div>
                    <div className='flex flex-col p-2'>
                        <label className='text-lg my-2' htmlFor="contact">Contact Number</label>
                        <input
                            className='border px-1 py-3'
                            type='text'
                            placeholder='Enter Your Contact Number'
                            id='contact'
                            name='phone'
                            onChange={handelInput}
                        />
                    </div>
                    <div className='flex flex-col p-2'>
                        <label className='text-lg my-2' htmlFor="address">Address</label>
                        <textarea
                            className='border px-1 py-3 resize-none h-[100px]'
                            type='text'
                            placeholder='Enter Your Address'
                            id='address'
                            name='address'
                            onChange={handelInput}
                        />
                    </div>
                    <div className='flex justify-end gap-3 mt-4'>
                        <button
                            type='submit'
                            className='bg-red-400 text-white px-5 py-1 rounded text-lg font-semibold hover:bg-red-500 transition-all duration-200 ease-out'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <div className='border my-4 p-4 rounded'>
                <form
                    onSubmit={handelUserPassword}
                >
                    <h2 className='uppercase font-semibold text-2xl font-mono'>
                        Change Password
                    </h2>
                    <div className='flex flex-col p-2'>
                        <label className='text-lg my-2' htmlFor="oldPassword">Old Password</label>
                        <input
                            className='border px-1 py-3'
                            type='password'
                            placeholder='Enter Your Old Password'
                            id='oldPassword'
                            name='oldPassword'
                            onChange={handelPassword}
                        />
                    </div>
                    <div className='flex flex-col p-2'>
                        <label className='text-lg my-2' htmlFor="newPassword">New Password</label>
                        <input
                            className='border px-1 py-3'
                            type='password'
                            placeholder='Enter Your New Password'
                            id='newPassword'
                            name='newPassword'
                            onChange={handelPassword}
                        />
                    </div>
                    <div className='flex justify-end gap-3 mt-4'>
                        <button
                            type='submit'
                            className='bg-red-400 text-white px-5 py-1 rounded text-lg font-semibold hover:bg-red-500 transition-all duration-200 ease-out'
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
            <div className='my-10 flex flex-row gap-x-5 rounded-md border-[1px] shadow-[0_0_5px_red] p-8 px-12'>
                <div className='flex items-center gap-4'>
                    <div className='border shadow-[0_0_5px_red] aspect-square flex items-center justify-center h-14 w-14 rounded-full bg-pink-700"'>
                        <FiTrash2 className="text-3xl text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-richblack-5">
                            Delete Account
                        </h2>
                        <div className="w-3/5 text-pink-25">
                            <p>Would you like to delete account?</p>
                            <p>
                                This account may contain Paid Courses. Deleting your account is
                                permanent and will remove all the contain associated with it.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="w-fit cursor-pointer italic text-red-500"
                        onClick={handleDeleteAccount}
                        >
                            I want to delete my account.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting