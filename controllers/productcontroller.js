const cloudinary = require('cloudinary').v2;
const productModel = require('../models/productModel');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  exports.createProduct = async (req, res) => {
    try {
      const { name, oldPrice, newPrice, description, category, userId } = req.body;
  
      const imageUrls = [];
  
      if (!req.files || req.files.length === 0) {
        console.warn('⚠️ No files received. Check your frontend file upload.');
      }
  
      // Upload each image to Cloudinary
      for (const file of req.files) {
       const result = await cloudinary.uploader.upload(file.path, {
          folder: 'products',
        });  
        imageUrls.push(result.secure_url);
  
        fs.unlinkSync(file.path);
      }
  
      const product = new productModel({
        userId,
        name,
        oldPrice,
        newPrice,
        description,
        category,
        images: imageUrls,
      });
  
  
      await product.save();
  
      res.status(201).json(product);
    } catch (error) {
      console.error('❌ Upload error:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  

  exports.getAllProducts = async (req, res) => {
    try {
      const products = await productModel.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getProductById = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.updateProduct = async (req, res) => {
    try {
      const { name, oldPrice, newPrice, description, category, userId } = req.body;
  
      const updateFields = {
        name,
        oldPrice,
        newPrice,
        description,
        category,
        userId,
      };
  
      if (req.files && req.files.length > 0) {
        const imageUrls = [];
  
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'products',
          });
          imageUrls.push(result.secure_url);
          fs.unlinkSync(file.path); // optional: delete local file
        }
  
        updateFields.images = imageUrls;
      }
  
      const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, updateFields, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  

  exports.deleteProduct = async (req, res) => {
    try {
      const product = await productModel.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

