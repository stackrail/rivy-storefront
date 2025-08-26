# RIVY Storefront API Documentation

## Project Summary

RIVY Storefront is a full-stack e-commerce demo app. It features a Node.js/Express backend with MongoDB and a React frontend. The API supports CRUD operations for users, products, categories, and orders, and is designed for easy integration and testing.

## Base URL

`http://localhost:5000/api/`

---

## Users

- `GET /users` — List all users
- `POST /users` — Create a user
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
- `GET /users/:id` — Get user by ID
- `PUT /users/:id` — Update user
  - Body: `{ "name": "Jane Doe" }`
- `DELETE /users/:id` — Delete user

---

## Products

- `GET /products` — List all products
- `POST /products` — Create a product
  - Body: `{ "name": "Sample Product", "description": "A test product", "price": 19.99 }`
- `GET /products/:id` — Get product by ID
- `PUT /products/:id` — Update product
- `DELETE /products/:id` — Delete product

---

## Categories

- `GET /categories` — List all categories
- `POST /categories` — Create a category
  - Body: `{ "name": "Electronics", "description": "Electronic items" }`
- `GET /categories/:id` — Get category by ID
- `PUT /categories/:id` — Update category
- `DELETE /categories/:id` — Delete category

---

## Orders

- `GET /orders` — List all orders
- `POST /orders` — Create an order
  - Body: `{ "user": "<user_id>", "products": ["<product_id>"], "total": 19.99 }`
- `GET /orders/:id` — Get order by ID
- `PUT /orders/:id` — Update order
- `DELETE /orders/:id` — Delete order

---

## Error Handling

- All endpoints return JSON error messages for invalid requests or missing resources.

---

## Setup Instructions

1. **Install dependencies:**

- Backend: `cd server && npm install`
- Frontend: `cd client && npm install`

2. **Start MongoDB:**

- `sudo systemctl start mongod` (Linux)

3. **Run the backend server:**

- `cd server && npx ts-node src/app.ts`

4. **Run the frontend app:**

- `cd client && npm start`

5. **Test endpoints:**

- Use Postman or your browser at `http://localhost:5000/api/`
- Frontend at `http://localhost:3000`

---

## Demo Checklist

- [x] Server starts and connects to MongoDB
- [x] CRUD works for users, products, categories, orders
- [x] API tested with Postman

---

## Submission

- Commit all code and this README
- Include screenshots of Postman tests if required
