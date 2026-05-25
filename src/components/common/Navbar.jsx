import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const totalCartCount = cartItems?.length || 0;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter flex items-center gap-2 hover:opacity-95 transition-opacity">
              <span>⚡</span>RentEase
            </Link>

            <div className="hidden md:flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600">
              <span>📍</span>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border-none outline-none font-bold text-gray-700 cursor-pointer focus:ring-0 p-0"
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600">
            <Link to="/" className={`transition-colors ${location.pathname === '/' ? 'text-blue-600' : 'hover:text-gray-900'}`}>
              Catalog
            </Link>
            {user && (
              <Link to="/dashboard" className={`transition-colors ${location.pathname === '/dashboard' ? 'text-blue-600' : 'hover:text-gray-900'}`}>
                My Rentals
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-amber-600 hover:text-amber-700 flex items-center gap-1">
                🛡️ Admin Panel
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-xl group">
              <span className="text-lg">🛒</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                <div className="text-right">
                  <p className="text-xs font-black text-gray-900 leading-none">{user.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{user.role}</p>
                </div>
                <button 
                  onClick={logout}
                  className="bg-gray-900 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-blue-600/10"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-600 bg-gray-50 rounded-xl">
              <span>🛒</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full">
                  {totalCartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-gray-50 text-gray-700 rounded-xl text-lg font-bold outline-none"
            >
              {mobileMenuOpen ? '✕' : '≡'}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-inner">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 font-bold text-gray-700 hover:text-blue-600 border-b border-gray-50">Catalog</Link>
          {user && (
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 font-bold text-gray-700 hover:text-blue-600 border-b border-gray-50">My Rentals</Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 font-bold text-amber-600 border-b border-gray-50">🛡️ Admin Dashboard</Link>
          )}
          <div className="pt-2 flex flex-col gap-3">
            {user ? (
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full bg-gray-900 text-white font-bold py-2.5 rounded-xl text-sm">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full bg-blue-600 text-white text-center font-bold py-2.5 rounded-xl text-sm">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}