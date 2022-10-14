
const db = require('../../../lib/db.js');


// CREATE type product
module.exports.create = function (req, res) {
    const {type, picture, status} = req.body;

    try {
        db.query(
            "INSERT INTO payment_purch (type, date_payment, picture, status) VALUES(?, ?, ?, ?)",
            [type, Date(), picture, status],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a payment purch into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New payment purch successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

module.exports.read = function (req, res) {
    db.query(
        "SELECT * FROM payment_purch ",
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(201).json(results)
        }
    );
}

