const userRouter = require('./userRouters')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouters');
const profileRouter = require('./profileRouters')

module.exports = (app) => {
    app.use(process.env.URL, userRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/profile', profileRouter);

}