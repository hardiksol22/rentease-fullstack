import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useCart } from '../hooks/useCart.js';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [tenure, setTenure] = useState(3);

  useEffect(() => {
    api.getProductById(id).then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return <div className="text-center py-20 font-bold text-gray-500">Loading Product Details...</div>;
  }

  let discountFactor = 1.0;
  if (tenure === 6) discountFactor = 0.95;
  if (tenure === 12) discountFactor = 0.90;
  
  const currentMonthlyRent = Math.round(product.monthlyRent * discountFactor);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          <img 
            src={product.image} 
            alt={product.title} 
            onError={(e) => { e.target.src = '/placeholder.jpg'; }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl font-black text-gray-900 mt-4 tracking-tight leading-snug">
              {product.title}
            </h1>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              {product.desc}
            </p>

            <div className="mt-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Select Rental Tenure Plan
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[3, 6, 12].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setTenure(months)}
                    className={`py-3.5 px-4 rounded-xl font-bold text-sm border transition-all ${
                      tenure === months
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/10'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div>{months} Months</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                      {months === 3 ? 'Standard Rate' : months === 6 ? '5% Discount' : '10% Discount'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Adjusted Subscription Rate</p>
                <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">
                  ₹{currentMonthlyRent}<span className="text-sm text-gray-400 font-bold">/mo</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Refundable Security Bond</p>
                <p className="text-lg font-bold text-gray-700 mt-1">₹{product.deposit}</p>
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(product, tenure);
                navigate('/cart');
              }}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm tracking-wide shadow-lg transition-all duration-300"
            >
              Add To Rental Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}