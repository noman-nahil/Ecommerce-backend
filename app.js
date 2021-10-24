require('express-async-errors');
const express = require('express');
const userRouter = require('./routers/userRouters')
const app = express()
const cors = require('cors');
const error = require('./middleware/error')
const categoryRouter = require('./routers/categoryRouter')
/*if(process.env.NODE_ENV === 'development'){

}*/
app.use(express.json());
app.use(cors());
app.use(process.env.URL, userRouter);
app.use(process.env.CATEGORY_URL, categoryRouter)
app.use(error);

module.exports = app;