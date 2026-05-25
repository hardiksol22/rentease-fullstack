import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col justify-between h-full">
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="aspect-square bg-gray-50 overflow-hidden relative flex items-center justify-center border-b border-gray-100 cursor-pointer"
      >
        {!imgError && product.image ? (
          <img 
            src={product.image} 
            alt={product.title} 
            onError={() => setImgError(true)}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center w-full h-full bg-gray-50/50 select-none">
            <span className="text-4xl filter drop-shadow-sm mb-2">
              {product.category === 'Furniture' ? '🛋️' : '🔌'}
            </span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Image Coming Soon
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-base font-bold text-gray-900 line-clamp-2 leading-snug tracking-tight hover:text-blue-600 cursor-pointer"
          >
            {product.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1 font-semibold">
            Refundable Deposit: ₹{product.deposit}
          </p>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-gray-100">
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">
              Monthly Plan
            </span>
            <p className="text-blue-600 font-black text-xl tracking-tight">
              ₹{product.monthlyRent}
              <span className="text-xs font-bold text-gray-400 tracking-normal">/mo</span>
            </p>
          </div>
          
          <button 
            onClick={() => {
              addToCart(product);
              navigate('/cart');
            }}
            className="w-full mt-4 bg-gray-900 hover:bg-blue-600 text-white py-3 rounded-xl font-bold text-sm tracking-wide shadow-sm hover:shadow-lg transition-all duration-300"
          >
            Configure Plan
          </button>
        </div>
      </div>
    </div>
  );
}