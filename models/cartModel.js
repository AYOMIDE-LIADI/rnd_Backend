// models/cartModel.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4, 
      },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
