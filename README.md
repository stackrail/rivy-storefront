# Rivy Storefront - Solar Equipment E-commerce

A full-stack e-commerce storefront for solar equipment with React frontend, Node.js backend, and PostgreSQL database.

## 🏗️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express and TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Testing**: Jest for both frontend and backend
- **Documentation**: OpenAPI/Swagger
- **Deployment**: Docker & Docker Compose

## 🚀 Features

- **Product Catalog**: Browse solar equipment with search, filtering, and pagination
- **Product Details**: Detailed product information with images and specifications
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Simulated payment flow with order creation
- **Order Management**: View order history and status
- **Admin Features**: Basic authentication for admin actions (optional)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose (recommended)

### Local Development with Docker

1. Clone the repository

```bash
git clone <your-repo-url>
cd rivy-storefront
```

2. Start the application

```bash
npm run docker:up
```

3. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

### Local Development without Docker

1. Install dependencies

```bash
npm run setup
```

2. Set up environment variables

```bash
cp server/.env.example server/.env
# Edit server/.env with your database credentials
```

3. Start PostgreSQL and create database
4. Seed the database

```bash
npm run seed
```

5. Start development servers

```bash
npm run dev
```

## 🧪 Testing

Run all tests:

```bash
npm test
```

Run server tests only:

```bash
npm run server:test
```

Run client tests only:

```bash
npm run client:test
```

## �� API Documentation

API documentation is available at `/api-docs` when the server is running.

## �� Deployment

- **Frontend (Vercel)**: https://rivy-storefront-c2vk.vercel.app
- **Backend (Render)**: https://rivy-storefront.onrender.com
- **API Docs**: https://rivy-storefront.onrender.com/api-docs

## 🏗️ Project Structure

```
rivy-storefront/
├── client/                 # React frontend
├── server/                 # Express backend
├── docs/                   # Documentation and wireframes
├── docker-compose.yml      # Docker services
└── README.md
```

## ⚖️ Trade-offs and Future Improvements

### Current Trade-offs

- Simulated payment system (no real payment gateway)
- Basic inventory management
- Simple authentication system

### Future Improvements

- Real payment integration (Stripe, PayPal)
- Advanced inventory management with reservations
- Image optimization and CDN integration
- Search improvements with Elasticsearch
- Performance monitoring and analytics
- Advanced admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License
