import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCategory } from "../../services/operations/categoryAPI";



export function useCategory() {
    const dispatch = useDispatch();
    const [categorys, setCategorys] = useState([]);
    const {token} = useSelector((state) => state.auth);
    const fetchCategory = useCallback(async () => {
        const res = await dispatch(allCategory(token));
        setCategorys(res);
    }, [dispatch, token, setCategorys]);


    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    return [
        categorys,
        setCategorys
    ]
}