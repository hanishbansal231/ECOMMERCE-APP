const BASE_URl = 'http://localhost:8080/api/v1';


export const AUTH_ENDPOINT = {
    REGISTER_API: BASE_URl + '/auth/register',
    LOGIN_API:BASE_URl + '/auth/login',
    RESET_PASSWORD_API:BASE_URl + '/auth/reset-password',
    FORGOT_PASSWORD_API:BASE_URl + '/auth/forgot-password',
    UPLOAD_IMAGE_API:BASE_URl + '/auth/image-update',
}