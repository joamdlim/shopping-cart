import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleCancel = () => navigate(-1);
  const handlePay = () => {
    alert('Payment Successful');
    setCart([]); // Reset cart
    navigate('/');
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>{item.title}</span>
          <span>{item.quantity} x ${item.price}</span>
        </div>
      ))}
      <div className="font-bold">Total: ${totalAmount}</div>
      <div className="flex gap-4 mt-4">
        <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
        <button onClick={handlePay} className="bg-green-500 text-white px-4 py-2 rounded">Pay</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
