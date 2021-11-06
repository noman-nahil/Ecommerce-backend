const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getPhoto,
    getProductById,
    updateProductById,
    filterProducts
} = require('../controllers/productControllers');
const admin = require('../middleware/admin');
const authorize = require('../middleware/authorize');

router.route('/')
    .post([authorize, admin], createProduct)
    .get(getProducts);

router.route('/:id')
    .get(getProductById)
    .put([authorize, admin], updateProductById);

router.route('/photo/:id')
    .get(getPhoto);

router.route('/filter')
    .post(filterProducts)

module.exports = router;