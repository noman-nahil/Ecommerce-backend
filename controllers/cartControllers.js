const { find } = require('lodash');
const _ = require('lodash');
const { CartItem } = require('../models/cartItem')

module.exports.createCartItem = async (req, res) => {
    let { price, product } = _.pick(req.body, ["price", "product"]);
    const item = await CartItem.findOne({
        user: req.user._id,
        product: product,
    });
    if (item) return res.status(400).send("Items already exists");
    let cartItem = new CartItem({
        price: price,
        product: product,
        user: req.user._id,
    });

    const result = await cartItem.save();
    res.status(201).send({
        message: "Added to cart successfully",
        data: result
    })


}

module.exports.getCartItem = async (req, res) => {
    const cartItems = await CartItem.find({
        user: req.body._id
    })
        .populate('product', 'name')
        .populate('user', 'name')
    return res.status(200).send(cartItems)
}


module.exports.updateCartItem = async (req, res) => {
    const { _id, count } = _.pick(req.body, ["count", "_id"])
    userId = req.body._id;
    await CartItem.updateOne({
        _id: id,
        user: userId
    }, {
        count: count
    });
    return res.status(200).send("Item updated")
}


module.exports.deleteCartItem = async (req, res) => {
    const _id = req.params.id,
        userId = req.user._id
    await CartItem.deleteOne({ _id: id, usee: userId })
    return res.status(200).send("Deleteed")
}

