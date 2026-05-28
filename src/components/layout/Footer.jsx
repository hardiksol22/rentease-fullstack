import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-32">
      {/* Top Section: Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-gray-900">
                Rent<span className="text-blue-600">Ease</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Premium furniture and appliance subscriptions tailored for modern Indian homes. Experience flexible living without the burden of buying.
            </p>
          </div>

          {/* Column 2: Marketplace Inventory */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">Marketplace</h3>
            <ul className="space-y-3 text-sm font-semibold text-gray-600">
              <li><Link to="/?category=Furniture" className="hover:text-blue-600 transition-colors">Premium Furniture</Link></li>
              <li><Link to="/?category=Appliances" className="hover:text-blue-600 transition-colors">Smart Appliances</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors">All Inventory</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Pipeline Mappings */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">Support Hub</h3>
            <ul className="space-y-3 text-sm font-semibold text-gray-600">
              <li><Link to="/dashboard" className="hover:text-blue-600 transition-colors">Raise Maintenance Ticket</Link></li>
              <li><Link to="/cart" className="hover:text-blue-600 transition-colors">Active Rental Cart</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-600 transition-colors">My Subscriptions</Link></li>
            </ul>
          </div>

          {/* Column 4: Trust Badges & System Node */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">Trust & Security</h3>
            <div className="bg-gray-50/70 border border-gray-100 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <span className="text-green-500 text-sm">⚡</span> 100% Refundable Deposit
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <span className="text-blue-500 text-sm">🛡️</span> Secured Gateway Integration
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright and Meta Layout */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-semibold tracking-wide">
            © 2026 RentEase Inc. All production rights reserved. Engineered securely via cloud nodes.
          </p>
          <div className="flex gap-6 text-xs font-bold text-gray-400">
            <span className="hover:text-gray-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-600 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}