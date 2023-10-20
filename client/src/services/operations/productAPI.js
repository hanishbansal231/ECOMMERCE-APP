import { apiConnector } from "../apiConnector";
import { PRODUCT_ENDPOINT } from "../apis";
import { toast } from 'react-hot-toast';


const {
    CREATE_PRODUCT_API,
    ALL_PRODUCT_API,
    DELETE_PRODUCT_API,
    UPDATE_PRODUCT_API,
    FILTER_PRODUCT_API,
    TOTAL_PRODUCT_API,
    LIST_PRODUCT_API
} = PRODUCT_ENDPOINT

export function createProduct(data, token, setLoading) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        setLoading(true);
        try {
            const response = await apiConnector('POST', CREATE_PRODUCT_API, data, {
                Authorization: `Bearer ${token}`
            });
            // console.log(response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            toast.success("CREATE PRODUCT SUCCESSFULLY");
            setLoading(false);
        } catch (error) {
            console.log("CREATE-PRODUCT API ERROR............", error)
            toast.error("CREATE-PRODUCT FAILED")
        }
        toast.dismiss(toastId);
    }
}

export function allProduct(token) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        let result = [];
        try {
            const response = await apiConnector('GET', ALL_PRODUCT_API, null, {
                Authorization: `Bearer ${token}`
            });
            // console.log(response);
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            result = response?.data?.products;
            if (result.length !== 0) toast.success("ALL PRODUCT SUCCESSFULLY");
        } catch (error) {
            console.log("ALL-PRODUCT API ERROR............", error)
            toast.error("ALL-PRODUCT Failed")
        }
        toast.dismiss(toastId);
        return result;
    }
}


export function deleteProduct(id, token) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('DELETE', `${DELETE_PRODUCT_API}/${id}`, null, {
                Authorization: `Bearer ${token}`
            });
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            toast.success("DELETED PRODUCT SUCCESSFULLY");
        } catch (error) {
            console.log("DELETED-PRODUCT API ERROR............", error)
            toast.error("DELETED-PRODUCT Failed")
        }
        toast.dismiss(toastId);
    }
}


export function updateProduct(id, data, token) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        let result = [];
        try {
            const response = await apiConnector('PUT', `${UPDATE_PRODUCT_API}/${id}`, data, {
                Authorization: `Bearer ${token}`
            });
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            result = response?.data?.updateProduct;
            toast.success("UPDATED PRODUCT SUCCESSFULLY");
        } catch (error) {
            console.log("UPDATED-PRODUCT API ERROR............", error)
            toast.error("UPDATED-PRODUCT Failed")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function filterProducts(checked, radio) {
    return async (dispatch) => {
        let result = [];
        try {
            const response = await apiConnector('POST', FILTER_PRODUCT_API, { checked, radio });

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            result = response?.data?.products;
        } catch (error) {
            console.log("FILTER-PRODUCT API ERROR............", error)
            toast.error("FILTER-PRODUCT Failed")
        }
        return result;
    }
}


export function totalProduct() {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        let result = [];
        try {
            const response = await apiConnector("GET", TOTAL_PRODUCT_API);
            // console.log(response);
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            result = response?.data?.total;
        } catch (error) {
            console.log("LIST-PRODUCT API ERROR............", error)
            toast.error("LIST-PRODUCT Failed")
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function listProduct(page) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        let result = [];
        try {
            const response = await apiConnector("GET", `${LIST_PRODUCT_API}/${page}`);
            // console.log(response);
            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }
            result = response?.data?.list;
        } catch (error) {
            console.log("LIST-PRODUCT API ERROR............", error)
            toast.error("LIST-PRODUCT Failed")
        }
        toast.dismiss(toastId);
        return result;
    }
}