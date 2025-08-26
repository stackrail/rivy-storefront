import Order from '../models/Order';
import { Request, Response } from 'express';

const OrderController = {
  async getAllOrders(req: Request, res: Response) {
    const orders = await Order.find().populate('user').populate('products');
    res.json(orders);
    return;
  },
  async getOrderById(req: Request, res: Response) {
    const order = await Order.findById(req.params.id).populate('user').populate('products');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
    return;
  },
  async createOrder(req: Request, res: Response) {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
    return;
  },
  async updateOrder(req: Request, res: Response) {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
    return;
  },
  async deleteOrder(req: Request, res: Response) {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
    return;
  }
};

export default OrderController;
