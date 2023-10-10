import { apiConnector } from "../apiConnector";
import { AUTH_ENDPOINT } from "../apis";
import { toast } from 'react-hot-toast';


const {
    REGISTER_API,
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