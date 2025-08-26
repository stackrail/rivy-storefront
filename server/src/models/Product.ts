import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now }
});

export default model('Product', ProductSchema);
