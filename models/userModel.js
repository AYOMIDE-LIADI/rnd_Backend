const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4, 
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
