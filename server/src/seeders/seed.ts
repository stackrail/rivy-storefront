import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Category from '../models/Category';
import Product from '../models/Product';
import Order from '../models/Order';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Remove test product if it exists
    await Product.deleteOne({ name: 'Test Product' });

    // Upsert user
    const user = await User.findOneAndUpdate(
      { email: 'seyijagaban@gmail.com' },
      {
        name: 'Seyi Tinubu',
        email: 'seyijagaban@gmail.com',
        password: 'hashedpassword',
        createdAt: new Date('2025-08-11T00:00:00.000Z'),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Seed categories as array
    const categoriesData = [
      { name: 'Solar Panel', description: 'Reliable Solar Panel' },
      { name: 'Inverter', description: 'High-efficiency Inverter' },
      { name: 'Battery', description: 'Long-lasting Battery' },
      { name: 'Street Light', description: 'Durable Solar Street Light' },
      { name: 'Charge Controller', description: 'Smart MPPT Controller' }
    ];
    const categories: any[] = [];
    for (const cat of categoriesData) {
      const category = await Category.findOneAndUpdate(
        { name: cat.name },
        { ...cat, createdAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      categories.push(category);
    }

    // Seed products
    const productsData = [
      {
        name: 'SunPower 400W Mono Panel',
        description: 'High-efficiency monocrystalline panel for residential and commercial solar installations.',
        price: 95000,
        image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80',
        category: categories[0]?._id
      },
      {
        name: 'BrightLite 5kVA Hybrid Inverter',
        description: 'Advanced 5kVA inverter with hybrid technology for seamless solar and grid integration.',
        price: 520000,
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        category: categories[1]?._id
      },
      {
        name: 'EcoCell 2.4kWh Lithium Battery',
        description: 'Reliable lithium battery for energy storage and backup power.',
        price: 180000,
        image: 'https://images.unsplash.com/photo-1581090700227-1c1b1b1b1b1b?auto=format&fit=crop&w=400&q=80',
        category: categories[2]?._id
      },
      {
        name: 'SolarGlow 80W Street Light',
        description: 'All-in-one solar street light with motion sensor and long-lasting LED.',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        category: categories[3]?._id
      },
      {
        name: 'PowerMax 150A MPPT Controller',
        description: 'Smart MPPT charge controller for optimal solar power management.',
        price: 250000,
        image: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=400&q=80',
        category: categories[4]?._id
      },
      {
        name: 'VoltX 10kVA Industrial Inverter',
        description: 'Heavy-duty inverter for industrial solar applications.',
        price: 950000,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
        category: categories[1]?._id
      },
      {
        name: 'GreenCell 5kWh Battery Pack',
        description: 'High-capacity battery pack for commercial energy storage.',
        price: 350000,
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        category: categories[2]?._id
      },
      {
        name: 'LiteWay 60W Solar Street Light',
        description: 'Efficient LED street light powered by solar energy.',
        price: 90000,
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        category: categories[3]?._id
      }
    ];
    for (const prod of productsData) {
      if (!prod.category) {
        console.warn(`Category not found for product: ${prod.name}`);
        continue;
      }
      await Product.findOneAndUpdate(
        { name: prod.name },
        { ...prod, createdAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    console.log('Seeding complete!');
    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding error:', err);
    mongoose.disconnect();
    process.exit(1);
  }
}

seed();
