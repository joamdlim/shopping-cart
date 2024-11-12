import React from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutPage({ cart, increaseQuantity, decreaseQuantity, setCart }) {
  const navigate = useNavigate(); 

  const handlePayment = () => {
    alert('Payment Successful!');
    setCart([]); 
    navigate('/'); 
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="checkout-page p-6">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item flex justify-between items-center p-4 border-b">
              <div className="item-info flex items-center">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="cart-item-image"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <div className="ml-4">
                  <h3 className="font-bold">{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <div className="quantity-control flex items-center">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      style={{ padding: '0.5rem', backgroundColor: '#669aed', color: '#fff' }}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      style={{ padding: '0.5rem', backgroundColor: '#669aed', color: '#fff' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <p className="total-price text-lg font-semibold mt-2 text-blue-600">
                Total: ${item.price * item.quantity}
              </p>
            </div>
          ))}
          <div className="summary mt-4 p-4 border rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
            <p>Subtotal: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            <p className="font-bold text-lg">
              Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </p>
            <button onClick={handlePayment} className="pay-button mt-4 p-2 bg-blue-600 text-white rounded">
              Pay
            </button>
            <button onClick={handleCancel} className="cancel-button mt-2 p-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CheckoutPage;
