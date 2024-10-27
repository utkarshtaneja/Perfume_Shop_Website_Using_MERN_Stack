const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    productIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    }],
    sizes: [{ 
        type: String, 
        required: true 
    }],
    quantities: [{ 
        type: Number, 
        default: 1 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
