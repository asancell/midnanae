
const db = require('../../../lib/db.js');
const fs = require('fs');
const { response } = require('express');


module.exports.uploadProductImage = function(req,res){
    try {
        console.log(req.file)
        if(req.file == undefined){
            return res.status(400).send({message:'plase Upload file'})
        }
        const productImagLink = req.protocol + `://` + req.headers.host + `/images/product/` + Date.now() + req.file.originalname
        return res.send(productImagLink)

    } catch (error) {
        
    }
}

// CREATE product
module.exports.create =  function (req, res)  {

    const {type_product_id, name, picture, qty, description, price_sell } = req.body;

    console.log(req.body)

    try {
        db.query(
            "INSERT INTO product (type_product_id, name, picture, qty, description, price_sell) VALUES(?, ?, ?, ?, ?, ?)",
            [type_product_id, name, picture, qty, description, price_sell ],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a  product into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New  product successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}



module.exports.read = function (req, res) {
    db.query(
        "SELECT product.product_id as id, product.picture as picture, product.name as name , type_product.name as type, product.qty as qty, product.description as des, product.price_sell as price FROM product JOIN type_product ON product.type_product_id = type_product.type_product_id ",
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(201).json(results)
        }
    );
}

module.exports.singleread = function (req, res) {
    const product_id = req.params.product_id;
    db.query(
        "SELECT product.product_id as id, product.picture as picture, product.name as name , type_product.name as type, product.qty as qty, product.description as des, product.price_sell as price FROM product JOIN type_product ON product.type_product_id = type_product.type_product_id  WHERE product_id = ?",
        [product_id],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(201).json(results)
        }
    );
}

module.exports.update = function (req, res){
    const product_id = req.params.product_id;
    const {type_product_id, name, picture, qty, description, price_sell } = req.body;

    try {
        db.query("UPDATE product SET type_product_id = ?, name = ?, picture = ?, qty = ?, description = ?, price_sell = ? WHERE product_id = ?", 
        [type_product_id, name, picture, qty, description, price_sell,product_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "User product updated successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports.delete = function (req, res){
    const product_id = req.params.product_id;

    try {
        db.query("DELETE FROM product WHERE product_id = ?", [product_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No user with that product_id!"});
            }
            return res.status(200).json({ message: "product deleted successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

