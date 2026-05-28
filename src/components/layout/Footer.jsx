import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Brand Logo Label */}
        <div className="flex items-center gap-2">
          <span className="font-black text-lg tracking-tight text-gray-900">
            Rent<span className="text-blue-600">Ease</span>
          </span>
          <span className="text-xs text-gray-400 font-semibold tracking-wide ml-2">
            © 2026 Portfolio Sandbox Project
          </span>
        </div>

        {/* Right Side: Quick Clean Navigation Mappings */}
        <div className="flex gap-6 text-xs font-bold text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Marketplace</Link>
          <Link to="/cart" className="hover:text-blue-600 transition-colors">Rental Cart</Link>
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Customer Dashboard</Link>
        </div>

      </div>
    </footer>
  );
}