import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRouter from './routers/userRouter.js';
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/',(req,res) => {
    res.send({
        Message: 'Welcome Ecommerce App'
    })
});

app.use('/api/v1/auth',userRouter);

app.all("*", (req,res) => {
    res.send('OOPS! Invalid Information');
});
app.use(errorMiddleware);
export default app;