import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/',(req,res) => {
    res.send({
        Message: 'Welcome Ecommerce App'
    })
});


app.all("*", (req,res) => {
    res.send('OOPS! Invalid Information');
});

export default app;