const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: uuidv4, 
  },
  customerInfo: {
    email: String,
    country: String,
    firstName: String,
    lastName: String,
    address: String,
    postalCode: String,
    city: String,
    phone: String,
  },
  cartItems:  [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      newPrice: {
        type: Number,
        required: true,
      },
      images: {
        type: String, 
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],

  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
