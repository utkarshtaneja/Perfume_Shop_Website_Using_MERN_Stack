const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
    },
    username: { 
        type: String, 
        required: true, 
    },
    comment: { 
        type: String, 
        required: true,
    },
    rating: { 
        type: Number, 
        required: true, 
    }
});

module.exports = mongoose.model('Review', reviewSchema);
