import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { BiArrowBack } from 'react-icons/bi';
import { useState } from "react";
import { resetPassword } from "../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setLoading } from "../../Redux/Slice/authSlice";
function ResetPassword() {
    const {loading} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailSend, setEmailSend] = useState(false);
    const [userDetail, setUserDetail] = useState({
        email: '',
    });

    const handelEmail = (e) => {
        setUserDetail({
            [e.target.name]: e.target.value,
        })
    }
    console.log(userDetail);
    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (!userDetail.email) {
            toast.error('Email is required...');
            return;
        }

        await dispatch(resetPassword(userDetail, setEmailSend));
    }
    return (
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center">
                {
                    loading
                        ?
                        (
                            <div className="shapes"></div>
                        )
                        :
                        (
                            <form
                                onSubmit={onFormSubmit}
                                className="shadow-[0_0_10px_black] w-[35em] p-3 rounded my-4"
                            >
                                <h2 className="text-xl font-semibold p-1 font-mono text-red-300">
                                    {!emailSend ? "Reset your password" : "Check email"}
                                </h2>
                                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-gray-400">
                                    {!emailSend
                                        ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                        : `We have sent the reset email to ${userDetail.email}`}
                                </p>
                                {
                                    !emailSend && (
                                        <>
                                            <div className="flex flex-col gap-1 p-1">
                                                <label htmlFor="email" className="text-lg font-semibold text-gray-600">Email<sup className="text-red-400">*</sup></label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Enter Your Email"
                                                    className="py-2 px-1 border border-gray-400 outline-none rounded"
                                                    value={userDetail.email}
                                                    onChange={handelEmail}
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

                                        </>
                                    )
                                }
                                <div className="mt-6 flex items-center justify-between">
                                    <Link to="/login">
                                        <p className="flex items-center gap-x-2 text-richblack-5">
                                            <BiArrowBack /> Back To Login
                                        </p>
                                    </Link>
                                </div>
                            </form>
                        )
                }
            </div>
        </Layout>
    )
}

export default ResetPassword;