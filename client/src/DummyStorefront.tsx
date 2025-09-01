// Trigger redeploy: cache refresh
import React, { useEffect, useState } from 'react';
import './DummyStorefront.css';

const API_URL = 'https://rivy-storefront.onrender.com/api/products';

const DummyStorefront: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dummy-storefront">
      <header className="storefront-header">
        <img src="https://energystack.staging.rivy.co/assets/png/energystack-logo-4cbeb065.png" alt="Rivy logo" className="storefront-logo" />
        <h1>Dummy Storefront</h1>
      </header>
      <div className="product-list">
        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && products.length === 0 && <p>No products found.</p>}
        {!loading && !error && products.map((product, idx) => (
          <div className="product-card" key={product._id || idx}>
            <img src={product.image || 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80'} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description || 'No description available.'}</p>
            <p className="product-price">₦{product.price}</p>
            {product.minOrder && <p className="product-min-order">{product.minOrder}</p>}
          </div>
        ))}
      </div>
      <footer className="storefront-footer">
        <p>Login | Create Account</p>
        <p>©2025 Rivy. All rights reserved.</p>
        <p><a href="/terms">Terms Policy</a> | <a href="/privacy-policy">Privacy Policy</a> | <a href="/faq">FAQs</a></p>
      </footer>
    </div>
  );
};

export default DummyStorefront;

