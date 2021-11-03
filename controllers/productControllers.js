const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { Product, validate } = require('../models/product')


//create-product
module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send("something went wrong!");
        const { error } = validate(_.pick(fields, ["name", "description", "price", "category", "quantity"]));
        if (error) return res.status(400).send(error.details[0].message);
        const product = new Product(fields);

        if (files.photo) {
            fs.readFile(files.photo.path, (err, data) => {
                if (err) return res.status(400).send("Problem in file data");
                product.photo.data = data;
                product.photo.contentType = files.photo.type;
                product.save((err, result) => {
                    if (err) return res.status(500).send("Internal Server error!");
                    else return res.status(201).send({
                        message: "Product create successfully",
                        data: _.pick(result, ["name", "description", "price", "category", "quantity"])
                    });
                });
            })
        }
        else {
            return res.status(400).send("No image provided!");
        }
    });
}

//get-product 
module.exports.getProducts = async (req, res) => {

}


//get-product by ID
module.exports.getProductById = async (req, res) => {

}

//update-product by ID
module.exports.updateProductById = async (req, res) => {

}