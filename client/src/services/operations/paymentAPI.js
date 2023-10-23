import { apiConnector } from "../apiConnector";
import { PAYMENT_ENDPOINT } from "../apis";
import { toast } from 'react-hot-toast';

const {
    CREATE_PAYMENT_API,
    VERIFY_PAYMENT_API,
} = PAYMENT_ENDPOINT;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);

    });
}

export async function buyProduct(token, products, userDetails, navigate, dispatch) {
    const toastId = toast.loading('Loading...');
    try {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            toast.error('Razorpay SDK failed to load...');
            return;
        }

        const orderResponse = await apiConnector('POST', CREATE_PAYMENT_API, { products }, {
            Authorization: `Bearer ${token}`
        });

        if (!orderResponse?.data?.success) {
            throw new Error(orderResponse?.data?.message);
        }

        console.log(orderResponse)

        const option = {
            key: process.env.RAZORPAY_KEY_ID,
            currency: orderResponse?.data?.data?.currency,
            amount: `${orderResponse?.data?.data?.amount}`,
            order_id: orderResponse?.data?.data?.id,
            name: 'Ecommerce',
            description: 'Thank You for Purchasing the Course',
            // image:
            prefill: {
                name: `${userDetails.name}`,
                email: userDetails.email
            },
            handler: function (response) {
                verifyPayment({ ...response, products }, token, navigate, dispatch)
            }

        }

        const paymentObject = new window.Razorpay(option);
        paymentObject.open();
        paymentObject.on('Payment failed', function (response) {
            toast.error('OOPS! Payment Failed...');
            console.log(response.error);
        })

    } catch (e) {
        console.log('PAYMENT_API_ERROR', e);
        toast.error('COULD NOT MAKE PAYMENT...');
    }
    toast.dismiss(toastId);
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading('Verifying Payment...');
    // dispatch(setPa)
    try {
        const res = await apiConnector('POST', VERIFY_PAYMENT_API, bodyData, {
            Authorization: `Bearer ${token}`
        });

        if (!res?.data?.success) {
            throw new Error(res?.data?.message);
        }
        toast.success('Payment Successfully....');
        navigate('/');

    } catch (e) {
        console.log('PAYMENT_VERIFY_ERROR', e);
        toast.error('Could not verify payment')
    }
    toast.dismiss(toastId);
}