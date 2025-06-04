const express = require('express');
const multer = require('multer');
const router = express.Router();
const productController = require('../controllers/productcontroller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });


router.post('/', upload.array('images'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',upload.array('images'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
