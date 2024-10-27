const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value), 
            message: (props) => `${props.value} is not a valid email!` 
        }
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object, 
        default: {}   
    }
});

module.exports = mongoose.model('User ', userSchema);