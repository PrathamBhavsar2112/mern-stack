import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const createProduct = async (req, res) => {
  const { name, description, image, price } = req.body;
  const product = new Product({ name, description, image, price });
  const created = await product.save();
  res.status(201).json(created);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ message: 'Product deleted' });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};