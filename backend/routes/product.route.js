const router = require('express').Router();
const mwFile = require('../middleware/upload.middleware')




//use express static folder
const typeproduct = require('../controllers/admin/product/type-product.controller')
const product = require('../controllers/admin/product/product.controller')
const wstproduct = require('../controllers/admin/product/wst-product.controller')

// Manage type product Api
router.get('/type', typeproduct.read)
router.post("/create-typeproduct",typeproduct.create)
router.patch('/update-typeproduct/:type_product_id', typeproduct.update);
router.delete('/delete-typeproduct/:type_product_id', typeproduct.delete);

// Manage  product Api
router.get('/', product.read);
router.get('/:product_id', product.singleread);
router.post('/create-product', product.create);

router.post('/upload-img-product',mwFile.single('file'),product.uploadProductImage);



router.patch('/update-product/:product_id', product.update);
router.delete('/delete-product/:product_id', product.delete);

// Manage weasted product Api
router.get('/wst', wstproduct.read);
router.post("/create-wstproduct",wstproduct.create)
router.patch('/update-wstproduct/:wst_product_id', wstproduct.update);
router.delete('/delete-wstproduct/:wst_product_id', wstproduct.delete);

module.exports = router