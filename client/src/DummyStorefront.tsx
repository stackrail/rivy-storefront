// Trigger redeploy: cache refresh

import React, { useEffect, useState } from 'react';
import './DummyStorefront.css';

const SkeletonCard = () => (
  <div className="product-card skeleton">
    <div className="product-image skeleton-bg" />
    <div className="product-name skeleton-bg" style={{height: '24px', width: '60%'}} />
    <div className="product-description skeleton-bg" style={{height: '16px', width: '80%'}} />
    <div className="product-price skeleton-bg" style={{height: '20px', width: '40%'}} />
  </div>
);

const API_URL = 'https://rivy-storefront-h1y3.onrender.com/api/products';

const DummyStorefront: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [paymentDuration, setPaymentDuration] = useState('');
  const [cart, setCart] = useState<any[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.products || data);
      } catch (err: any) {
        setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Get unique categories from products
  const categories = Array.from(new Set(products.map((p: any) => p.category && p.category.name).filter(Boolean)));

  // Filter products by search and category
  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || (product.description && product.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category ? (product.category && product.category.name === category) : true;
    const matchesMinPrice = minPrice ? product.price >= Number(minPrice) : true;
    const matchesMaxPrice = maxPrice ? product.price <= Number(maxPrice) : true;
    const matchesPaymentDuration = paymentDuration ? product.paymentDuration === paymentDuration : true;
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesPaymentDuration;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'name-asc') return a.name.localeCompare(b.name);
    if (sort === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });

  // Add to cart handler
  const handleAddToCart = (product: any) => {
    setCart(prev => {
      const exists = prev.find((item: any) => item._id === product._id);
      if (exists) {
        setToast('Added to cart!');
        return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      setToast('Added to cart!');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 1800);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Cart item count
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="dummy-storefront">
      {toast && (
        <div style={{position:'fixed',top:24,right:24,zIndex:9999,background:'#007b3a',color:'#fff',padding:'12px 28px',borderRadius:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.12)',fontWeight:600}}>
          {toast}
        </div>
      )}
      <header className="storefront-header">
        <div className="top-nav" style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px'}}>
          <img src="https://energystack.staging.rivy.co/assets/png/energystack-logo-4cbeb065.png" alt="Rivy logo" className="storefront-logo" style={{height: '48px'}} />
          <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
            <a href="/cart" className="cart-btn" style={{position: 'relative', display: 'inline-flex', alignItems: 'center'}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#007b3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6"/></svg>
              {cartCount > 0 && <span style={{position:'absolute',top:'-6px',right:'-10px',background:'#007b3a',color:'#fff',borderRadius:'50%',padding:'2px 8px',fontSize:'0.9rem',fontWeight:600}}>{cartCount}</span>}
            </a>
            <a href="/login" className="auth-btn" style={{marginRight: '8px', fontWeight: 600}}>Login</a>
            <a href="/signup" className="auth-btn" style={{fontWeight: 600}}>Sign Up</a>
          </div>
        </div>
  <div className="hero-section" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px', textAlign: 'center', margin: '32px 0'}}>
          <h1 style={{fontSize: '2.2rem', fontWeight: 700, marginBottom: '12px'}}>Bright Power, Brighter Future</h1>
          <p style={{fontSize: '1.2rem', color: '#555', marginBottom: '24px'}}>Affordable, sustainable energy designed for every home and business.</p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '16px'}}>
            <a href="#plans" className="cta-btn" style={{background: '#007b3a', color: '#fff', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none'}}>Discover Solar Plans</a>
            <a href="#contact" className="cta-btn" style={{background: '#fff', color: '#007b3a', border: '2px solid #007b3a', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none'}}>Contact Us</a>
          </div>
        </div>
      </header>

      {/* Search and filter controls */}
      <div style={{display: 'flex', gap: '16px', justifyContent: 'center', margin: '32px 0 0 0'}}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', minWidth: '180px'}}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc'}}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc'}}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '100px'}}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', width: '100px'}}
        />
        <select
          value={paymentDuration}
          onChange={e => setPaymentDuration(e.target.value)}
          style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc'}}
        >
          <option value="">Payment Duration</option>
          <option value="outright">Outright</option>
          <option value="6-months">6 Months</option>
          <option value="12-months">12 Months</option>
        </select>
      </div>

      <div className="product-list">
        {loading && Array.from({length: 4}).map((_, i) => <SkeletonCard key={i} />)}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        {!loading && !error && sortedProducts.length === 0 && <p>No products found.</p>}
        {!loading && !error && sortedProducts.map((product: any, idx: number) => (
          <div className="product-card" key={idx}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">₦{product.price}</p>
            {product.inStock !== undefined && (
              <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            )}
            {product.category && product.category.name && (
              <p className="product-category">Category: {product.category.name}</p>
            )}
            {product.minOrder && <p className="product-min-order">{product.minOrder}</p>}
            <div style={{display:'flex',gap:'8px',marginTop:'12px'}}>
              <button className="add-view-btn" style={{background: '#007b3a', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer'}} onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button className="add-view-btn" style={{background: '#eee', color: '#007b3a', border: 'none', borderRadius: '6px', padding: '8px 18px', cursor: 'pointer'}} onClick={() => setSelectedProduct(product)}>View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for product details */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{width: '100%', borderRadius: '8px'}} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p><strong>Price:</strong> {selectedProduct.price}</p>
            {selectedProduct.category && selectedProduct.category.name && (
              <p><strong>Category:</strong> {selectedProduct.category.name}</p>
            )}
            {selectedProduct.minOrder && <p><strong>{selectedProduct.minOrder}</strong></p>}
            <button onClick={() => setSelectedProduct(null)} style={{marginTop: '1rem'}}>Close</button>
          </div>
        </div>
      )}

      <footer className="storefront-footer">
        <div className="footer-links">
          <a href="/login">Login</a> | <a href="/signup">Create Account</a>
        </div>
        <p>©2025 Rivy. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms Policy</a> | <a href="/privacy-policy">Privacy Policy</a> | <a href="/faq">FAQs</a>
        </div>
      </footer>
    </div>
  );
};

export default DummyStorefront;

