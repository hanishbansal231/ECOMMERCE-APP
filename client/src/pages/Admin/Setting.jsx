import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeProfilePicture } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
function Setting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.auth);
    const [imageUpload, setImageUpload] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(null);
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
    return (
        <div className='p-4'>
            <div className='border p-3'>
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
        </div>
    )
}

export default Setting