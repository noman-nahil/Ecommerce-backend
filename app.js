require('express-async-errors');
const express = require('express');
const app = express()
const cors = require('cors');
const error = require('./middleware/error')

const userRouter = require('./routers/userRouters')
const categoryRouter = require('./routers/categoryRouter')
const productRouter = require('./routers/productRouter')
/*if(process.env.NODE_ENV === 'development'){

}*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(process.env.URL, userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use(error);

module.exports = app;