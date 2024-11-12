import React, { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

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
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Automatically removes item if quantity goes to 0
    );
  };

  return (
    <div className="app-container p-6">
      <div className="header flex justify-between items-center mb-4">
        <h1 className="header-title">Shopping Cart</h1>
        <button onClick={() => setShowCart(!showCart)} className="cart-button">
          Cart ({cart.length})
        </button>
      </div>

      {showCart ? (
        <div className="cart-container">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="cart-item flex justify-between items-center p-4 border-b"
                >
                  <div className="item-info flex items-center">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="cart-item-image"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold">{item.title}</h3>
                      <p>Price: ${item.price}</p>
                      {/* Quantity Controls */}
                      <div className="quantity-control flex items-center mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="quantity-button bg-red-500 text-white px-2 py-1 rounded-l"
                        >
                          -
                        </button>
                        <span className="quantity-display mx-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="quantity-button bg-green-500 text-white px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Total Price */}
                  <p className="total-price text-lg font-semibold mt-2 text-blue-600">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="summary mt-4 p-4 border rounded shadow">
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                <p>
                  Subtotal: $
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </p>
                <p className="font-bold text-lg">
                  Total: $
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </p>
                <button
                  onClick={() => {
                    alert("Payment Successful!");
                    setCart([]);
                    setShowCart(false);
                  }}
                  className="pay-button mt-4"
                >
                  Pay
                </button>
                <button
                  onClick={() => setShowCart(false)}
                  className="cancel-button mt-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      ) : (
        <div>
          {!loading ? (
            <div className="product-table grid grid-cols-7 gap-4">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="product-image"
                  />
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="text-gray-700">${product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="add-to-cart-button"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
