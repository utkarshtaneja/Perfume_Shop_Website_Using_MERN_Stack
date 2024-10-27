const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCartData, clearCart } = require('../controllers/cartController');
const verifyToken = require('../middlewares/auth');

router.post('/add', verifyToken, addToCart);

router.post('/remove', verifyToken, removeFromCart); 

router.get('/get/:userId', verifyToken, getCartData);

router.delete('/clear', verifyToken, clearCart); 

module.exports = router;
