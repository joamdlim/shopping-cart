import React from 'react';

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card border p-4 rounded shadow">
      <img
        src={product.images[0]}
        alt={product.title}
        className="product-image mb-4"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <h3 className="font-bold text-lg">{product.title}</h3>
      <p>${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="add-to-cart-btn mt-2 p-2 bg-blue-600 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
