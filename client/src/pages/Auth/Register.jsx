import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { registerUser } from "../../services/operations/authAPI";
function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
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
        if (!userData.name || !userData.email || !userData.address || !userData.phone || !userData.password) {
            toast.error('All field are mandatory...');
            return;
        }

        try {
            const res = await dispatch(registerUser(userData, navigate));
            console.log(res);
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <form
                onSubmit={onFormSubmit}
                className="shadow-[0_0_10px_black] w-[35em] p-3 rounded my-4"
            >
                <h2 className="text-red-300 text-2xl border-b border-red-400 font-mono">
                    Create Account
                </h2>
                <div className="flex flex-col gap-1 p-1">
                    <label htmlFor="name" className="text-lg font-semibold text-gray-600">Name<sup className="text-red-400">*</sup></label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your Name"
                        className="py-2 px-1 border border-gray-400 outline-none rounded"
                        value={userData.name}
                        onChange={handelUserInput}
                    />
                </div>
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
                    <label htmlFor="phone" className="text-lg font-semibold text-gray-600">Phone No<sup className="text-red-400">*</sup></label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Enter Your Phone Number"
                        className="py-2 px-1 border border-gray-400 outline-none rounded"
                        value={userData.phone}
                        onChange={handelUserInput}
                    />
                </div>
                <div className="flex flex-col gap-1 p-1">
                    <label htmlFor="address" className="text-lg font-semibold text-gray-600">Address<sup className="text-red-400">*</sup></label>
                    <textarea
                        name="address"
                        id="address"
                        placeholder="Enter Your Address"
                        className="py-2 px-1 border border-gray-400 outline-none rounded resize-none h-[100px]"
                        value={userData.address}
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
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;