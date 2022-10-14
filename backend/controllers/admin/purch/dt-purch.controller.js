
const db = require('../../../lib/db.js');


// CREATE type product
module.exports.create = function (req, res) {
    const {order_product_id, product_id, farmer_id, payment_purch_id, qty, price} = req.body;

    try {
        db.query(
            "INSERT INTO detail_order_product (order_product_id, product_id, farmer_id, payment_purch_id, qty, price) VALUES(?, ?, ?, ?, ?, ?)",
            [order_product_id, product_id, farmer_id, payment_purch_id, qty, price ],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a detail order product into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New detail order product successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}
 
module.exports.read = function (req, res) {
    db.query("SELECT detail_order_product.detail_order_id as id, order_product.order_product_id as Norder, employee.name as emp, farmer.name as farmer, product.name as product, detail_order_product.qty, detail_order_product.price, payment_purch.picture as payment FROM detail_order_product INNER JOIN order_product ON order_product.order_product_id = detail_order_product.order_product_id INNER JOIN product ON product.product_id = detail_order_product.product_id INNER JOIN farmer ON farmer.farmer_id = detail_order_product.farmer_id INNER JOIN payment_purch ON payment_purch.payment_purch_id = detail_order_product.payment_purch_id JOIN employee ON employee.employee_id = order_product.order_product_id",
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
    const detail_order_id = req.params.detail_order_id;
    const {order_product_id, product_id, farmer_id, payment_purch_id, qty, price } = req.body;

    try {
        db.query("UPDATE detail_order_product SET order_product_id = ?, product_id = ? , farmer_id = ?, payment_purch_id = ?, qty = ?, price = ? WHERE detail_order_id = ?", 
        [order_product_id, product_id, farmer_id, payment_purch_id, qty, price , detail_order_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "User order product updated successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports.delete = function (req, res){
    const detail_order_id = req.params.detail_order_id;

    try {
        db.query("DELETE FROM detail_order_product WHERE detail_order_id = ?", [detail_order_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No detail order with that detail_order_id!"});
            }
            return res.status(200).json({ message: "detail order product deleted successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}