
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DummyStorefront from './DummyStorefront';
import Login from './Login';
import Signup from './Signup';
import Cart from './Cart';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DummyStorefront />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
