import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

const HomePage = ({ products }) => {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");

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

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="w-2/3 p-5">
        <input
          type="text"
          placeholder="Filter by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </div>
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
};

export default HomePage;
