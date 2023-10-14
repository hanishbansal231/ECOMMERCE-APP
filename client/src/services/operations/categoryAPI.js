// import { setData, setLoading, setToken } from "../../Redux/Slice/authSlice";
import { apiConnector } from "../apiConnector";
import { CATEGORY_ENDPOINT } from "../apis";
import { toast } from 'react-hot-toast';

const {
    CREATE_CATEGORY_API,
    ALL_CATEGORY_API,
    DELETE_CATEGORY_API,
    UPDATE_CATEGORY_API,
} = CATEGORY_ENDPOINT

export function createCategory(data, token) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', CREATE_CATEGORY_API, { name: data }, {
                Authorization: `Bearer ${token}`
            });
            // console.log(response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            toast.success("CREATE CATEGORY SUCCESSFULLY");
        } catch (error) {
            console.log("CREATE-CATEGORY API ERROR............", error)
            toast.error("CREATE-CATEGORY Failed")
        }
        toast.dismiss(toastId);
    }
}

export function allCategory(token) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        let result = [];
        try {
            const response = await apiConnector('GET', ALL_CATEGORY_API, null, {
                Authorization: `Bearer ${token}`
            });
            // console.log(response?.data?.category);
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            result = response?.data?.category;
            toast.success("ALL CATEGORY SUCCESSFULLY");
        } catch (error) {
            console.log("ALL-CATEGORY API ERROR............", error)
            toast.error("ALL-CATEGORY Failed")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function deleteCategory(id,token) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('DELETE', `${DELETE_CATEGORY_API}/${id}`, null, {
                Authorization: `Bearer ${token}`
            });
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            toast.success("DELETED CATEGORY SUCCESSFULLY");
        } catch (error) {
            console.log("DELETED-CATEGORY API ERROR............", error)
            toast.error("DELETED-CATEGORY Failed")
        }
        toast.dismiss(toastId);
    }
}

export function updateCategory(id,data,token) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        let result = [];
        try {
            const response = await apiConnector('PUT', `${UPDATE_CATEGORY_API}/${id}`, {name:data}, {
                Authorization: `Bearer ${token}`
            });
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            result = response?.data?.editCategory;
            toast.success("UPDATED CATEGORY SUCCESSFULLY");
        } catch (error) {
            console.log("UPDATED-CATEGORY API ERROR............", error)
            toast.error("UPDATED-CATEGORY Failed")
        }
        toast.dismiss(toastId);
        return result;
    }
}