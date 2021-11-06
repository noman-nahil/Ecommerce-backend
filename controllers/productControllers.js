const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const { Product, validate } = require('../models/product');


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
            //console.log(files.photo)
            //console.log("From files.photo " + files.photo.filepath)
            fs.readFile(files.photo.filepath, (err, data) => {
                if (err) console.log("Error message" + err.message);
                if (err) return res.status(400).send("Problem in file data");
                product.photo.data = data;
                product.photo.contentType = files.photo.mimetype;
                console.log(product)
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
    let order = req.query.order === 'desc' ? -1 : 1;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const products = await Product.find()
        .select({ photo: 0 })
        .sort({ [sortBy]: order })
        .limit(limit)
        .populate('category', 'name');
    return res.status(200).send(products);
}


//get-product by ID
module.exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    let product;
    try {
        product = await Product.findById(productId)
            .select({ photo: 0 })
            .populate('category', 'name');
        return res.status(200).send(product);
    }
    catch {
        if (!product) return res.status(404).send("Not Found");
    }
}

module.exports.getPhoto = async (req, res) => {
    const productId = req.params.id;
    let product;
    try {
        product = await Product.findById(productId)
            .select('photo')
            .populate('category', 'name');
        res.set('Content-Type', product.photo.contentType);
        return res.status(200).send(product.photo.data);
    }
    catch {
        if (!product) return res.status(404).send("Not Found");
    }
}

//update-product by ID
module.exports.updateProductById = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send("something went wrong!");
        const updatedFields = _.pick(fields, ["name", "description", "price", "category", "quantity"]);

        _.assignIn(product, updatedFields)
        if (files.photo) {
            //console.log(files.photo)
            //console.log("From files.photo " + files.photo.filepath)
            fs.readFile(files.photo.filepath, (err, data) => {
                if (err) console.log("Error message" + err.message);
                if (err) return res.status(400).send("Problem in file data");
                product.photo.data = data;
                product.photo.contentType = files.photo.mimetype;
                console.log(product)
                product.save((err, result) => {
                    if (err) return res.status(500).send("Internal Server error!");
                    else return res.status(201).send({
                        message: "Product update successfully",
                        data: _.pick(result, ["name", "description", "price", "category", "quantity"])
                    });
                });
            })
        }
        else {
            product.save((err, result) => {
                if (err) return res.status(500).send("Internal Server error!");
                else return res.status(201).send({
                    message: "Product update successfully",
                    data: _.pick(result, ["name", "description", "price", "category", "quantity"])
                });
            });
        }

    })
}

//filter by any fields
module.exports.filterProducts = async (req, res) => {
    let order = req.body.order === 'desc' ? -1 : 1;
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = parseInt(req.body.skip);

    const products = await Product.find()
        .select({ photo: 0 })
        .populate('category', 'name')
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
    return res.status(200).send(products)
}