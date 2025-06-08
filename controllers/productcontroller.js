const productModel = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
      const { userId, name, oldPrice, newPrice, description, category } = req.body;
  
      if (
        !userId ||
        !name ||
        !oldPrice ||
        !newPrice ||
        !description ||
        !category ||
        !req.files ||
        req.files.length === 0
      ) {
        return res.status(400).json({ message: 'All fields and at least one image are required.' });
      }
  
      // Cloudinary stores the full URL in file.path
      const images = req.files.map(file => file.path);
  
      const product = await productModel.create({
        userId,
        name,
        oldPrice,
        newPrice,
        description,
        category,
        images,
      });
  
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
            const imagePaths = req.files.map(file => file.filename);
            updateFields.images = imagePaths;
          }
        const product = await productModel.findByIdAndUpdate(req.params.id, updateFields, { new: true });

        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
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

