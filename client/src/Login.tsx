import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
		const [email, setEmail] = useState('');
		const [password, setPassword] = useState('');
		const [message, setMessage] = useState('');
		const [user, setUser] = useState<{ name: string; email: string } | null>(null);
		const navigate = useNavigate();

		useEffect(() => {
			const token = localStorage.getItem('token');
			const userData = localStorage.getItem('user');
			if (token && userData) {
				setUser(JSON.parse(userData));
			}
		}, []);

		const handleLogin = async (e: React.FormEvent) => {
			e.preventDefault();
			setMessage('');
			try {
				const res = await fetch('https://rivy-storefront.onrender.com/api/users/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password })
				});
				const data = await res.json();
				if (res.ok && data.token) {
					setMessage('Login successful!');
					localStorage.setItem('token', data.token);
					localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
					setUser({ name: data.name, email: data.email });
				} else {
					setMessage(data.error || 'Login failed');
				}
			} catch (err) {
				setMessage('Login failed');
			}
		};

		const handleLogout = () => {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			setUser(null);
			setMessage('Logged out');
		};

		if (user) {
			return (
				<div style={{maxWidth: 400, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
					<h2>Welcome, {user.name}!</h2>
					<p>Email: {user.email}</p>
					<button onClick={handleLogout} style={{width: '100%', padding: 10, background: '#007b3a', color: '#fff', border: 'none', borderRadius: 6}}>Logout</button>
					{message && <p style={{marginTop: 16, color: 'green'}}>{message}</p>}
				</div>
			);
		}

		return (
			<div style={{maxWidth: 400, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
				<h2>Login</h2>
				<form onSubmit={handleLogin}>
					<input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{width: '100%', marginBottom: 12, padding: 8}} />
					<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{width: '100%', marginBottom: 12, padding: 8}} />
					<button type="submit" style={{width: '100%', padding: 10, background: '#007b3a', color: '#fff', border: 'none', borderRadius: 6}}>Login</button>
				</form>
				<p style={{marginTop: 16}}>
					Don't have an account?{' '}
					<button type="button" style={{background: 'none', border: 'none', color: '#007b3a', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => navigate('/signup')}>
						Sign Up
					</button>
				</p>
				{message && <p style={{marginTop: 16, color: message.includes('successful') ? 'green' : 'red'}}>{message}</p>}
			</div>
		);
};

export default Login;
