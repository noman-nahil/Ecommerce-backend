const express = require('express');
const { get } = require('lodash');
const router = express.Router();


const { getProfile, setProfile } = require('../controllers/profileControllers')
const authorize = require('../middleware/authorize');

router.route('/')
    .post(authorize, setProfile)
    .get(authorize, getProfile)

module.exports = router;