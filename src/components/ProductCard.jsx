import React from 'react';

const ProductCard = ({ product, addToCart }) => (
  <div className="border p-4 rounded">
    <img src={product.images[0]} alt={product.title} className="w-full h-32 object-cover mb-2" />
    <h3 className="font-bold">{product.title}</h3>
    <p>${product.price}</p>
    <button onClick={addToCart} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
