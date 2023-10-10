import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/operations/authAPI";
import Layout from "../../components/Layout/Layout";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    function handelUserInput(e) {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            toast.error('All field are mandatory...');
            return;
        }

        await dispatch(loginUser(userData, navigate));
        setUserData({
            email: '',
            password: '',
        })
    }
    return (
        <Layout>
            <div className="min-h-[80vh] flex items-center justify-center">
                <form
                    onSubmit={onFormSubmit}
                    className="shadow-[0_0_10px_black] w-[35em] p-3 rounded my-4"
                >
                    <h2 className="text-red-300 text-2xl border-b border-red-400 font-mono">
                        Login Account
                    </h2>
                    <div className="flex flex-col gap-1 p-1">
                        <label htmlFor="email" className="text-lg font-semibold text-gray-600">Email<sup className="text-red-400">*</sup></label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Your Email"
                            className="py-2 px-1 border border-gray-400 outline-none rounded"
                            value={userData.email}
                            onChange={handelUserInput}
                        />
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                        <label htmlFor="password" className="text-lg font-semibold text-gray-600">Password<sup className="text-red-400">*</sup></label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter Your Password"
                            className="py-2 px-1 border border-gray-400 outline-none rounded"
                            value={userData.password}
                            onChange={handelUserInput}
                        />
                    </div>
                    <div className="p-1">
                        <button
                            type="submit"
                            className="w-full bg-red-300 font-mono text-white rounded py-2 text-lg font-semibold hover:bg-red-400 transition-all duration-300 ease-out"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Login;