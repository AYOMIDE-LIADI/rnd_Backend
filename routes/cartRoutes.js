const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartcontroller");

router.post("/add", cartController.addToCart);

router.get("/:userId", cartController.getCart);

router.delete("/clear/:userId", cartController.clearUserCart);

router.delete("/:userId/:productId", cartController.deleteCartItem);


module.exports = router;
