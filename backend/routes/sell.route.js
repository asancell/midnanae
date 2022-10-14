const router = require('express').Router();

const sell = require('../controllers/admin/sell/sell.controller')
const payment = require('../controllers/admin/sell/pm-sell.controller')
const dtsell = require('../controllers/admin/sell/dt-sell.controller')


// Manage purch product Api
router.get('/', sell.read)
router.post("/create-sell",sell.create)
router.patch('/update-sell/:order_product_id',sell.update);
router.delete('/delete-sell/:order_product_id',sell.delete);

// Manage payment sell product Api
router.get('/payment', payment.read);
router.post("/create-pmsell",payment.create)


// Manage sell product Api
 router.get('/dtsell', dtsell.read);
 router.post("/create-dtsell",dtsell.create)
 router.patch('/update-dtsell/:sell_detail_id',dtsell.update);
router.delete('/delete-dtsell/:sell_detail_id',dtsell.delete);

module.exports = router