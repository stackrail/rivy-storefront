
import User from '../models/User';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const UserController = {
  async getAllUsers(req: Request, res: Response) {
    const users = await User.find();
    res.json(users);
    return;
  },
  async getUserById(req: Request, res: Response) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
    return;
  },
  async createUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
    return;
  },
  async updateUser(req: Request, res: Response) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
    return;
  },
  async deleteUser(req: Request, res: Response) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
    return;
  }
};

export default UserController;
