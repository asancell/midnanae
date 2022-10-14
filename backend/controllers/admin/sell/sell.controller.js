
const db = require('../../../lib/db.js');


// CREATE type product
module.exports.create = function (req, res) {
    const {employee_id, address, type, status, total_price} = req.body;

    try {
        db.query(
            "INSERT INTO sell (employee_id, address, date_sell, type, status, total_price) VALUES(?, ?, ?, ?, ?, ?)",
            [employee_id, address, Date.now(), type, status, total_price ],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a sell order product into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New sell order product successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports.read = function (req, res) {
    db.query(
        "SELECT * FROM sell ",
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
    const sell_id = req.params.sell_id;
    const {employee_id, address, type, status, total_price } = req.body;

    try {
        db.query("UPDATE sell SET employee_id = ?, address = ? , date_sell = ? , type = ?, status = ?, total_price = ? WHERE sell_id = ?", 
        [employee_id, address, Date.now(), type, status, sell_id, total_price], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "User sell product updated successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports.delete = function (req, res){
    const sell_id = req.params.sell_id;

    try {
        db.query("DELETE FROM sell WHERE sell_id = ?", [sell_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No sell product with that sell_id!"});
            }
            return res.status(200).json({ message: "sell product deleted successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}