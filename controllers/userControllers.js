const bcrypt = require('bcrypt');
const lodash = require('lodash');
const { User, validate } = require('../models/user');


//SIGNUP
module.exports.signUp = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = {};
    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already registered!");

    user = new User(_.pick(req.body, ['name', 'email', 'password']))

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = user.generateJWT();
    try {
        const result = await user.save();
        return res.status(201).send({
            message: "Registration Successfull!",
            token: token,
            user: _.pick(result, ["_id", "name", "email"])
        })
    } catch (error) {
        return res.status(500).send("Something Failed!")
    }

}

//SIGNIN
module.exports.signIn = async (req, res) => {

}