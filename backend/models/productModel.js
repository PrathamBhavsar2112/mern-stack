import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  price: { type: Number, required: true }, // Changed to Number for consistency
});

const Product = mongoose.model('Product', productSchema);

export default Product;