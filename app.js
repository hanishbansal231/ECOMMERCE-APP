import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRouter from './routers/userRouter.js';
import categoryRouter from './routers/categoryRoute.js';
import productRouter from './routers/productRouter.js';
import paymentRouter from './routers/paymentRouter.js';
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.get('/',(req,res) => {
    res.send({
        Message: 'Welcome Ecommerce App'
    })
});

app.use('/api/v1/auth',userRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/payment',paymentRouter);

app.all("*", (req,res) => {
    res.send('OOPS! Invalid Information');
});
app.use(errorMiddleware);
export default app;