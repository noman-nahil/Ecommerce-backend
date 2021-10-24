const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoryControllers');
const admin = require('../middleware/admin');
const authorize = require('../middleware/authorize');

router.route('/')
    .post([authorize, admin], createCategory)
    .get(getCategories);


module.exports = router