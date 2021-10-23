const express = require('express');
const router = express.Router();
const { signIn, signUp } = require('../controllers/userControllers')




router.route('/singup')
    .post(signUp)

router.route('/singin')
    .post(signIn)

module.exports = router;