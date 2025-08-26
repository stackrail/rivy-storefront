import Category from '../models/Category';
import { Request, Response } from 'express';

const CategoryController = {
  async getAllCategories(req: Request, res: Response) {
    const categories = await Category.find();
    res.json(categories);
    return;
  },
  async getCategoryById(req: Request, res: Response) {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
    return;
  },
  async createCategory(req: Request, res: Response) {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
    return;
  },
  async updateCategory(req: Request, res: Response) {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
    return;
  },
  async deleteCategory(req: Request, res: Response) {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
    return;
  }
};

export default CategoryController;
