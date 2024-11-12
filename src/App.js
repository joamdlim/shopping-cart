import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import './styles/App.css';

function App() {
  const [cart, setCart] = useState([]);

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header flex justify-between items-center p-4 bg-blue-600 text-white">
          <h1 className="title">Urban Haven</h1>
          <Link to="/checkout" className="cart-link">
            Cart ({cart.length})
          </Link>
        </header>

        <Routes>
          <Route
            path="/"
            element={<HomePage cart={cart} setCart={setCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />}
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} setCart={setCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
