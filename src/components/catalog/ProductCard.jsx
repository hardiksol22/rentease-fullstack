import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  // 🛡️ Bulletproof Production Image Utility Engine
  const getLiveImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300?text=RentEase+Asset';

    // Rule 1: Agar path pehle se absolute internet link hai
    if (imagePath.startsWith('http')) {
      // Localhost links ko dynamically live Render backend mesh url se badal do
      return imagePath.replace('http://localhost:5000', 'https://rentease-backend-4uec.onrender.com');
    }

    // Rule 2: Relative configurations (like /images/sofa.jpg or images/sofa.jpg)
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `https://rentease-backend-4uec.onrender.com${cleanPath}`;
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
      {/* Product Image Frame */}
      <div className="relative overflow-hidden bg-gray-100 h-48 w-full">
        <img
          src={getLiveImageUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Edge Case Protection: Agar cloud server fetch block kare, placeholder chal jaye
            e.target.src = 'https://via.placeholder.com/300?text=RentEase+Premium+Asset';
          }}
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Content Meta Wrapper */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900 tracking-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing Matrix & Action Router */}
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block">Rent starts at</span>
            <span className="text-base font-black text-blue-600">₹{product.monthlyRent}</span>
            <span className="text-[10px] text-gray-500 font-semibold">/mo</span>
          </div>
          
          <Link
            to={`/product/${product._id}`}
            className="bg-gray-900 text-white hover:bg-blue-600 px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-colors shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}