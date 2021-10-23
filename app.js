const express = require('express');
const userRouter = require('./routers/userRouters')

const app = express()
const cors = require('cors');

/*if(process.env.NODE_ENV === 'development'){

}*/
app.use(express.json());
app.use(cors());
app.use(process.env.URL, userRouter);

module.exports = app;