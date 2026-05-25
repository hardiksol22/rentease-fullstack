import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';

export default function Checkout() {
  const { cartItems, calculateSubtotal, calculateTotalDeposit, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address || !deliveryDate) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      alert('Order Placed Successfully! Your rental logistics schedule has been logged.');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Delivery Scheduling & Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handlePlaceOrder} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-2">Logistics Parameters</h2>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Delivery Site Address</label>
            <textarea 
              required
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter full flat address, street locality details..."
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Preferred Delivery Date</label>
            <input 
              type="date"
              required
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-600 rounded-xl px-4 py-3 text-sm outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md"
          >
            {loading ? 'Processing Transaction Order...' : 'Confirm Subscription Order'}
          </button>
        </form>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit space-y-4">
          <h2 className="text-lg font-black text-gray-900 border-b border-gray-50 pb-2">Arrangement Matrix</h2>
          <div className="divide-y divide-gray-50 overflow-y-auto max-h-60 no-scrollbar">
            {cartItems.map((item) => (
              <div key={item.id} className="py-2 flex justify-between items-center text-xs">
                <span className="font-bold text-gray-800 truncate max-w-[150px]">{item.title}</span>
                <span className="text-gray-400 font-medium">({item.tenure} mo)</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-dashed border-gray-100 text-xs space-y-2 font-bold text-gray-600">
            <div className="flex justify-between"><span>Monthly Subscription Aggregation:</span><span className="text-gray-900">₹{Math.round(calculateSubtotal())}/mo</span></div>
            <div className="flex justify-between"><span>Total Upfront Escrow Deposit:</span><span className="text-blue-600 text-sm font-black">₹{Math.round(calculateSubtotal() + calculateTotalDeposit())}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}