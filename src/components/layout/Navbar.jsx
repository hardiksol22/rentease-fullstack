import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useCart } from '../../hooks/useCart.js';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');
  
  // Toggler states for both separate dropdown systems
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false); // New Admin Dropdown State

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigate(`/?search=${encodeURIComponent(localSearch.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          
          {/* 1️⃣ Branding Logo */}
          <Link to="/" onClick={() => setLocalSearch('')} className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">📦</span>
            <span className="text-xl font-black tracking-tight text-gray-900">
              Rent<span className="text-blue-600">Ease</span>
            </span>
          </Link>

          {/* 2️⃣ Centralized Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-auto hidden sm:block">
            <div className="relative bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 transition-all flex items-center">
              <span className="pl-3.5 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search sofas, smart TVs, appliances..."
                className="w-full bg-transparent text-xs text-gray-900 px-3 py-2.5 outline-none placeholder-gray-400 font-medium"
              />
              {localSearch && (
                <button 
                  type="button" 
                  onClick={() => { setLocalSearch(''); navigate('/'); }}
                  className="pr-3 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Right Side Control Menu Grid */}
          <div className="flex items-center gap-4 shrink-0">
            
            {/* 3️⃣ Dynamic Cart Widget */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <span className="text-xl">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* 4️⃣ 🛠️ NEW: DEDICATED EXECUTIVE ADMIN GATEWAY ICON */}
            <div className="relative">
              <button
                onClick={() => {
                  setAdminDropdownOpen(!adminDropdownOpen);
                  setDropdownOpen(false); // Closes customer dropdown if open
                }}
                onBlur={() => setAdminDropdownOpen(false)}
                className={`flex items-center justify-center border rounded-xl p-2.5 transition-all ${
                  user?.role === 'admin'
                    ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600 font-bold'
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                }`}
                title="Admin Control Panel"
              >
                <span className="text-sm">🛡️</span>
                {user?.role === 'admin' && <span className="text-[10px] font-black uppercase tracking-wider ml-1 hidden md:inline">Admin Active</span>}
              </button>

              {/* Admin Dropdown Overlay Panel */}
              {adminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-red-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-1.5 border-b border-gray-50 mb-1">
                    <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Executive Terminal</p>
                  </div>
                  
                  {user && user.role === 'admin' ? (
                    <>
                      {/* State: Admin already verified and logged in */}
                      <button
                        onMouseDown={() => navigate('/admin')}
                        className="w-full text-left block px-4 py-2 text-xs font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        🎛️ Admin Command Center
                      </button>
                      <div className="border-t border-gray-50 mt-1 pt-1">
                        <button
                          onMouseDown={() => { logout(); navigate('/admin-login'); }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                          🚪 Executive Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* State: Guest or Regular Customer - Show login/register entry gates */}
                      <button
                        onMouseDown={() => navigate('/admin-login')}
                        className="w-full text-left block px-4 py-2 text-xs font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        🔑 Admin Sign In
                      </button>
                      <button
                        onMouseDown={() => navigate('/admin-register')}
                        className="w-full text-left block px-4 py-2 text-xs font-black text-red-600 hover:bg-red-50 transition-all"
                      >
                        📝 Create Admin Profile
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 5️⃣ Standard Customer Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setAdminDropdownOpen(false); // Closes admin dropdown if open
                }}
                onBlur={() => setDropdownOpen(false)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 transition-all"
              >
                <span>👤</span>
                <span className="max-w-[90px] truncate">
                  {user ? user.name.split(' ')[0] : 'My Account'}
                </span>
                <span className="text-[10px] text-gray-400" style={{ display: 'inline-block', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  ▼
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Signed in as</p>
                        <p className="text-xs font-bold text-gray-900 truncate">{user.email}</p>
                      </div>

                      <button
                        onMouseDown={() => navigate('/dashboard')}
                        className="w-full text-left block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        🎛️ My Dashboard
                      </button>

                      <div className="border-t border-gray-50 mt-1 pt-1">
                        <button
                          onMouseDown={() => { logout(); navigate('/login'); }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                          🚪 Secure Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onMouseDown={() => navigate('/login')}
                        className="w-full text-left block px-4 py-2 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        🔑 Sign In
                      </button>
                      <button
                        onMouseDown={() => navigate('/register')}
                        className="w-full text-left block px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 transition-all"
                      >
                        📝 Create Account
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}