const express = require('express');


const app = express()
const cors = require('cors');

/*if(process.env.NODE_ENV === 'development'){

}*/
app.use(express.json());
app.use(cors());

module.exports = app;