const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');

// Create Order
router.post('/', orderController.createOrder);

// Get All Orders (Admin)
router.get('/', orderController.getAllOrders);

// Get Orders by User ID
router.get('/user/:userId', orderController.getUserOrders);

// Get Single Order by ID
router.get('/:orderId', orderController.getOrderById);

// Update Order Status
router.patch('/:orderId/status', orderController.updateOrderStatus);

// Delete Order
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
