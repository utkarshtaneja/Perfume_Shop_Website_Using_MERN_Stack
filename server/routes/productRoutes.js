const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const verifyToken = require('../middlewares/auth'); 
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Add a new product
router.post('/', verifyToken, upload.single('image'), addProduct);

// Update a product
router.put('/:id', verifyToken, upload.single('image'), updateProduct);

// Delete a product
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
