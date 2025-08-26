import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default model('Order', OrderSchema);
