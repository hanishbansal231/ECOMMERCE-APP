import { Link } from "react-router-dom";
import { AiOutlineLogin, AiFillShopping } from 'react-icons/ai';
import { FaCartShopping } from 'react-icons/fa6';
import ProfileDropDown from "../Header/ProfileDropDown";
function Header() {
    const token = true;
    return (
        <div className="bg-gray-700 h-[70px] shadow-[0_0_10px_black] p-5">
            <div className="flex items-center justify-between max-w-[1300px] m-auto">
                <div>
                    <h2 className="font-bold text-2xl text-white uppercase flex items-center gap-1">
                        <AiFillShopping />

                        Ecommerce App
                    </h2>
                </div>
                <div>
                    <ul className="flex items-center gap-5 text-lg font-medium text-white">
                        <li className="hover:text-yellow-300 transition-all duration-300 ease-in">
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li className="hover:text-yellow-300 transition-all duration-300 ease-in">
                            <Link to={'/'}>Catagory</Link>
                        </li>
                        <li className="hover:text-yellow-300 transition-all duration-300 ease-in">
                            <Link to={'/'}>Collections</Link>
                        </li>
                        <li className="hover:text-yellow-300 transition-all duration-300 ease-in">
                            <Link to={'/'}>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {
                        !token && (
                            <div className="flex items-center gap-5">
                                <Link to={'/login'}>
                                    <button className="bg-yellow-500 flex items-center gap-1 px-4 py-1 rounded text-white outline-none font-semibold text-lg border-none cursor-pointer hover:bg-yellow-600 transition-all duration-300 ease-in">
                                        <span>Login</span>
                                        <AiOutlineLogin className="text-md" />
                                    </button>
                                </Link>
                                <Link to={'/register'}>
                                    <button className="bg-yellow-500 px-4 py-1 rounded outline-none text-white font-semibold text-lg border-none cursor-pointer hover:bg-yellow-600 transition-all duration-300 ease-in">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        )
                    }
                    {
                        token && (
                            <div>
                                <Link to={'/cart'}>
                                    <div className="relative">
                                        <span className="text-2xl font-semibold text-white hover:text-yellow-400 transition-all duration-300 ease-out">
                                            <FaCartShopping />
                                        </span>
                                        <span className="flex text-sm items-center justify-center rounded-full text-center text-black absolute top-[-6px] right-[-8px] bg-yellow-400 h-4 w-4">
                                            0
                                        </span>
                                    </div>
                                </Link>
                                <div>
                                    <ProfileDropDown />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;