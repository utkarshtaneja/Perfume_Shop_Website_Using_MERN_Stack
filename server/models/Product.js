const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    },
    description: { 
        type: String, 
        required: true,
    },
    longDescription: {
        type: String,
        required: true
    },
    price: { 
        type: Number, 
        required: true,
    },
    image: { 
        type: String, 
        required: true,
    },
    sizes: { 
        type: [String], 
        required: true,
    }
});

module.exports = mongoose.model('Product', productSchema);
