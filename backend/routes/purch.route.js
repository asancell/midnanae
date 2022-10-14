const router = require('express').Router();

const purch = require('../controllers/admin/purch/purch.controller')
 const payment = require('../controllers/admin/purch/pm-purch.controller')
 const dtpurch = require('../controllers/admin/purch/dt-purch.controller')


// Manage purch product Api
router.get('/', purch.read)
router.post("/create-purch",purch.create)
router.patch('/update-purch/:order_product_id',purch.update);
router.delete('/delete-purch/:order_product_id',purch.delete);

// Manage payment purch product Api
router.get('/payment', payment.read);
router.post("/create-pmpurch",payment.create)

// // Manage detail order product Api
 router.get('/dtpurch', dtpurch.read);
 router.post("/create-dtpurch",dtpurch.create)
 router.patch('/update-dtpurch/:detail_order_id',dtpurch.update);
 router.delete('/delete-dtpurch/:detail_order_id',dtpurch.delete);

module.exports = router