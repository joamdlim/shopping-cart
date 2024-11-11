import React, { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("asc");
  const [showCart, setShowCart] = useState(false);

  // Fetch products using useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Add to Cart function
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

  // Filter and sort products based on user input
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <div className="app-container p-6">
      <div className="header flex justify-between items-center mb-4">
        <h1 className="header-title">Shopping Cart</h1>
        <button
          onClick={() => setShowCart(!showCart)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showCart ? "Back to Products" : `Cart (${cart.length})`}
        </button>
      </div>

      {showCart ? (
        <div className="cart-container">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item flex justify-between items-center p-4 border-b">
                  <div className="item-info flex items-center">
                    <img src={item.images[0]} alt={item.title} className="cart-item-image" />
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p>${item.price * item.quantity}</p>
                </div>
              ))}
              <div className="summary mt-4 p-4 border rounded shadow">
                <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                <p>Subtotal: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                <p>Shipping: $10.00</p>
                <p className="font-bold text-lg">Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 10}</p>
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
                  Cancel - Go back to the last page
                </button>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      ) : (
        <div>
          {/* Search and Sort Controls */}
          <div className="search-bar mb-4 flex items-center">
            <input
              type="text"
              placeholder="Filter by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded mr-4"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          {/* Display Products or Loading */}
          {!loading ? (
            <div className="product-table grid grid-cols-7 gap-4">
              {filteredProducts.map((product) => (
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
                    <img src="cart-icon.png" alt="Cart Icon" /> {/* Update with path to cart icon */}
                    Add to Cart
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
