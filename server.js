require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const user_Route = require("./routes/userRoutes");
const product_Route = require("./routes/productRoutes");
const cart_Route = require("./routes/cartRoutes");
const order_Route = require("./routes/orderRoutes")
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/users", user_Route);
app.use("/api/products", product_Route);
app.use("/api/cart", cart_Route);
app.use("/api/order", order_Route);

app.get('/', (req, res) => {
  res.send('eCommerce backend is running');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
