import { setData, setToken } from "../../Redux/Slice/authSlice";
import { apiConnector } from "../apiConnector";
import { AUTH_ENDPOINT } from "../apis";
import { toast } from 'react-hot-toast';


const {
    REGISTER_API,
    LOGIN_API,
    RESET_PASSWORD_API,
    FORGOT_PASSWORD_API,
    UPLOAD_IMAGE_API
} = AUTH_ENDPOINT;


export function registerUser(data, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        console.log(data);
        try {
            const response = await apiConnector('POST', REGISTER_API, data);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successful");
            navigate("/login");

        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/register")
        }
        toast.dismiss(toastId);
    }
}

export function loginUser(data, navigate) {
    return async (dispatch) => {

        const toastId = toast.loading('Loading...');

        try {
            const response = await apiConnector('POST', LOGIN_API, data);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            dispatch(setToken(response?.data?.user.token));
            dispatch(setData(response?.data?.user));

            localStorage.setItem('token', JSON.stringify(response?.data?.user.token));
            localStorage.setItem('data', JSON.stringify(response?.data?.user));

            toast.success("Login Successful");
            navigate("/");

        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
            navigate("/login")
        }

        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setData(null));
        localStorage.removeItem('token');
        localStorage.removeItem('data');
        navigate('/');
    }
}


export function resetPassword(data, setEmailSend) {
    return async (dispatch) => {

        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', RESET_PASSWORD_API, data);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Successful");
            setEmailSend(true);

        } catch (error) {
            console.log("RESET API ERROR............", error)
            toast.error("RESET Failed")
        }

        toast.dismiss(toastId);
    }
}

export function forgotPassword(data, resetToken, navigate) {
    return async (dispatch) => {

        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', FORGOT_PASSWORD_API, { ...data, resetToken });

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Password Successful");
            navigate('/login');
        } catch (error) {
            console.log("RESET API ERROR............", error)
            toast.error("RESET Failed")
        }

        toast.dismiss(toastId);
    }
}



export function changeProfilePicture(data, token, navigate, setImageUpload) {
    return async (dispatch) => {

        const toastId = toast.loading('Loading...');
        try {
            setImageUpload(true);
            const response = await apiConnector('POST', UPLOAD_IMAGE_API, data, {
                Authorization: `Bearer ${token}`
            });

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            console.log(response);
            dispatch(setData(response?.data?.user));
            localStorage.setItem('data', JSON.stringify(response?.data?.user));
            navigate('/dashboard/admin/profile')
            toast.success("Image Upload Successful");
            setImageUpload(false);
        } catch (error) {
            console.log("UPLOAD IMAGE API ERROR............", error)
            toast.error("UPLOAD IMAGE Failed")
        }
        toast.dismiss(toastId);
    }
}
