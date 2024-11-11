import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  return (
    <div className="w-1/3 p-5 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>{item.title}</span>
          <span>{item.quantity}</span>
        </div>
      ))}
      <button
        onClick={() => navigate('/checkout')}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
