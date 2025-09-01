
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import orderRoutes from './routes/order';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';


// CORS
app.use(cors());

// Rate limiting
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Logging
app.use(morgan('dev'));

app.use(express.json());
// Root route
app.get('/', (req, res) => {
  res.send('RIVY Storefront API is running!');
});

import dotenv from 'dotenv';
dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RIVY Storefront API',
      version: '1.0.0',
      description: 'API documentation for RIVY Storefront',
    }
  },
  apis: ['./src/routes/*.ts']
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);


// Global error handler
import { Request, Response, NextFunction } from 'express';

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});


if (process.env.NODE_ENV !== 'test') {
  console.log('MONGO_URI from .env:', process.env.MONGO_URI);
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
}

export default app;
