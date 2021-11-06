require('express-async-errors');
const express = require('express');
const app = express()
const error = require('./middleware/error')



require('./middleware/middleware')(app);
require('./routers/routes')(app);

app.use(error);

module.exports = app;