const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProductById } = require('../controllers/productControllers');
const admin = require('../middleware/admin');
const authorize = require('../middleware/authorize');

router.route('/')
    .post([authorize, admin], createProduct)
    .get(getProducts);

router.route('/:id')
    .get(getProductById)
    .put(updateProductById);

module.exports = router;