const Cart = require('../models/Cart');
const Product = require('../models/Product');


exports.addToCart = async (req, res) => {
    const userId = req.user.id; 
    const items = req.body.items; 
 
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, productIds: [], sizes: [], quantities: [] });
    }

    items.forEach(item => {
        cart.productIds.push(item.productId);
        cart.sizes.push(item.size);
        cart.quantities.push(item.quantity);
    });

    await cart.save(); 
    return res.status(200).json({ success: true, cart });
};


exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, size } = req.body; 

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const index = cart.productIds.indexOf(productId);

        if (index === -1 || cart.sizes[index].trim() !== size.trim()) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        if (cart.quantities[index] > 1) {
            cart.quantities[index] -= 1;
        } else {
            cart.productIds.splice(index, 1);
            cart.sizes.splice(index, 1);
            cart.quantities.splice(index, 1);
        }

        await cart.save();

        return res.status(200).json({ success: true, message: "Removed from cart", cart });
    } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({ success: false, message: "Error removing from cart", error });
    }
};


exports.getCartData = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate('productIds');

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const detailedCart = cart.productIds.map((productId, index) => ({
            product: productId,
            size: cart.sizes[index],
            quantity: cart.quantities[index],
        }));

        res.status(200).json({ success: true, cartData: detailedCart });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: "Error fetching cart data", error });
    }
};


// Clear entire cart for a user
exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        await Cart.deleteOne({ userId });

        res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ success: false, message: "Error clearing cart", error });
    }
};
