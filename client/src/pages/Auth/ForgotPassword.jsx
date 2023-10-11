import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { forgotPassword } from "../../services/operations/authAPI";

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [userDetail,setUserDetail] = useState({
        newPassword:'',
        confirmPassword:'',
    });

    const handelInput = (e) => {
        setUserDetail((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        if(!userDetail.newPassword || !userDetail.confirmPassword){
            toast.error('All field are mandatory....');
            return;
        }
        const resetToken = location.pathname.split('/').at(-1);
        await dispatch(forgotPassword(userDetail,resetToken,navigate));
    }
    return (
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center">
                <form
                onSubmit={onFormSubmit}
                className="shadow-[0_0_10px_black] w-[35em] p-3 rounded my-4"
                >
                      <div className="flex flex-col gap-1 p-1">
                        <label htmlFor="newPassword" className="text-lg font-semibold text-gray-600">New Password<sup className="text-red-400">*</sup></label>
                        <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter Your New Password"
                            className="py-2 px-1 border border-gray-400 outline-none rounded"
                            value={userDetail.newPassword}
                            onChange={handelInput}
                        />
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                        <label htmlFor="password" className="text-lg font-semibold text-gray-600">Confirm Password<sup className="text-red-400">*</sup></label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Enter Your Comfirm Password"
                            className="py-2 px-1 border border-gray-400 outline-none rounded"
                            value={userDetail.confirmPassword}
                            onChange={handelInput}
                        />
                    </div>
                    <div className="p-1">
                        <button
                            type="submit"
                            className="w-full bg-red-300 font-mono text-white rounded py-2 text-lg font-semibold hover:bg-red-400 transition-all duration-300 ease-out"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword;