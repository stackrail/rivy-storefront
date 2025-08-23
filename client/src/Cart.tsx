import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
	const [cart, setCart] = useState<any[]>(() => {
		const stored = localStorage.getItem('cart');
		return stored ? JSON.parse(stored) : [];
	});
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const handleRemove = (id: string) => {
		setCart(prev => prev.filter(item => item._id !== id));
	};

	const handleQuantityChange = (id: string, qty: number) => {
		setCart(prev => prev.map(item => item._id === id ? { ...item, quantity: qty } : item));
	};

	const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

	if (cart.length === 0) {
		return (
			<div style={{maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
				<h2>Your Cart is Empty</h2>
				<button onClick={() => navigate('/')} style={{marginTop: 24, padding: '10px 24px', background: '#007b3a', color: '#fff', border: 'none', borderRadius: 6}}>Go Shopping</button>
			</div>
		);
	}

	return (
		<div style={{maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
			<h2>Your Cart</h2>
			<table style={{width: '100%', marginBottom: 24}}>
				<thead>
					<tr>
						<th style={{textAlign: 'left'}}>Product</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{cart.map(item => (
						<tr key={item._id}>
							<td>
								<strong>{item.name}</strong><br />
								<span style={{fontSize: '0.95em', color: '#555'}}>{item.category?.name}</span>
							</td>
							<td>₦{item.price}</td>
							<td>
								<input type="number" min={1} value={item.quantity || 1} onChange={e => handleQuantityChange(item._id, Math.max(1, Number(e.target.value)))} style={{width: 60, padding: 4, borderRadius: 4, border: '1px solid #ccc'}} />
							</td>
							<td>₦{item.price * (item.quantity || 1)}</td>
							<td>
								<button onClick={() => handleRemove(item._id)} style={{background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer'}}>Remove</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3 style={{textAlign: 'right'}}>Grand Total: ₦{total}</h3>
			<button style={{marginTop: 24, padding: '10px 24px', background: '#007b3a', color: '#fff', border: 'none', borderRadius: 6}}>Checkout</button>
		</div>
	);
};

export default Cart;
