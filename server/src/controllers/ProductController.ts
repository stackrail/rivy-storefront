import Product from '../models/Product';
import { Request, Response } from 'express';

const ProductController = {
  async getAllProducts(req: Request, res: Response) {
    const products = await Product.find().populate('category');
    res.json(products);
    return;
  },
  async getProductById(req: Request, res: Response) {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
    return;
  },
  async createProduct(req: Request, res: Response) {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
    return;
  },
  async updateProduct(req: Request, res: Response) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
    return;
  },
  async deleteProduct(req: Request, res: Response) {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
    return;
  }
};

export default ProductController;
