const BASE_URl = 'http://localhost:8080/api/v1';


export const AUTH_ENDPOINT = {
    REGISTER_API: BASE_URl + '/auth/register',
    LOGIN_API: BASE_URl + '/auth/login',
    RESET_PASSWORD_API: BASE_URl + '/auth/reset-password',
    FORGOT_PASSWORD_API: BASE_URl + '/auth/forgot-password',
    UPLOAD_IMAGE_API: BASE_URl + '/auth/image-update',
    UPLOAD_PROFILE_API: BASE_URl + '/auth/profile-update',
    CHANGE_PASSWORD_API: BASE_URl + '/auth/change-password',
    DELETE_ACCOUNT_API: BASE_URl + '/auth/delete-account',
}

export const CATEGORY_ENDPOINT = {
    CREATE_CATEGORY_API: BASE_URl + '/category/create-category',
    ALL_CATEGORY_API: BASE_URl + '/category/all-category',
    DELETE_CATEGORY_API: BASE_URl + '/category/delete-category',
    UPDATE_CATEGORY_API: BASE_URl + '/category/update-category'
}

export const PRODUCT_ENDPOINT = {
    CREATE_PRODUCT_API: BASE_URl + '/product/create-product',
    ALL_PRODUCT_API: BASE_URl + '/product/all-product',
    DELETE_PRODUCT_API: BASE_URl + '/product/delete-product',
    UPDATE_PRODUCT_API: BASE_URl + '/product/updated-product',
    FILTER_PRODUCT_API: BASE_URl + '/product/filter-product',
    TOTAL_PRODUCT_API: BASE_URl + '/product/count-product',
    LIST_PRODUCT_API: BASE_URl + '/product/list-product',
    SEARCH_PRODUCT_API: BASE_URl + '/product/search-product',
}