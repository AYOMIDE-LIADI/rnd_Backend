require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const upload = require('./config/cloudinary'); 

const user_Route = require("./routes/userRoutes");
const product_Route = require("./routes/productRoutes");
const cart_Route = require("./routes/cartRoutes");
const order_Route = require("./routes/orderRoutes")
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://rnd-apparel-l6sn.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    return res.status(200).json({ imageUrl: req.file.path }); 
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err });
  }
});

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
