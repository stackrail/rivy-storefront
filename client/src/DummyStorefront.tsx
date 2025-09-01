// Trigger redeploy: cache refresh
import React from 'react';
import './DummyStorefront.css';

const products = [
  {
    name: 'SunPower 400W Mono Panel',
    description: 'High-efficiency monocrystalline panel for residential and commercial solar installations.',
    price: '₦95,000',
    minOrder: 'Min. order: 2 units',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80', // Solar panel
  },
  {
    name: 'BrightLite 5kVA Hybrid Inverter',
    description: 'Advanced 5kVA inverter with hybrid technology for seamless solar and grid integration.',
    price: '₦520,000',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', // Inverter
  },
  {
    name: 'EcoCell 2.4kWh Lithium Battery',
    description: 'Reliable lithium battery for energy storage and backup power.',
    price: '₦180,000',
    minOrder: 'Min. order: 5 units',
    image: 'https://images.unsplash.com/photo-1581090700227-1c1b1b1b1b1b?auto=format&fit=crop&w=400&q=80', // Lithium battery
  },
  {
    name: 'SolarGlow 80W Street Light',
    description: 'All-in-one solar street light with motion sensor and long-lasting LED.',
    price: '₦120,000',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // Street light
  },
  {
    name: 'PowerMax 150A MPPT Controller',
    description: 'Smart MPPT charge controller for optimal solar power management.',
    price: '₦250,000',
    image: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=400&q=80', // MPPT controller
  },
];

const DummyStorefront: React.FC = () => {
  return (
    <div className="dummy-storefront">
      <header className="storefront-header">
        <img src="https://energystack.staging.rivy.co/assets/png/energystack-logo-4cbeb065.png" alt="Rivy logo" className="storefront-logo" />
        <h1>Dummy Storefront</h1>
      </header>
      <div className="product-list">
        {products.map((product, idx) => (
          <div className="product-card" key={idx}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
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
