
const db = require('../../../lib/db.js');


// CREATE type product
module.exports.create = function (req, res) {
    const {sell_id, customer_id, payment_sell_id, product_id, qty, price} = req.body;

    try {
        db.query(
            "INSERT INTO sell_detail (sell_id, customer_id, payment_sell_id, product_id, qty, price) VALUES(?, ?, ?, ?, ?, ?)",
            [sell_id, customer_id, payment_sell_id, product_id, qty, price ],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a sell detail into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New sell detail successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports.read = function (req, res) {
    db.query("SELECT sell_detail.sell_detail_id as id, customer.name as customer, sell.address as address, product.name as product, sell_detail.qty, sell_detail.price, payment_sell.picture as payment, sell.status as status FROM sell_detail INNER JOIN customer ON customer.customer_id = sell_detail.customer_id INNER JOIN sell ON sell.sell_id = sell_detail.sell_id INNER JOIN product ON product.product_id = sell_detail.product_id INNER JOIN payment_sell ON payment_sell.payment_sell_id = sell_detail.payment_sell_id",
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
    const sell_detail_id = req.params.sell_detail_id;
    const {sell_id, customer_id, payment_sell_id, product_id, qty, price } = req.body;

    try {
        db.query("UPDATE sell_detail SET sell_id = ?, customer_id = ? , payment_sell_id = ?, product_id = ?, qty = ?, price = ? WHERE sell_detail_id = ?", 
        [sell_id, customer_id, payment_sell_id, product_id, qty, price,sell_detail_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "User sell detail updated successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports.delete = function (req, res){
    const detail_order_id = req.params.detail_order_id;

    try {
        db.query("DELETE FROM sell_detail WHERE sell_detail_id = ?", [sell_detail_id], (err, results, fields) => {
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