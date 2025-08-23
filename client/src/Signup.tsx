import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('https://rivy-storefront.onrender.com/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Signup successful! You can now log in.');
      } else {
        setMessage(data.error || 'Signup failed');
      }
    } catch (err) {
      setMessage('Signup failed');
    }
  };

  return (
    <div style={{maxWidth: 400, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{width: '100%', marginBottom: 12, padding: 8}} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{width: '100%', marginBottom: 12, padding: 8}} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{width: '100%', marginBottom: 12, padding: 8}} />
        <button type="submit" style={{width: '100%', padding: 10, background: '#007b3a', color: '#fff', border: 'none', borderRadius: 6}}>Sign Up</button>
      </form>
      <p style={{marginTop: 16}}>
        Already have an account?{' '}
        <button type="button" style={{background: 'none', border: 'none', color: '#007b3a', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => navigate('/login')}>
          Login
        </button>
      </p>
      {message && <p style={{marginTop: 16, color: message.includes('successful') ? 'green' : 'red'}}>{message}</p>}
    </div>
  );
};

export default Signup;
